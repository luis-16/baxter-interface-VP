#!/usr/bin/env bash

#simulacion
source /opt/ros/indigo/setup.bash
cd ~/ros_ws
catkin_make
cp src/baxter/baxter.sh . 
./baxter.sh sim