from flask import Flask, request, jsonify
from PIL import Image
from torchvision import transforms
import pytesseract
from flask_cors import CORS
from ultralytics import YOLO

app = Flask(__name__)
CORS(app)

# Load my custom YOLOv8 model ( i will need to retrain on actual data taken with my webcam.)
#model = torch.hub.load('ultralytics/yolov8', 'custom', path='./runs/detect/train/weights/best.pt', source='local').eval()
model = YOLO('./runs/detect/train/weights/best.pt')


transform = transforms.Compose([
    transforms.ToTensor(),
])

@app.route('/test', methods=['GET'])
def helloWorld():
    return "Hello World", 200


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
    app.run(host='0.0.0.0', port=5000)

