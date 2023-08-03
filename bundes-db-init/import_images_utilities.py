from PIL import Image
import io
import sys
import os
import pickle



def get_subfolders(directory):
    subfolders = []
    for item in os.listdir(directory):
        item_path = os.path.join(directory, item)
        if os.path.isdir(item_path):
            subfolders.append(item_path)
    return subfolders

def get_images(directory):
    images = []
    valid_extensions = ['.jpg', '.jpeg', '.png', '.gif']  # Add more extensions if needed

    for filename in os.listdir(directory):
        file_path = os.path.join(directory, filename)
        if os.path.isfile(file_path) and any(filename.lower().endswith(ext) for ext in valid_extensions):
            images.append(file_path)

    return images

def read_player_images(main_dir):
    images=[]
    for season in get_subfolders(main_dir):
        for team in get_subfolders(season):
            images.append(get_images(team))

    images = [item for sublist in images for item in sublist]
    return images


def create_image_doc(image_directory, name):
    image_path = image_directory
    image = Image.open(image_path)

    # Convert the image to binary data
    image_bytes = io.BytesIO()
    image.save(image_bytes, format='png')
    image_data = image_bytes.getvalue()
    image_document = {'name': name,'image': image_data}
    return image_document

def import_images(images, collection):
    names=[]
    for image in images:
        name = image.split('/')[-1].split('.png')[0]

        if not name in names:
            names.append(name)
            img_doc = create_image_doc(image, name)
            collection.insert_one(img_doc)

