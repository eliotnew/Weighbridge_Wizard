from flask import Flask, request

# This is a flask app to run image plate recognition server side for the weighbridge wizard.

app = Flask(__name__)

@app.route('/reg', methods=['POST'])
def upload_image():
    if 'image' in request.files:
        image = request.files['image']
        # Process the image here
        return "Image received", 200
    else:
        return "No image found", 400

if __name__ == '__main__':
    app.run(debug=True)