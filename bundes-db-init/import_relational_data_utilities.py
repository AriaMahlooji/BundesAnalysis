import mysql.connector
import os
import pandas as pd
import pickle

db_path = "./files/bundes-data/MySqlDB"
def create_thesis_db():
    cnx = mysql.connector.connect(user= 'root', password= 'password', \
                                  auth_plugin="mysql_native_password", host= 'mysqldb')
    cursor = cnx.cursor()
    database_name = 'Thesis'  # Replace with your desired database name
    create_database_query = f"CREATE DATABASE IF NOT EXISTS {database_name}"
    cursor.execute(create_database_query)
    cnx.commit()

def drop_all_tables(cnx):
    cursor = cnx.cursor()
    tables = cursor.fetchall()
    print(tables)
    # Drop each table
    for table in tables:
        table_name = table[0]
        drop_table_query = f"DROP TABLE IF EXISTS {table_name}"
        cursor.execute(drop_table_query)
    cnx.commit()
    
def create_matches_table(cnx):
    table_name = 'matches'

    # Define the table schema
    create_table_query = f"""
    CREATE TABLE IF NOT EXISTS {table_name} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        season VARCHAR(255),
        date VARCHAR(255),
        match_number VARCHAR(255),
        home_team_id INT,
        away_team_id INT,
        home_team_score VARCHAR(255),
        away_team_score VARCHAR(255)
    )
    """
    cursor = cnx.cursor()
    cursor.execute(create_table_query)

def create_events_table(cnx):
    table_name = 'events'

    # Define the table schema
    create_table_query = f"""
    CREATE TABLE IF NOT EXISTS {table_name} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        match_id INT,
        season VARCHAR(255),
        round_number VARCHAR(255),
        match_number VARCHAR(255),
        team_id INT,
        title VARCHAR(255),
        event_detail VARCHAR(255),
        typ VARCHAR(255)
    )
    """
    cursor = cnx.cursor()
    cursor.execute(create_table_query)
    
def create_players_table(cnx):
    table_name = 'players'
    
    #define table schema
    create_table_query = f"""
    CREATE TABLE IF NOT EXISTS {table_name} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255)
    )
    """
    cursor = cnx.cursor()
    cursor.execute(create_table_query) 
    
def create_teams_table(cnx):
    table_name = 'teams'
    
    #define table schema
    create_table_query = f"""
    CREATE TABLE IF NOT EXISTS {table_name} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255)
    )
    """
    cursor = cnx.cursor()
    cursor.execute(create_table_query) 

def create_plays_in_table(cnx):
    table_name = 'plays_in'
    
    #define table schema
    create_table_query = f"""
    CREATE TABLE IF NOT EXISTS {table_name} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        player_id INT,
        team_id INT,
        season VARCHAR(255),
        role VARCHAR(255)
    )
    """
    cursor = cnx.cursor()
    cursor.execute(create_table_query) 
    
def insert_data(table_name, data, cnx, column_name=None):
    if type(data)==list:
        for item in data:
            if table_name =="teams" or table_name=="players":
                item = item.replace("'", "-")
            column = column_name
            values = '%s'
            insert_query = f"INSERT INTO {table_name} ({column}) VALUES ({values})"
            cursor = cnx.cursor()
            cursor.execute(insert_query, [item])
            cnx.commit()
        
    else:
        for obj in data:
            columns = ', '.join(obj.keys())
            values = ', '.join(["%s"] * len(obj))
            data_values = tuple(obj.values())
            insert_query = f"INSERT INTO {table_name} ({columns}) VALUES ({values})"
            cursor = cnx.cursor()
            cursor.execute(insert_query, data_values)
            cnx.commit()

#connecting to mysql
def connect_to_mysql():
    host = 'mysql' 
    username = 'root'
    password = 'password'
    port="3306"
    cnx = mysql.connector.connect(host= host, port=port,\
                                  user= username, database='Thesis', \
                                  password= password)

    return cnx

def get_team_id(team_name, cnx):
    get_team_id_query = f"SELECT id FROM teams WHERE name = '{team_name}'"
    cursor = cnx.cursor()
    cursor.execute(get_team_id_query)
    # Fetch the result
    result = cursor.fetchone()
    if result:
        return result[0]    
    else:
        return -1
    
