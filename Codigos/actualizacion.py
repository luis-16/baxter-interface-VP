#!/usr/bin/env python
# -*- coding: utf-8 -*-

#importar librerias:

import subprocess #para oprimir ctrl+c
import signal #para oprimir ctrl+c
import time # delay
import math as math
import numpy
import csv

import rospy

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
    
    def finish(self):     
        if not self._init_state:
            print("Deshabilitando robot...")
            self._rs.disable()

    def actualizar(self):
        def Deg_rad(angulos):
            ANG = []
            for X in angulos:
                ANG.append(math.degrees(X))
            return ANG

        self._head.command_nod()
        command_rate = rospy.Rate(100)
        control_rate = rospy.Rate(100)
        print rospy.get_time()
        angulo = math.degrees(self._head.pan())
        print angulo
        command_rate.sleep()
        angulos_izquierdos = self._left_arm.joint_angles()
        angulos_derechos = self._right_arm.joint_angles()
        print angulos_izquierdos
        print angulos_derechos
        pinza_derecha = self.left_gripper.position()
        pinza_izquierda = self.right_gripper.position()
        print pinza_derecha
        print pinza_izquierda
        print "\n"

def main():
    rospy.init_node("medidas")
    robot = Comandos()
    while True:
        robot.actualizar()

if __name__ == '__main__':
 	 main()