#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
#echo "$DIR"
#cd "$DIR"
source /opt/ros/indigo/setup.bash
source ~/ros_ws/devel/setup.sh

#K=$(wmctrl -l | grep Gazebo) 
#echo $K + "hola"
PID=$$
#echo $PID
#for word in $K
#do
#    echo $word
#done
#read -ra arr <<<"$K"
#F=$(xdotool search --onlyvisible --name Gazebo)
#echo $F
#xdotool windowsize $F 650 716
#xdotool windowmove 123 0 1080
#echo ${arr[0]}
#gst-launch-1.0  ximagesrc xid="${arr[0]}" startx=0 use-damage=0 show-pointer=false ! video/x-raw,framerate=30/1,cursor=TRUE ! ximagesink
#/home/baxter/Documentos/baxter/intento21/Codigos/ffmpeg.sh
python Codigos/scritp_programa.py
#kill $PID