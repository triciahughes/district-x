#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, session, make_response, jsonify, abort, render_template
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import NotFound, Unauthorized
from config import app, db, api
from models import User, Post
from flask_cors import CORS

CORS(app)

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")

# Local imports
from config import app, db, api

# Views!
class Signup(Resource):

    def post(self):

        data = request.get_json()

        new_user = User(

            username=data['username']
        )

        new_user.password_hash = data['password']

        
        db.session.add(new_user)
        db.session.commit()

        session['user_id'] = new_user.id

        response = make_response(
            new_user.to_dict(),
            201
        )
        return response

class AuthorizedSession(Resource):

    def get(self):

        user = User.query.filter(User.id == session.get('user_id')).first()

        if user:

            response = make_response(
                jsonify(user.to_dict()),
                200
            )
            return response
        
        print("Did not find user.")

        return {'error': '401 Unauthorized'}, 401

class Signin(Resource):
    def post(self):

        data = request.get_json()

        username = data.get('username')
        password = data.get('password')

        user = User.query.filter(User.username == username).first()

            
        if user.authenticate(data['password']):

            session['user_id'] = user.id

            response = make_response(
                user.to_dict(),
                200
            )
            return response
        return {'error' : "Invalid Username or Password"}, 401

class Logout(Resource):

    def delete(self):

        if session.get('user_id'):

            session['user_id'] = None

            return {}, 204

        return {'error': '401 Unauthorized'}, 401

class PostList(Resource):

    def get(self):
        posts = Post.query.all()

        response = make_response(
            jsonify([post.to_dict() for post in posts]),
            200
        )
        return response

api.add_resource(Signup, '/signup')
api.add_resource(AuthorizedSession, '/authorized')
api.add_resource(Signin, '/signin')
api.add_resource(Logout, '/logout')
api.add_resource(PostList, '/posts')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
