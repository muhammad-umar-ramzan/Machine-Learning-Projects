from flask import Flask, request, jsonify
from flask_cors import CORS
import util

app = Flask(__name__)
CORS(app)

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        "locations": util.get_location_names()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/predict_home_price", methods=['POST'])
def predict_home_price():
    # Use request.json to get the data sent from the client
    data = request.json
    total_sqft = float(data['total_sqft'])
    location = data['location']
    bhk = float(data['bhk'])
    bath = float(data['bath'])

    estimated_price = util.get_estimated_price(location, total_sqft, bhk, bath)
    
    response = jsonify({
        "estimated_price": estimated_price
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    print("Welcome")
    util.load_saved_artifacts()
    app.run(port=5000)  # Make sure the port matches your client-side fetch URL
