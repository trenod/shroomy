from djongo import models
from bson.objectid import ObjectId

class Mushroom(models.Model):
    id = models.AutoField(primary_key=True, default=ObjectId)
    name = models.CharField(max_length=255, default="No data")
    s_name = models.CharField(max_length=255, default="No data")
    nsnf_norm = models.TextField(default="No data")
    comment = models.TextField(default="No data")
    description = models.TextField(default="No data")
    recipe = models.TextField(default="No data")
    image_urls = models.JSONField(default=list)
    list_mislabel = models.JSONField(default=list)
