from project import app, db, bcrypt
from project.models import User, Puppy
from flask_testing import TestCase
import unittest
from flask import jsonify, json
import jwt

def authenticate(username, password):
		user = User.query.filter(User.username == username).first()
		if bcrypt.check_password_hash(user.password, password):
			token = jwt.encode({'id': user.id}, 'secret', algorithm='HS256').decode('utf-8')
			return token

class TestinTime(TestCase):

	def _login_user(self):
		return self.client.post('/api/users/auth',
							content_type='application/json',
							data=json.dumps({
								'username': 'aliesenfelt',
								'password': 'pass1'
								})).json

	def create_app(self):
		app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///testing.db'
		return app

	def setUp(self):
		db.create_all()
		user1 = User(username='aliesenfelt', password='pass1')
		user2 = User(username='ttaylor', password='pass2')
		user3 = User(username='amundy', password='pass3')
		db.session.add_all([user1, user2, user3])
		db.session.commit()
		
	def tearDown(self):
		db.drop_all()

	def test_home(self):

		token = self._login_user()
		# Figure out the name of the header
		# figure out the value of the header
			# add the token to the header

		response = self.client.get('/api/users',
									headers= dict(
										token= 'Authorization JWT ' + token
										),
									content_type='application/json')
		expected_json = [{
			'id': 1,
			'username': 'aliesenfelt',
			'puppies': []
		}, {
			'id': 2,
			'username': 'ttaylor',
			'puppies': []
		}, {
			'id': 3,
			'username': 'amundy',
			'puppies': []
		}]
		

		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.json, expected_json)

	def test_signup(self):
		response = self.client.post('/api/users',
					content_type='application/json',
					data=json.dumps({
						'username': 'newuser',
						'password': 'whatever'
						}))
		expected_json = {
			'id': 4,
			'username': 'newuser',
			'puppies': []
		}
		self.assertEqual(response.status_code, 200)
		self.assertEqual(str(response.json), str(expected_json))

	def test_auth(self):
		response = self.client.post('api/users/auth',
									content_type='application/json',
									data=json.dumps({
										'username': 'aliesenfelt',
										'password': 'pass1'
									}))
		expected_json = {
			authenticate('aliesenfelt', 'pass1')
		}
		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.json, str(expected_json).replace("{", "").replace("}", "").replace("'", ""))

	def 



if __name__ == '__main__':
  unittest.main()


