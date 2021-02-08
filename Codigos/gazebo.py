#!/usr/bin/env python
# -*- coding: utf-8 -*-

#importar librerias:

import subprocess #para oprimir ctrl+c
import signal #para oprimir ctrl+c
import time # delay
import math as math
import numpy
import csv
import rospy, tf
from gazebo_msgs.srv import DeleteModel, SpawnModel
from geometry_msgs.msg import *

from std_msgs.msg import (
    UInt16,
)

import baxter_interface

from baxter_interface import CHECK_VERSION

class Comandos(object):

    def __init__(self):

        self._pub_rate = rospy.Publisher('robot/joint_state_publish_rate',UInt16, queue_size=10)
        self._left_arm = baxter_interface.limb.Limb("left")
        self._right_arm = baxter_interface.limb.Limb("right")
        self._left_joint_names = self._left_arm.joint_names()
        self._right_joint_names = self._right_arm.joint_names()
        self._head = baxter_interface.Head()
        self.right_gripper = baxter_interface.Gripper('right', CHECK_VERSION)
        self.left_gripper = baxter_interface.Gripper('left', CHECK_VERSION)

        # control parameters
        self._rate = 1000.0  # Hz

        self._rs = baxter_interface.RobotEnable(CHECK_VERSION)
        self._init_state = self._rs.state().enabled
        self._rs.enable()  
        #print("Habilitando robot... ")

        # set joint state publishing to 500Hz
        self._pub_rate.publish(self._rate)

    def update_gazebo_models(self):
        #modelState = ModelState()
        #self.pub_modelstate = rospy.Publisher( '/gazebo/set_model_state', ModelState, queue_size=10)
        #print  self.pub_modelstate
        model_coordinates = rospy.ServiceProxy('/gazebo/model_state')
        print model_coordinates

    def deleteModel(self):
        rospy.wait_for_service('gazebo/delete_model')
        del_model_prox = rospy.ServiceProxy('gazebo/delete_model', DeleteModel)
        del_model_prox(self.modelName)

def main():
    rospy.init_node("programa")
    robot = Comandos()
    robot.update_gazebo_models()
    #robot.deleteModel()
    print 'EXITOSO'

if __name__ == '__main__':
 	 main()


# nodos rostopic de gazebo Comando = rostopic list
#/gazebo/link_states
#/gazebo/model_states
#/gazebo/parameter_descriptions
#/gazebo/parameter_updates
#/gazebo/set_link_state
#/gazebo/set_model_state

#listado de servios de gazebo en ros rosservice list

#/gazebo/apply_body_wrench
#/gazebo/apply_joint_effort
#/gazebo/clear_body_wrenches
#/gazebo/clear_joint_forces
#/gazebo/delete_model
#/gazebo/get_joint_properties
#/gazebo/get_link_properties
#/gazebo/get_link_state
#/gazebo/get_loggers
#/gazebo/get_model_properties
#/gazebo/get_model_state
#/gazebo/get_physics_properties
#/gazebo/get_world_properties
#/gazebo/pause_physics
#/gazebo/reset_simulation
#/gazebo/reset_world
#/gazebo/set_joint_properties
#/gazebo/set_link_properties
#/gazebo/set_link_state
#/gazebo/set_logger_level
#/gazebo/set_model_configuration
#/gazebo/set_model_state
#/gazebo/set_parameters
#/gazebo/set_physics_properties
#/gazebo/spawn_gazebo_model
#/gazebo/spawn_sdf_model
#/gazebo/spawn_urdf_model
#/gazebo/unpause_physics
#/gazebo_client/get_loggers
#/gazebo_client/set_logger_level