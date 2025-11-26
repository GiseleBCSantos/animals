from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from animals.models import Animal
from faker import Faker
import random

User = get_user_model()
fake = Faker()

class AnimalAPITestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username=fake.user_name(),
            email=fake.email(),
            name=fake.name(),
            password='testpass123'
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.animal = Animal.objects.create(
            tutor=self.user,
            name=fake.first_name(),
            species=random.choice([s[0] for s in Animal.SPECIES_CHOICES]),
            breed=fake.word(),
            age=random.randint(1, 15),
        )

    def test_list_animals(self):
        url = reverse('animal-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(any(a['id'] == self.animal.id for a in response.data))

    def test_retrieve_animal(self):
        url = reverse('animal-detail', args=[self.animal.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.animal.name)

    def test_create_animal(self):
        url = reverse('animal-list')
        data = {
            'name': fake.first_name(),
            'species': random.choice([s[0] for s in Animal.SPECIES_CHOICES]),
            'breed': fake.word(),
            'age': random.randint(1, 15)
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['tutor'], self.user.id)

    def test_update_animal(self):
        url = reverse('animal-detail', args=[self.animal.id])
        data = {
            'name': fake.first_name(),
            'species': random.choice([s[0] for s in Animal.SPECIES_CHOICES]),
            'breed': fake.word(),
            'age': random.randint(1, 15)
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], data['name'])

    def test_partial_update_animal(self):
        url = reverse('animal-detail', args=[self.animal.id])
        new_age = random.randint(1, 15)
        response = self.client.patch(url, {'age': new_age}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['age'], new_age)

    def test_delete_animal(self):
        url = reverse('animal-detail', args=[self.animal.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Animal.objects.filter(id=self.animal.id).exists())
