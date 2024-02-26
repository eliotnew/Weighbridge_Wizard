from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
from PIL import Image
import numpy as np
from ultralytics import YOLO
import easyocr

app = Flask(__name__)
CORS(app)  

# __          __  _       _     _          _     _             __          ___                  _ 
# \ \        / / (_)     | |   | |        (_)   | |            \ \        / (_)                | |
#  \ \  /\  / /__ _  __ _| |__ | |__  _ __ _  __| | __ _  ___   \ \  /\  / / _ ______ _ _ __ __| |
#   \ \/  \/ / _ \ |/ _` | '_ \| '_ \| '__| |/ _` |/ _` |/ _ \   \ \/  \/ / | |_  / _` | '__/ _` |
#    \  /\  /  __/ | (_| | | | | |_) | |  | | (_| | (_| |  __/    \  /\  /  | |/ / (_| | | | (_| |
#     \/  \/ \___|_|\__, |_| |_|_.__/|_|  |_|\__,_|\__, |\___|     \/  \/   |_/___\__,_|_|  \__,_|
#   ____  _     _    __/ |  _     _____       _     __/ |  _   _                               _  
#  / __ \| |   (_)  |___/  | |   |  __ \     | |   |___/  | | (_)                             | | 
# | |  | | |__  _  ___  ___| |_  | |  | | ___| |_ ___  ___| |_ _  ___  _ __     __ _ _ __   __| | 
# | |  | | '_ \| |/ _ \/ __| __| | |  | |/ _ \ __/ _ \/ __| __| |/ _ \| '_ \   / _` | '_ \ / _` | 
# | |__| | |_) | |  __/ (__| |_  | |__| |  __/ ||  __/ (__| |_| | (_) | | | | | (_| | | | | (_| | 
#  \____/|_.__/| |\___|\___|\__| |_____/ \___|\__\___|\___|\__|_|\___/|_| |_|  \__,_|_| |_|\__,_| 
#             _/ |                                                                                
#   ____   __|__/_____     _____                                                                  
#  / __ \ / ____|  __ \   / ____|                                                                 
# | |  | | |    | |__) | | (___   ___ _ ____   _____ _ __                                         
# | |  | | |    |  _  /   \___ \ / _ \ '__\ \ / / _ \ '__|                                        
# | |__| | |____| | \ \   ____) |  __/ |   \ V /  __/ |                                           
#  \____/ \_____|_|  \_\ |_____/ \___|_|    \_/ \___|_|                                           
#

# Takes a photo at the endpoint , uses the custom YOLO model to identify a reg plate
# Then it uses easyocr (optical character recognition to return a string of the regplate. )                                                        


# Initialize the YOLO model
model = YOLO("./runs/detect/train3/weights/best.pt")
reader = easyocr.Reader(['en'])  

@app.route('/reg', methods=['POST'])

def detect_reg():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    file = request.files['image']
    image = Image.open(file.stream)  
    image_cv = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR) 

    results = model(image_cv)  # Run YOLO model inference
    print("showing the results attributes:")
    attributes = dir(results[0])
    print(attributes)

    print("showing results[0].boxes attributes")
    attributes2 = dir(results[0].boxes)
    print(attributes2)

    textString = ""; 
    for box in results[0].boxes:  # results[0].boxes.xyxy is where the co-ordinates are saved. (took me ages to find!)
        
        x1, y1, x2, y2 = box.xyxy.tolist()[0]

        print(x1)
        print("that was x1")
        print(x2)
        print("that was x2 ^") ## Should correctly show a number 

        cropped_img = image_cv[int(y1):int(y2), int(x1):int(x2)] 

        ocr_result = reader.readtext(cropped_img)
        for _, text, _ in ocr_result:
            textString+=text

    return jsonify({'extracted_texts': textString}), 200


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
