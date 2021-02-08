#!/usr/bin/env bash

source /opt/ros/indigo/setup.bash
source ~/ros_ws/devel/setup.sh
rospack rosdep baxter_gazebo /home/baxter/ros_ws/src/baxter_simulator/baxter_gazebo
roslaunch baxter_gazebo baxter_world.launch