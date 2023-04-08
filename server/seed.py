#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Post, Comment

if __name__ == '__main__':
    fake = Faker()

    with app.app_context():
        print("Deleting all records...")
        Comment.query.delete()
        User.query.delete()
        Post.query.delete()
        # db.session.commit()

        fake = Faker()

        print("Creating users...")

        usernames = []

        for i in range(10):
        
            username = fake.first_name()

            user = User(
                username=username,)

            user.password_hash = user.username + 'password'

            usernames.append(user)

        db.session.add_all(usernames)

        print("Seeding users finished!")

        print("Creating posts...")

        posts = []
        for i in range(15):
            instructions = fake.paragraph(nb_sentences=1)

            post = Post(
                post=fake.sentence(),
                votes=fake.random_int(min=0, max=100),
                user_id=fake.random_int(min=1, max=10),
            )

            posts.append(post)

        db.session.add_all(posts)
        db.session.commit()

        print("Seeding posts finished!")

        print("Creating comments...")

        comments = []

        for i in range(30):
            instructions = fake.paragraph(nb_sentences=1)

            comment = Comment(
                comment=fake.sentence(),
                user_id=fake.random_int(min=1, max=10),
                post_id=fake.random_int(min=1, max=15),
            )

            comments.append(comment)
        
        db.session.add_all(comments)
        db.session.commit()

        print("Seeding comments finished!")



        



