#!/usr/bin/env python3

# Standard library imports
# from random import randint, choice as rc

# Remote library imports
# from faker import Faker

# Local imports
from app import app
from models import db, User

if __name__ == '__main__':
    # fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        User.query.delete()

        db.session.commit()

        print("Seeding users...")

        user1 = User(username="hello")
        user1.password_hash = "tricia"

        db.session.add(user1)
        db.session.commit()

        print("Seeding users finished!")



