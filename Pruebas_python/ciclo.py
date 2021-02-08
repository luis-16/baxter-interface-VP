
import sys
import argparse
#import sum

parametros = sys.argv
iteraciones = int(parametros[1])
#sum.py
#archivo1 = __import__('sum')
for x in range(iteraciones):
  print(str(x) + "hola")
  for x in parametros[2:]:
      if (x.find("_") != -1):
          print(x.split("_"))
          