#!/usr/bin/env python
# -*- coding: utf-8 -*-

#importar librerias:

import subprocess #para oprimir ctrl+c
import signal #para oprimir ctrl+c
import time # delay

import rospy

from std_msgs.msg import (
    UInt16,
)

import baxter_interface

from baxter_interface import CHECK_VERSION

class Home(object):

    def __init__(self):

        self._pub_rate = rospy.Publisher('robot/joint_state_publish_rate',UInt16, queue_size=10)
        self._left_arm = baxter_interface.limb.Limb("left")
        self._right_arm = baxter_interface.limb.Limb("right")
        self._left_joint_names = self._left_arm.joint_names()
        self._right_joint_names = self._right_arm.joint_names()
        self._head = baxter_interface.Head()

        # control parameters
        self._rate = 500.0  # Hz

        self._rs = baxter_interface.RobotEnable(CHECK_VERSION)
        self._init_state = self._rs.state().enabled
        self._rs.enable()  
        #print("Habilitando robot... ")

        # set joint state publishing to 500Hz
        self._pub_rate.publish(self._rate)

    def set_neutral(self):
        #print("Moving to neutral pose...")
        self._left_arm.move_to_neutral()
        self._right_arm.move_to_neutral()        
        self._head.set_pan(0.0)

    def move_home(self):
        #return to normal
        self.set_neutral()
        if not self._init_state:
            print("Deshabilitando robot...")
            self._rs.disable()

def main():
    rospy.init_node("Home")
    robot = Home()
    robot.move_home()
    #print("Done.")

if __name__ == '__main__':
    main()
# probar con:
# python Home.py ejemplo de ejecucion