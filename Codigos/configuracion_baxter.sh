#!/usr/bin/env bash

source /opt/ros/indigo/setup.bash
cd ~/ros_ws
catkin_make
cp src/baxter/baxter.sh .
./baxter.sh 