def get_player_id(player_name, cnx):
    get_player_id_query = f"SELECT id FROM players WHERE name = '{player_name}'"
    cursor = cnx.cursor()
    cursor.execute(get_player_id_query)
    # Fetch the result
    result = cursor.fetchone()
    if result:
        return result[0]    
    else:
        return -1

def get_match_id(season, match_number, cnx):
    find_id_query = f"SELECT id FROM matches WHERE season = '{season}' AND match_number = '{match_number}'"
    cursor = cnx.cursor()
    cursor.execute(find_id_query)
    result = cursor.fetchone()
    if result:
        return result[0]
    else:
        return -1
    
def get_plays_in_records(directory, cnx):
    plays_in_s =[]
    for season in get_subfolders(directory):
        for teams_players in get_files(season):
            if str(teams_players).endswith('.csv'):
                season=str(teams_players).split('/')[-2]
                team=str(teams_players).split('/')[-1].split('.csv')[0].replace("'","-")
                df = pd.read_csv(teams_players)
                res = df.to_dict().values().mapping
                players = res['Player']
                roles = res['role']
                
                for i in range(len(players)):
                    plays_in_s.append({
                     'player_id' : get_player_id(players[i],cnx), 
                     'season' : season,
                     'team_id': get_team_id(team,cnx),
                     'role': roles[i]
                    })
    return plays_in_s
    
def get_files(directory):
    file_list = []
    for root, directories, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            file_list.append(file_path)
    return file_list

def get_subfolders(directory):
    subfolders = []
    for item in os.listdir(directory):
        item_path = os.path.join(directory, item)
        if os.path.isdir(item_path):
            subfolders.append(item_path)
    return subfolders   

def insert_data_of_type_dict(data, table_name, cnx):
    for item in data:
        columns = ', '.join(item.keys())
        values = ', '.join(["%s"] * len(item))
        data_values = tuple(item.values())
        insert_query = f"INSERT INTO {table_name} ({columns}) VALUES ({values})"
        cursor = cnx.cursor()
        cursor.execute(insert_query, data_values)
        cnx.commit()

def replace_team_names_with_ids(all_matches_results, cnx):
    return [{'season': match_result['season'],
      'date': match_result['date'],
      'match_number': match_result['match_number'],
      'home_team_id': get_team_id(match_result['home_team'].replace("'","-"), cnx),
      'away_team_id': get_team_id(match_result['away_team'].replace("'","-"), cnx),
      'home_team_score': match_result['home_team_score'],
      'away_team_score': match_result['away_team_score']} for match_result in all_matches_results]

def replace_events_numbers_with_ids(events, cnx):
    return [{'season': event['season'],
 'match_id': get_match_id(event['season'], event['match_number'],cnx),
 'round_number': event['round_number'],
 'match_number': event['match_number'],
 'team_id': get_team_id(event['team'].replace("'","-"),cnx),
 'title': event['title'],
 'event_detail': event['event_detail'],
 'typ': event['typ']} for event in events]

def initialize_feed_teams(cnx):
    create_teams_table(cnx)
    with open(f'{db_path}/Variables/teams.pkl', 'rb') as file:
        teams = list(pickle.load(file))
    insert_data(table_name='teams', data=teams, cnx=cnx, column_name='name')
    
def initialize_feed_players(cnx):
    create_players_table(cnx)
    with open(f'{db_path}/Variables/all_players.pkl', 'rb') as file:
        all_players = list(pickle.load(file))
    insert_data(table_name='players', data=all_players, cnx=cnx, column_name='name')

def initialize_feed_matches(cnx):
    create_matches_table(cnx)
    with open(f'{db_path}/Variables/all_matches_results.pkl', 'rb') as file:
        all_matches_results = list(pickle.load(file))
        all_matches_results = replace_team_names_with_ids(all_matches_results, cnx)
    insert_data_of_type_dict(data=all_matches_results, table_name="matches", cnx= cnx)

def initialize_feed_plays_in(cnx):
    create_plays_in_table(cnx)
    players_teams =get_plays_in_records(f"{db_path}/Players", cnx)
    insert_data_of_type_dict(data=players_teams, table_name='plays_in', cnx= cnx)

def initialize_feed_events(cnx):
    create_events_table(cnx)
    with open(f'{db_path}/Variables/all_events.pkl', 'rb') as file:
        all_events = list(pickle.load(file))
        normalized_events = replace_events_numbers_with_ids(events=all_events, cnx=cnx)
    insert_data_of_type_dict(data=normalized_events, table_name='events',cnx = cnx)