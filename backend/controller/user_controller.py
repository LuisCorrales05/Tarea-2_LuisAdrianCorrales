from flask import Flask, render_template, request, redirect, url_for, Blueprint, jsonify
from services.user_service import UserService

user_blueprint = Blueprint('user', __name__)
user_service = UserService()

@user_blueprint.route('/submit', methods=['POST']) 
def submit():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not name or not email or not message:
        return jsonify({'status': 'error', 'message': 'Invalid input data'}), 400
    
    user = user_service.create_user(name, email, message)
    return jsonify(user.serialize())

@user_blueprint.route('/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = user_service.get_user(user_id)
    if user:
        return jsonify(user.serialize())
    else:
        return jsonify({'error': 'User not found'}), 404
    
@user_blueprint.route('/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not name or not email or not message:
        return jsonify({'status': 'error', 'message': 'Invalid input data'}), 400

    if user_service.update_user(user_id, name, email, message):
        user = user_service.get_user(user_id)
        return jsonify(user.serialize())
    else:
        return jsonify({'error': 'User not found'}), 404
    
@user_blueprint.route('/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    if user_service.delete_user(user_id):
        return '', 204
    else:
        return jsonify({'error': 'User not found'}), 404