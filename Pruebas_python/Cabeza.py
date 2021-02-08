from copy import deepcopy
from math import fabs

import rospy

from std_msgs.msg import (
    Bool
)

import baxter_dataflow

from baxter_core_msgs.msg import (
   HeadPanCommand,
   HeadState,
)
from baxter_interface import settings


class Head(object):
    """
    Interface class for the head on the Baxter Robot.

    Used to control the head pan angle and to enable/disable the head nod
    action.
    """
    def __init__(self):
        """
        Constructor.
        """
        self._state = dict()

        self._pub_pan = rospy.Publisher(
            '/robot/head/command_head_pan',
            HeadPanCommand,
            queue_size=10)

        self._pub_nod = rospy.Publisher(
            '/robot/head/command_head_nod',
            Bool,
            queue_size=10)

        state_topic = '/robot/head/head_state'
        self._sub_state = rospy.Subscriber(
            state_topic,
            HeadState,
            self._on_head_state)

        baxter_dataflow.wait_for(
            lambda: len(self._state) != 0,
            timeout=5.0,
            timeout_msg=("Failed to get current head state from %s" %
                         (state_topic,)),
        )

    def _on_head_state(self, msg):
        self._state['pan'] = msg.pan
        self._state['panning'] = msg.isTurning
        self._state['nodding'] = msg.isNodding

    def pan(self):
        """
        Get the current pan angle of the head.

        @rtype: float
        @return: current angle in radians
        """
        return self._state['pan']

    def nodding(self):
        """
        Check if the head is currently nodding.

        @rtype: bool
        @return: True if the head is currently nodding, False otherwise.
        """
        return self._state['nodding']

    def panning(self):
        """
        Check if the head is currently panning.

        @rtype: bool
        @return: True if the head is currently panning, False otherwise.
        """
        return self._state['panning']

    def set_pan(self, angle, speed=1.0, timeout=10.0, scale_speed=False):
        """
        Pan at the given speed to the desired angle.

        @type angle: float
        @param angle: Desired pan angle in radians.
        @type speed: int
        @param speed: Desired speed to pan at, range is 0-1.0 [1.0]
        @type timeout: float
        @param timeout: Seconds to wait for the head to pan to the
                        specified angle. If 0, just command once and
                        return. [10]
        @param scale_speed: Scale speed to pan at by a factor of 100,
                            to use legacy range between 0-100 [100]
        """
        if scale_speed:
            cmd_speed = speed / 100.0;
        else:
            cmd_speed = speed
        if (cmd_speed < HeadPanCommand.MIN_SPEED_RATIO or
              cmd_speed > HeadPanCommand.MAX_SPEED_RATIO):
            rospy.logerr(("Commanded Speed, ({0}), outside of valid range"
                          " [{1}, {2}]").format(cmd_speed,
                          HeadPanCommand.MIN_SPEED_RATIO,
                          HeadPanCommand.MAX_SPEED_RATIO))
        msg = HeadPanCommand(angle, cmd_speed, True)
        self._pub_pan.publish(msg)

        if not timeout == 0:
            baxter_dataflow.wait_for(
                lambda: (abs(self.pan() - angle) <=
                         settings.HEAD_PAN_ANGLE_TOLERANCE),
                timeout=timeout,
                rate=100,
                timeout_msg="Failed to move head to pan command %f" % angle,
                body=lambda: self._pub_pan.publish(msg)
                )

    def command_nod(self, timeout=5.0):
        """
        Command the head to nod once.

        @type timeout: float
        @param timeout: Seconds to wait for the head to nod.
                        If 0, just command once and return. [0]
        """
        self._pub_nod.publish(True)

        if not timeout == 0:
            # Wait for nod to initiate
            baxter_dataflow.wait_for(
                test=self.nodding,
                timeout=timeout,
                rate=100,
                timeout_msg="Failed to initiate head nod command",
                body=lambda: self._pub_nod.publish(True)
            )

            # Wait for nod to complete
            baxter_dataflow.wait_for(
                test=lambda: not self.nodding(),
                timeout=timeout,
                rate=100,
                timeout_msg="Failed to complete head nod command",
                body=lambda: self._pub_nod.publish(False)
            )
def main():
    print("Initializing node... ")
    rospy.init_node("rsdk_head_wobbler")
    cabeza = Head()
    print cabeza.set_pan(0.3, speed=0.3, timeout=2)
    print cabeza.pan()
    rate = rospy.Rate(1)
    start = rospy.get_time() 
    while not rospy.is_shutdown() and (rospy.get_time() - start < 2.0):
        print cabeza.set_pan(0.3, speed=0.3, timeout=2)
        while not rospy.is_shutdown():
            #return rospy.get_param("/robot/head_position_controller/joints/head_controller/joint")
            print cabeza.pan()
    
    

if __name__ == '__main__':
    main()