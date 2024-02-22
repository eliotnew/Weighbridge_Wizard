FROM python:3.9-slim-buster

WORKDIR /ww-AI/ObjectDetection

COPY . .

# Install PyTorch CPU-only
RUN pip install torch==1.8.1
RUN pip install torchvision==0.9.1
# RUN pip install torch==2.2.0

RUN pip install opencv-python-headless

RUN pip install --no-deps ultralytics

# Install other dependencies
RUN pip install Flask==3.0.2 flask-cors==4.0.0 Pillow==10.2.0 pytesseract==0.3.10
#RUN pip install git+https://github.com/ultralytics/yolov8#egg=ultralytics

EXPOSE 5000

# Run app.py when the container launches
CMD ["python", "app.py"]
