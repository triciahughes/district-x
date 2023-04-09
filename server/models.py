from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from config import db, bcrypt

class User(db.Model, SerializerMixin):

    __tablename__ = 'users'

    serialize_rules = ('-posts', '-_password_hash', '-comments',)

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)

    backdrop = db.Column(db.Float)
    clothingData = db.Column(db.Integer)
    eyeStyle = db.Column(db.Integer)
    hairColor = db.Column(db.String)
    hairStyle = db.column(db.Integer)
    skinColor = db.Column(db.String)
    thumbnail = db.Column(db.String)

    posts = db.relationship('Post', back_populates='user')
    comments = db.relationship('Comment', back_populates='user')

    @hybrid_property
    def password_hash(self):
        return self._password_hash
        
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8')
        )

    def __repr__(self):
        return f'<Username: {self.username} Password: {self._password_hash}'

    
class Post(db.Model, SerializerMixin):

    __tablename__ = 'posts'

    # serialize_rules = ('-comments',)

    id = db.Column(db.Integer, primary_key=True)
    post = db.Column(db.String)
    votes = db.Column(db.Integer)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates='posts')
    comments = db.relationship('Comment', back_populates='post')

    def __repr__(self):
        return f'<User: {self.user} Post: {self.post} Votes: {self.votes}>'

class Comment(db.Model, SerializerMixin):

    __tablename__ = 'comments'

    serialize_rules = ('-user.comments', '-post.comments',)

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String)
    votes = db.Column(db.Integer)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))

    user = db.relationship('User', back_populates='comments')
    post = db.relationship('Post', back_populates='comments')

    def __repr__(self):
        return f'<Comment: {self.comment} >'