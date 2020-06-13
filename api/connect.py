import psycopg2

try:
    connection = psycopg2.connect(user = "postgres",
                                  password = "uyen",
                                  host = "127.0.0.1",
                                  port = "5432",
                                  database = "World")
    cursor = connection.cursor()
    print ( connection.get_dsn_parameters(),"\n")

    # Print PostgreSQL version
    cursor.execute("SELECT version();")
    record = cursor.fetchone()
    print("You are connected to - ", record,"\n")
except(Exception, psycopg2.Error) as error :
    print ("Error while connecting to PostgreSQL", error)
finally:
    #closing database connection.
        if(connection):
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")

