import cv2
from ultralytics import YOLO 

# Initialize the YOLO model with custom weights
regPlateModel = "./runs/detect/train3/weights/best.pt"  # Path to your model
model = YOLO(regPlateModel)

# Open webcam (source 0)
cap = cv2.VideoCapture(0)

# Check if the webcam was successfully opened
if not cap.isOpened():
    print('Error opening video stream')
    exit()

# Loop to perform object detection on each frame
while True:
    ret, frame = cap.read()

    if not ret:
        break

    # Perform object detection on the frame
    results = model(frame)

    # Display predictions on the frame with boxes and annotations
    for obj in results:
        for i in range(len(obj)):
            label = f"{model.names[int(obj.boxes.cls[i])]}: {obj.boxes.conf[i]:.2f}"
            xyxy = obj.boxes.xyxy[i]
            x1, y1, x2, y2 = [int(x) for x in xyxy]
            cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 0), 2)
            cv2.putText(frame, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    cv2.imshow("frame", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):  # Press 'q' to exit
        break

cap.release()
cv2.destroyAllWindows()