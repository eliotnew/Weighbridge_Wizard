FROM python:3.9-slim

WORKDIR /ww-AI/ObjectDetection

COPY . .

# Install dependencies
RUN apt-get update && \
    pip install psutil && \ 
    apt-get install -y libgl1-mesa-glx libglib2.0-0 && \
    pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

# Run app.py when the container launches
CMD ["python", "app.py"]
