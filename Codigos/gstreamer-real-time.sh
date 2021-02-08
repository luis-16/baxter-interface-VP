#!/usr/bin/env bash

#DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
#echo "$DIR"
#cd "$DIR"

#ffmpeg -devices

K=$(wmctrl -l | grep Gazebo) 
echo $K + "hola"
read -ra arr <<<"$K"
#F=$(xdotool search --onlyvisible --name Gazebo)
#echo ${arr[0]:2:1000} + "SI"
F=$((16#${arr[0]:2:1000}))
echo $F
#xdotool windowactivate $F
#xdotool key F11
#xdotool windowsize $F 100 716 #Usage: windowsize [--sync] [--usehints] [window=%1] width height
#xdotool windowactivate $F
#xdotool key F11
#xdotool key F11
#xdotool windowmove $F 0 0 #x,y
#echo ${arr[0]}

K=$(wmctrl -l | grep Gazebo) 
echo $K + "hola"
PID=$$
echo "PID" + $PID 
read -ra arr <<<"$K"
#gst-launch-1.0  ximagesrc xid="${arr[0]}" startx=600 starty=50 endx=1200 endy=400 use-damage=0 show-pointer=false ! video/x-raw,framerate=30/1 ! ximagesink
gst-launch-1.0  ximagesrc xid="${arr[0]}" startx=600 starty=50 endx=1200 endy=400 use-damage=0 show-pointer=false  ! video/x-raw,framerate=30/1 ! videoconvert ! x264enc ! mpegtsmux ! queue ! tcpserversink host=127.0.0.1 port=8080 



