from flask import Flask, render_template, request, jsonify, redirect, url_for
import json
import os
import uuid
from datetime import datetime

app = Flask(__name__)

# Ensure the required directories exist
os.makedirs('static/img/tshirts', exist_ok=True)
os.makedirs('static/img/designs', exist_ok=True)
os.makedirs('static/img/team', exist_ok=True)
os.makedirs('static/img/testimonials', exist_ok=True)
os.makedirs('static/img/about', exist_ok=True)

# Data files paths
USERS_FILE = 'users.json'
DESIGNS_FILE = 'designs.json'
ORDERS_FILE = 'orders.json'
MESSAGES_FILE = 'messages.json'

# Helper function to load JSON data
def load_json(file_path):
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            return json.load(f)
    return []

# Helper function to save JSON data
def save_json(file_path, data):
    with open(file_path, 'w') as f:
        json.dump(data, f, indent=2)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/customize')
def customize():
    return render_template('customize.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/cart')
def cart():
    # This would need to be implemented
    return render_template('index.html')  # Placeholder

@app.route('/faq')
def faq():
    # This would need to be implemented
    return render_template('index.html')  # Placeholder

@app.route('/shipping')
def shipping():
    # This would need to be implemented
    return render_template('index.html')  # Placeholder

@app.route('/terms')
def terms():
    # This would need to be implemented
    return render_template('index.html')  # Placeholder

@app.route('/privacy')
def privacy():
    # This would need to be implemented
    return render_template('index.html')  # Placeholder

@app.route('/designs')
def designs():
    # This would need to be implemented
    return render_template('index.html')  # Placeholder

# API Routes
@app.route('/api/contact', methods=['POST'])
def api_contact():
    data = request.json
    messages = load_json(MESSAGES_FILE)
    
    message = {
        'id': str(uuid.uuid4()),
        'firstName': data.get('firstName'),
        'lastName': data.get('lastName'),
        'email': data.get('email'),
        'phone': data.get('phone', ''),
        'subject': data.get('subject'),
        'message': data.get('message'),
        'date': datetime.now().isoformat()
    }
    
    messages.append(message)
    save_json(MESSAGES_FILE, messages)
    
    return jsonify({'success': True})

@app.route('/api/login', methods=['POST'])
def api_login():
    data = request.json
    users = load_json(USERS_FILE)
    
    email = data.get('email')
    password = data.get('password')
    
    for user in users:
        if user['email'] == email and user['password'] == password:  # In production, use proper password hashing
            return jsonify({'success': True})
    
    return jsonify({'success': False, 'message': 'Invalid email or password'})

@app.route('/api/signup', methods=['POST'])
def api_signup():
    data = request.json
    users = load_json(USERS_FILE)
    
    email = data.get('email')
    
    # Check if user already exists
    for user in users:
        if user['email'] == email:
            return jsonify({'success': False, 'message': 'Email already registered'})
    
    new_user = {
        'id': str(uuid.uuid4()),
        'firstName': data.get('firstName'),
        'lastName': data.get('lastName'),
        'email': email,
        'password': data.get('password'),  # In production, use proper password hashing
        'created_at': datetime.now().isoformat()
    }
    
    users.append(new_user)
    save_json(USERS_FILE, users)
    
    return jsonify({'success': True})

if __name__ == '__main__':
    app.run(debug=True)

