import json
from urllib.parse import urlencode
from django.test import TestCase, Client
from mongomock import MongoClient

from mushroomIdentifyer.models import Mushroom

class MushroomSearchTest(TestCase):
    
    @classmethod
    def setUpClass(cls):
        """Setup MongoDB test database and create some Mushroom objects"""
        cls.client = MongoClient()
        cls.db = cls.client.test_db
        cls.mushroom_collection = cls.db.mushrooms
        # Add some sample Mushroom objects to the test database
        mushrooms = [
            {
                "name": "Chanterelle",
                "s_name": "Cantharellus cibarius",
                "nsnf_norm": "Edible",
                "comment": "",
                "description": "",
                "recipe": "[]",
                "image_urls": "[]",
                "list_mislabel": "[]"
            },
            {
                "name": "Porcini",
                "s_name": "Boletus edulis",
                "nsnf_norm": "Edible",
                "comment": "",
                "description": "",
                "recipe": "[]",
                "image_urls": "[]",
                "list_mislabel": "[]"
            },
            {
                "name": "Fly agaric",
                "s_name": "Amanita muscaria",
                "nsnf_norm": "Poisonous",
                "comment": "",
                "description": "",
                "recipe": "[]",
                "image_urls": "[]",
                "list_mislabel": "[]"
            }
        ]
        cls.mushroom_collection.insert_many(mushrooms)
        
    @classmethod
    def tearDownClass(cls):
        """Drop the test database after all tests have finished"""
        cls.client.drop_database('test_db')
        
    def test_mushroom_search_success(self):
        """Test searching for a mushroom by name"""
        # Create a test Mushroom object to search for
        test_mushroom = Mushroom.objects.create(
            name="Traktkantarell",
            s_name="Craterellus tubaeformis",
            nsnf_norm="Edible",
            comment="",
            description="",
            recipe="[]",
            image_urls="[]",
            list_mislabel="[]",
        )
        # Perform a GET request to the search endpoint with the name of the test Mushroom object
        response = self.client.get('/mushrooms/search/?{}'.format(urlencode({'name': test_mushroom.name})))
        self.assertEqual(response.status_code, 200)
        # Deserialize the response JSON into a Python object
        response_data = json.loads(response.content)
        # Check that the response contains the expected Mushroom object
        self.assertEqual(len(response_data), 1)
        self.assertEqual(response_data[0]['name'], test_mushroom.name)
        self.assertEqual(response_data[0]['s_name'], test_mushroom.s_name)
        self.assertEqual(response_data[0]['nsnf_norm'], test_mushroom.nsnf_norm)
        self.assertEqual(response_data[0]['comment'], test_mushroom.comment)
        self.assertEqual(response_data[0]['description'], test_mushroom.description)
        self.assertEqual(response_data[0]['recipe'], test_mushroom.recipe)
        self.assertEqual(response_data[0]['image_urls'], test_mushroom.image_urls)
        self.assertEqual(response_data[0]['list_mislabel'], test_mushroom.list_mislabel)
    
    def test_mushroom_search_not_found(self):
        """Test searching for a mushroom that does not exist"""
        # Perform a GET request to the search endpoint with a name that does not exist
        response = self.client.get('/mushrooms/search/?{}'.format(urlencode({'name': 'Nonexistent Mushroom'})))
        self.assertEqual(response.status_code, 200)
        # Deserialize the response JSON into a Python object
        response_data = json.loads(response.content)
        # Check that the response is empty
        self.assertEqual(len(response_data), 0)
