from django.urls import reverse
from rest_framework.test import APITestCase

class MushroomSearchTestCase(APITestCase):
    def setUp(self):
        self.mushroom = {
            "id": "",
            "name": "Traktkantarell",
            "s_name": "Craterellus tubaeformis",
            "nsnf_norm": "Spiselig",
            "comment": "",
            "description": "Traktkantarell (Craterellus tubaeformis) er en av våre vanligste, mest populære og beste matsopper. Traktkantarellen ble tidligere regnet som medlem av slekten kantareller, men nye analysemetoder har avdekket at den tilhører trompetsoppene. Cantharellus tubaeformis og Cantharellus infundibuliformis er synonymer til det gjeldende vitenskapelige navnet.",
            "recipe": "[]",
            "image_urls": "['https://www.wildfooduk.com/wp-content/uploads/2018/01/Winter-C-1.jpg', 'https://healing-mushrooms.net/wp-content/uploads/2019/11/Craterellus-tubaeformis.jpg', 'https://upload.wikimedia.org/wikipedia/commons/0/08/Craterellus_tubaeformis_LC0374.jpg']",
            "list_mislabel": "['']"
        }
        self.url = reverse('search_mushrooms')

    def test_search_by_name(self):
        response = self.client.get('/mushrooms/search/?name=traktkantarell')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], self.mushroom['id'])

    def test_search_by_s_name(self):
        response = self.client.get('/mushrooms/search/?name=Craterellus tubaeformis')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['id'], self.mushroom['id'])

    def test_predict_mushroom(self):
        with open('app/backend/model/traktkantarell.jpeg', 'rb') as f:
            response = self.client.post(reverse('/mushrooms/predict/'), {'image': f}, format='b')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 5)
        for mushroom in response.data:
            self.assertIn('id', mushroom)
            self.assertIn('name', mushroom)
            self.assertIn('probability', mushroom)


