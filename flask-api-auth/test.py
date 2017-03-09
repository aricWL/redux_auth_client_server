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
		puppy1 = Puppy('whiskey', 2)
		puppy2 = Puppy('moxie', 3)
		db.session.add_all([user1, user2, user3, puppy1, puppy2])
		db.session.commit()
		
	def tearDown(self):
		db.drop_all()

	def test_home(self):
		print('testing')
		cool = self._login_user()

		# Figure out the name of the header
		# figure out the value of the header
			# add the token to the header

		response = self.client.get('/api/users',
									headers= dict(
										authorization= 'JWT ' + cool['token']
										),
									content_type='application/json')
		expected_json = [{
			'id': 1,
			'username': 'aliesenfelt',
			'puppies': []
		}, {
			'id': 2,
			'username': 'ttaylor',
			'puppies': [{'id': 1, 'name': 'whiskey'}]
		}, {
			'id': 3,
			'username': 'amundy',
			'puppies': [{'id': 2, 'name': 'moxie'}]
		}]

		

		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.json, expected_json)

	def test_signup(self):
		print('the')
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
		print('god')
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
		self.assertEqual(response.json, {'token': str(expected_json).replace("{", "").replace("}", "").replace("'", ""), 'id': 1})

	def test_get_user(self):
		print('to')
		cool = self._login_user()

		response = self.client.get('api/users/1',
									headers= dict(
										authorization= 'JWT ' + cool['token']
										),
									content_type='application/json')
		expected_json = ({
			'id': 1,
			'username': 'aliesenfelt',
			'puppies': []
		})
		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.json, expected_json)


	def test_edit_user(self):
		print('down')
		cool = self._login_user()
		
		response = self.client.put('api/users/1',
									headers= dict(
										authorization= 'JWT ' + cool['token']
										),
									content_type='application/json',
									data=json.dumps({
										'username': 'aliesenfelt2',
										'password': 'pass2'
										}))
		expected_json = ({
			'id': 1,
			'username': 'aliesenfelt2',
			'puppies': []
		})

		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.json, expected_json)

	def test_delete_user(self):
		print('bow')
		cool = self._login_user()
		
		response = self.client.delete('api/users/1',
									headers= dict(
										authorization= 'JWT ' + cool['token']
										),
									content_type='application/json')
		

		self.assertEqual(response.status_code, 204)
		self.assertEqual(User.query.count(), 2)

	def test_puppies(self):
		cool = self._login_user()

		response = self.client.get('api/users/2/puppies',
									headers= dict(
										authorization = 'JWT ' + cool['token']
										),
									content_type='application/json')

		expected_json = ([{
			'id': 1,
			'name': 'whiskey',
			'user': {
				'id': 2,
				'username': 'ttaylor'
			}
			}])

		self.assertEqual(response.status_code, 200)
		self.assertEqual(response.json, expected_json)


if __name__ == '__main__':
  unittest.main()


