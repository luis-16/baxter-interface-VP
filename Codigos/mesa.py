
import subprocess #para oprimir ctrl+c
import signal #para oprimir ctrl+c
import time # delay
import math as math
import numpy
import csv
import rospy, tf
from gazebo_msgs.srv import DeleteModel, SpawnModel
from geometry_msgs.msg import *

from gazebo_msgs.srv import SpawnModel
spawn_model_client = rospy.ServiceProxy('/gazebo/spawn_sdf_model', SpawnModel)
spawn_model_client(
    model_name='table',
    model_xml=open('/home/baxter/.gazebo/models/table/model.sdf', 'r').read(),
    robot_namespace='/foo',
    initial_pose=Pose(position= Point(1,0,0),orientation=Quaternion(0,0,0,1)),
    reference_frame='world'
)

def delete_model():
    # Delete the old model if it's stil around
    delete_model_client = rospy.ServiceProxy('gazebo/delete_model', DeleteModel)
    delete_model_client('table'
        #model_name='table',
        #model_xml=open('/home/baxter/.gazebo/models/table/model.sdf', 'r').read(),
        #robot_namespace='/foo',
        #initial_pose=Pose(position= Point(1,1,0),orientation=Quaternion(0,0,0,0)),
        #reference_frame='world'
    )
spawn_model_client(
    model_name='coke can',
    model_xml=open('/home/baxter/.gazebo/models/coke_can/model.sdf', 'r').read(),
    robot_namespace='/foo',
    initial_pose=Pose(position= Point(1,0,1.03),orientation=Quaternion(0,0,0,1)),
    reference_frame='world'
)
 
time.sleep(5)
delete_model()