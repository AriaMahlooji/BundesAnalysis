from pymongo import MongoClient
import import_images_utilities as utilities


def run():
    client = MongoClient("mongodb", 27017) 
    db = client['Images']

    db_path = "./files/bundes-data/MongoDB/teams_players_images"

    collection = db['players']
    player_images = utilities.read_player_images(f"{db_path}/Players_Images")
    utilities.import_images(player_images, collection)
    print("\033[92mplayers images imported\033[0m")

    client = MongoClient("mongodb", 27017) 
    db = client['Images']
    collection = db['teams']
    team_images = utilities.get_images(f'{db_path}/Teams_Images')
    utilities.import_images(team_images, collection)
    print("\033[92mTeams logos imported\033[0m")



