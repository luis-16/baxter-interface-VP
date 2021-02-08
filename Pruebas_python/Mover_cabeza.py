#!/usr/bin/env python
# -*- coding: utf-8 -*-

#importar librerias:

import sys
import argparse

import rospy

import time
import actionlib


import sched, time

from control_msgs.msg import (
    SingleJointPositionAction,
    SingleJointPositionGoal,
)

import baxter_interface
import baxter_control

from baxter_interface import CHECK_VERSION


posicion_cabeza = sys.argv
posicion = float(posicion_cabeza[1])

class cabeza(object):

    def __init__(self):
        self._salir = False
        self._head = baxter_interface.Head()
        print("Estado del robot... ")
        self._rs = baxter_interface.RobotEnable(CHECK_VERSION)
        self._init_state = self._rs.state().enabled
        print("Habilitar robot... ")
        self._rs.enable()

    def apagar(self):
        if not self._init_state and self._rs.state().enabled:
            print("Deshabilitando robot...")
            self._rs.disable()


    def posicion_inicial(self):
        self._head.set_pan(0.0)

    def cabeceo(self):
        self._head.command_nod()
        command_rate = rospy.Rate(100)
        control_rate = rospy.Rate(100)
        start = rospy.get_time()
        angulo = posicion
        #print (type(self._head))
        #print (type(baxter_interface.Head()))
        # head_controller:
        # pid: {p: 10.0, i: 0.01, d: 5.0}
        self.pid = baxter_control.PID()
        self.pid.set_kp(10)
        self.pid.set_ki(0.01)
        self.pid.set_kd(5)
        print baxter_interface.HEAD_PAN_ANGLE_TOLERANCE
        angulo = baxter_interface.HEAD_PAN_ANGLE_TOLERANCE*1.1
        s = sched.scheduler(time.time, time.sleep)
        def medir(self):
            #print (self.head.pan())
                #s.enter(time.time(), 1, medir,argument=(""))
        #while not rospy.is_shutdown() and (rospy.get_time() - start < 2.0):
        while not rospy.is_shutdown() and not (abs(self._head.pan() - angulo) <= baxter_interface.HEAD_PAN_ANGLE_TOLERANCE):
            print (str(angulo)+" Hola")
            while (not rospy.is_shutdown() and not (abs(self._head.pan() - angulo) <= baxter_interface.HEAD_PAN_ANGLE_TOLERANCE)):
                print rospy.get_time() - start 
                self._head.set_pan(angulo, speed=0.3, timeout=2)

                #print self._head.panning()
                entrada = self.pid.compute_output(self._head.pan() - angulo)
                #print entrada
                print str(self._head.pan()) + " Ho"
                control_rate.sleep()
            command_rate.sleep()
            angulo = posicion
        self._salir = True
        rospy.signal_shutdown("Example finished.")
        print (self._head.pan())

def main():
    print("Initializing node... ")
    rospy.init_node("rsdk_head_wobbler")

    wobbler = cabeza()
    wobbler.posicion_inicial()
    wobbler.cabeceo()
    print("saliendo.")

if __name__ == '__main__':
    main()

# probar con:
# python Home.py ejemplo de ejecucion