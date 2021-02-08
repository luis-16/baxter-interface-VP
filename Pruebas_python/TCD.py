import numpy as np
import matplotlib
import math

np.set_printoptions(precision=8)
np.set_printoptions(suppress=False)

theta1=0.;
theta2=0.;
theta3=0.;
theta4=0.;
theta5=math.pi/4.;
theta6=math.pi/2.;
theta7=0.;

HW0=1101/1000.
L=278/1000.
h=64/1000.

L0=270.35/1000.
L1 = 0.069#69/1000.
L2=364.35/1000.
L3=69/1000.
L4=374.29/1000.
L5=0.
L6=368.30/1000.
Lh=math.sqrt(L2**2+L3**2)

T01=np.array([[math.cos(theta1), -math.sin(theta1), 0, 0],
              [math.sin(theta1), math.cos(theta1) , 0, 0],
              [0               , 0                , 1, 0],
              [0               , 0                , 0, 1]])

T12=np.array([[math.cos(theta2) , -math.sin(theta2), 0, L1],
              [0                , 0                , 1, 0 ],
              [-math.sin(theta2), -math.cos(theta2), 0, 0 ],
              [0                , 0                , 0, 1 ]])

T23=np.array([[-math.sin(theta4), -math.cos(theta4) , 0, Lh],
              [math.cos(theta4) , -math.sin(theta4) , 0,  0],
              [0                , 0                 , 1,  0],
              [0                , 0                 , 0,  1]])

T34=np.array([[math.cos(theta5), -math.sin(theta5), 0 ,  0 ],
              [0               , 0                , -1, -L4],
              [math.sin(theta5), math.cos(theta5) , 0 ,   0],
              [0               , 0                , 0 ,   1]])

T45=np.array([[math.cos(theta6) , -math.sin(theta6), 0, L5],
              [0                , 0                , 1, 0 ],
              [-math.sin(theta6), -math.cos(theta6), 0, 0 ],
              [0                , 0                , 0, 1 ]])

T56= np.array([[math.cos(theta7), -math.sin(theta7),  0, 0],
               [0               , 0                , -1, 0],
               [math.sin(theta7), math.cos(theta7) ,  0, 0],
               [0               , 0                ,  0, 1]])
 
TWB= np.array([[math.sqrt(2)/2 , math.sqrt(2)/2, 0, L],
               [-math.sqrt(2)/2, math.sqrt(2)/2, 0, -h],
               [0              , 0             , 1, HW0],
               [0              , 0             , 0, 1]])
 
TB0= np.array([[1, 0, 0, 0 ],
               [0, 1, 0, 0 ],
               [0, 0, 1, L0],
               [0, 0, 0, 1 ]])
 
T6GL= np.array([[1, 0, 0, 0 ],
                [0, 1, 0, 0 ],
                [0, 0, 1, L6],
                [0, 0, 0, 1 ]])
 
#T06=T01 @ T12 @ T23 @ T34 @ T45 @ T56
#TWG=TWB @ TB0 @ T06 @ T6GL
TS = T12.dot(T01).dot(T23)#.dot(T34).dot(T45).dot(T56)
#print(type(TS),TS.astype(float))
#print(TS.astype(float),T01.astype(float))
#print(T01,T01.dtype,type(T01),L1)

np.set_printoptions(precision=8)
np.set_printoptions(suppress=False)
print(T01)
print(T12)
print(T23)
print(TS)