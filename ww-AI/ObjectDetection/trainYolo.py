# This code will train an object detection model from the images found in "./Images" and the Annotations found in "./Annotations". I annotated using "makesense.ai".
# I will use Yolo v8s because of it's lightweight and fast object detection ability.
# Detected objects will be used to then export and identify text values within the number plates.

import os
import sys
import torch
import ultralytics

from ultralytics import YOLO

#use the yolo v8 nano model
model = YOLO("yolov8s.yaml") # or was it model = YOLO("yolov8n.pt")

# train the model on my data defined in data.yaml
model.train(data='data.yaml' ,epochs=20) 

metrics = model.val()


model.export(format='torchscript', model='./exportedModels/trained_yolov8n.pt')
