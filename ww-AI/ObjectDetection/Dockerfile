FROM python:3.9-slim

WORKDIR /ww-AI/ObjectDetection

COPY . .

RUN pip install \
    pip install torch torchvision torchaudio -f https://download.pytorch.org/whl/cpu/torch_stable.html \
    Flask==3.0.2 \
    flask-cors==4.0.0 \
    Pillow==10.2.0 \
    pytesseract==0.3.10

EXPOSE 5000

ENV NAME World

# Run app.py when the container launches
CMD ["python", "app.py"]
