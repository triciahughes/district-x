#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import Flask, request, session, make_response, jsonify, abort, render_template
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from werkzeug.exceptions import NotFound, Unauthorized
from config import app, db, api
from models import User, Post, Comment
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

class CreateAvatar(Resource):

    def patch(self, id):
        user = User.query.filter(User.id == id).first()

        if not user:
            return {'error': '404 Not Found'}, 404
        data = request.get_json()

        for key in data:
            setattr(user, key, data[key])
        
        db.session.add(user)
        db.session.commit()

        response = make_response(
            user.to_dict(),
            200
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
        posts = Post.query.order_by(Post.id.desc()).all()

        response = make_response(
            jsonify([post.to_dict() for post in posts]),
            200
        )
        return response

class PostById(Resource):

    def get(self, id):
        post = Post.query.filter(Post.id == id).first()

        if post:

            response = make_response(
                jsonify(post.to_dict()),
                200
            )
            return response

        return {'error': '404 Not Found'}, 404

    def patch(self, id):
        post = Post.query.filter(Post.id == id).first()

        if not post:
            return {'error': '404 Not Found'}, 404
        data = request.get_json()

        for key in data:
            setattr(post, key, data[key])
        
        db.session.add(post)
        db.session.commit()

        response = make_response(
            post.to_dict(),
            200
        )
        return response


class CreatePost(Resource):

    def post(self):

        data = request.get_json()

        new_post = Post(
            post=data['post'],
            user_id=data['user_id'],
            votes=data['votes'],
        )

        db.session.add(new_post)
        db.session.commit()

        response_dict = new_post.to_dict()

        response = make_response(
            response_dict,
            201
        )
        return response

class CreateComment(Resource):

    def post(self):

        data = request.get_json()

        new_comment = Comment(
            comment=data['comment'],
            user_id=data['user_id'],
            post_id=data['post_id'],
            votes=data['votes'],
        )

        db.session.add(new_comment)
        db.session.commit()

        response_dict = new_comment.to_dict()

        response = make_response(
            response_dict,
            201
        )
        return response

class CommentById(Resource):
    def get(self, id):
        comment = Comment.query.filter(Comment.id == id).first()

        if comment:

            response = make_response(
                jsonify(comment.to_dict()),
                200
            )
            return response

        return {'error': '404 Not Found'}, 404
    
    def patch(self, id):
        comment = Comment.query.filter(Comment.id == id).first()

        if not comment:
            return {'error': '404 Not Found'}, 404
        data = request.get_json()

        for key in data:
            setattr(comment, key, data[key])
        
        db.session.add(comment)
        db.session.commit()

        response = make_response(
            comment.to_dict(),
            200
        )
        return response



api.add_resource(Signup, '/signup')
api.add_resource(CreateAvatar, '/createavatar/<int:id>')
api.add_resource(AuthorizedSession, '/authorized')
api.add_resource(Signin, '/signin')
api.add_resource(Logout, '/logout')
api.add_resource(PostList, '/posts')
api.add_resource(PostById, '/posts/<int:id>')
api.add_resource(CreatePost, '/createpost')
api.add_resource(CommentById, '/comment/<int:id>')
api.add_resource(CreateComment, '/createcomment')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
