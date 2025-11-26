from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from faker import Faker

User = get_user_model()


class AccountsTests(APITestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls.faker = Faker() 

    # Test successful user registration
    def test_register_user_success(self):
        url = reverse('register')
        data = {
            'username': self.faker.user_name(),
            'email': self.faker.unique.email(),
            'name': self.faker.name(),
            'password': 'strongpassword123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username=data['username']).exists())

        user = User.objects.get(username=data['username'])
        self.assertNotEqual(user.password, 'strongpassword123')
        self.assertTrue(user.check_password('strongpassword123'))

    # Test registration failure: missing password
    def test_register_user_missing_password(self):
        url = reverse('register')
        data = {
            'username': self.faker.user_name(),
            'email': self.faker.unique.email(),
            'name': self.faker.name(),
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('password', response.data)

    # Test registration failure: duplicate username
    def test_register_user_duplicate_username(self):
        username = self.faker.user_name()
        User.objects.create_user(username=username, email=self.faker.unique.email(), password='12345')

        url = reverse('register')
        data = {
            'username': username,
            'email': self.faker.unique.email(),
            'name': self.faker.name(),
            'password': 'strongpassword123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('username', response.data)

    # Test registration failure: duplicate email
    def test_register_user_duplicate_email(self):
        email = self.faker.unique.email()
        User.objects.create_user(username=self.faker.user_name(), email=email, password='12345')

        url = reverse('register')
        data = {
            'username': self.faker.user_name(),
            'email': email,
            'name': self.faker.name(),
            'password': 'strongpassword123'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)

    # Test successful login
    def test_login_user_success(self):
        password = 'strongpassword123'
        user = User.objects.create_user(username=self.faker.user_name(), email=self.faker.unique.email(), password=password)
        url = reverse('token_obtain_pair')
        data = {'username': user.username, 'password': password}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)

    # Test login failure: wrong password
    def test_login_user_wrong_password(self):
        user = User.objects.create_user(username=self.faker.user_name(), email=self.faker.unique.email(), password='correctpass')
        url = reverse('token_obtain_pair')
        data = {'username': user.username, 'password': 'incorrect'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # Test profile access requires authentication
    def test_profile_authenticated(self):
        password = 'strongpassword123'
        user = User.objects.create_user(username=self.faker.user_name(), email=self.faker.unique.email(), password=password)
        self.client.force_authenticate(user=user)
        url = reverse('profile')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], user.username)
        self.assertEqual(response.data['email'], user.email)

    # Test profile access without authentication
    def test_profile_unauthenticated(self):
        url = reverse('profile')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
