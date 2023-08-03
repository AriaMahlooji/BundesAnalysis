import import_relational_data_utilities as utilities
import time
def run():
    
    cnx = utilities.connect_to_mysql()
    utilities.initialize_feed_teams(cnx)
    print("\033[92mTeams table is initialized\033[0m")

    utilities.initialize_feed_players(cnx)
    print("\033[92mPlayers table is initialized\033[0m")

    utilities.initialize_feed_matches(cnx)
    print("\033[92mMatches table is initialized\033[0m")

    utilities.initialize_feed_plays_in(cnx)
    print("\033[92mPlays_in table is initialized\033[0m")


    utilities.initialize_feed_events(cnx)
    print("\033[92mEvents table is initialized\033[0m")
