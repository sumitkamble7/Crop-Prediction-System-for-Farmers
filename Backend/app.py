import pickle
import numpy as np
from flask import Flask
from flask_cors import CORS
from flask import request
model = pickle.load(open('model.pkl','rb'))
app = Flask(__name__)
cors = CORS(app)

@app.route('/', methods=['POST'])
def predict():
    arr = []
    data = request.get_json()
    for no in data.values():
        arr.append(no)
    prd = [np.array(arr)]
    result = model.predict(prd)
    return {'result':result[0]}

if __name__ == "__main__":
    app.run()


