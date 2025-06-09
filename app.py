from flask import Flask, request, jsonify, render_template
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # ← Move this right after app is created

model = joblib.load('model.pkl')

@app.route('/')
def main_page():
    return render_template('MainPage.html')

#@app.route('/predict', methods=['POST'])
#def predict():
#    try:
#        data = request.get_json()
#        features = data['text']
#        prediction = model.predict([features])
#        return jsonify({'score': prediction.tolist()[0]})
#    except Exception as e:
#        return jsonify({'error': str(e)})
    
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        features = data['text']
        probability = model.predict_proba([features])[0][1]  # Assuming 1 = AI label
        return jsonify({'score': float(probability)})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
