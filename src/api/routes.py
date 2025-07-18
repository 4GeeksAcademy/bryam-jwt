"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/me', methods=['GET'])
@jwt_required()
def handle_me():
    identity = get_jwt_identity()  #identidad del usuario o el id
    claims = get_jwt()   #información extra agregada en los claims
    role = claims.get('role')   #rol del usuario.
    otra_informacion = claims.get('otra_informacion')
    print(claims)
   

    return jsonify({
        "ok": True,
        "user_id": identity, 
        "msg": "Aqui va toda ltu informacion",
        "role": role,
        "info_adicional": otra_informacion
    }), 200 
