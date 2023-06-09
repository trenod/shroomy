# Generated by Django 4.1.8 on 2023-04-21 11:42

from django.db import migrations, models
import djongo.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('mushroomIdentifyer', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mushroom',
            name='area',
        ),
        migrations.RemoveField(
            model_name='mushroom',
            name='edible',
        ),
        migrations.RemoveField(
            model_name='mushroom',
            name='image_url',
        ),
        migrations.RemoveField(
            model_name='mushroom',
            name='poisonous',
        ),
        migrations.AddField(
            model_name='mushroom',
            name='comment',
            field=models.TextField(default='No data'),
        ),
        migrations.AddField(
           model_name='mushroom',
            name='id',
            field=models.AutoField(default=0, max_length=24, primary_key=True, serialize=False),
        ),
        migrations.AddField(
            model_name='mushroom',
            name='image_urls',
            field=djongo.models.fields.JSONField(default=list),
        ),
        migrations.AddField(
            model_name='mushroom',
            name='list_mislabel',
            field=djongo.models.fields.JSONField(default=list),
        ),
        migrations.AddField(
            model_name='mushroom',
            name='nsnf_norm',
            field=models.TextField(default='No data'),
        ),
        migrations.AddField(
            model_name='mushroom',
            name='recipe',
            field=models.TextField(default='No data'),
        ),
        migrations.AddField(
            model_name='mushroom',
            name='s_name',
            field=models.CharField(default='No data', max_length=255),
        ),
        migrations.AlterField(
            model_name='mushroom',
            name='description',
            field=models.TextField(default='No data'),
        ),
        migrations.AlterField(
            model_name='mushroom',
            name='name',
            field=models.CharField(default='No data', max_length=255),
        ),
    ]
