import torch
from flask import Flask, request, jsonify
from PIL import Image
from torchvision import transforms
import pytesseract

app = Flask(__name__)

# Load YOLOv8n model
model = torch.hub.load('ultralytics/yolov8', 'yolov8n', pretrained=True).eval()  # Adjust for the correct path or model version

transform = transforms.Compose([
    transforms.ToTensor(),
])

@app.route('/reg', methods=['POST'])
def upload_image():
    if 'image' in request.files:
        image = request.files['image']
        try:
            detections = detectObjects(image)
            cropped_images = cropPlate(image, detections)
            text = extractRegText(cropped_images)
            return jsonify({'text': text}), 200
        except Exception as e:
            print(e)
            return "Error processing image", 500
    else:
        return "No image found", 400

def detectObjects(image):
    img = Image.open(image).convert('RGB') 
    img_tensor = transform(img).unsqueeze(0)
    results = model(img_tensor)
    detections = results.pred[0]  # Get predictions
    return detections

def cropPlate(image, detections):
    img = Image.open(image)
    cropped_images = []
    for *xyxy, conf, cls in detections:
        if conf > 0.5:  #  If the Confidence threshold is high enough (50%)
            x1, y1, x2, y2 = map(int, xyxy)
            cropped_image = img.crop((x1, y1, x2, y2))
            cropped_images.append(cropped_image)
    return cropped_images

def extractRegText(images):
    text = ""
    for img in images:
        extracted_text = pytesseract.image_to_string(img)
        text += extracted_text + "\n"
    return text.strip()

if __name__ == '__main__':
    app.run(debug=True)
