from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Mushroom
from .serializers import MushroomSerializer

class MushroomTests(APITestCase):
    def setUp(self):
        self.mushroom1 = Mushroom.objects.create(
            name='Button Mushroom',
            s_name='Agaricus bisporus',
            nsnf_norm='Spiselig',
            comment='This is a comment',
            description='This is a description',
            recipe='This is a recipe',
            image_urls=['https://www.google.com'],
            list_mislabel='This is a list_mislabel'
        )
        self.mushroom2 = Mushroom.objects.create(
            name='Test Mushroom',
            s_name='Testicus bisporus',
            nsnf_norm='Different value',
            comment='This is a comment',
            description='This is a description',
            recipe='This is a recipe',
            image_urls=['https://www.google.com'],
            list_mislabel='This is a list_mislabel'
        )
        self.mushroom3 = Mushroom.objects.create(
            name='Test2 Mushroom',
            s_name='Abisporus',
            nsnf_norm='Giftig',
            comment='This is a comment',
            description='This is a description',
            recipe='This is a recipe',
            image_urls=['https://www.google.com'],
            list_mislabel='This is a list_mislabel'
        )
        
    def test_get_mushrooms(self):
        url = 'localhost:8000/mushrooms/'
        response = self.client.get(url)
        mushrooms = Mushroom.objects.all()
        serializer = MushroomSerializer(mushrooms, many=True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_search_mushrooms(self):
        url = reverse('search_mushrooms')
        response = self.client.get(url, {'name': 'agar'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'Button Mushroom')

    def test_predict_mushroom(self):
        url = reverse('predict_mushroom')
        with open('model/Agaricus_bisporus.jpeg', 'rb') as image:
            response = self.client.post(url, data=image, content_type='image/jpeg')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 5)
        self.assertEqual(response.data[0]['name'], 'Agaricus bisporus')
