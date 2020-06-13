import psycopg2
import json
from decimal import Decimal
from configdb import *
from psycopg2.extras import RealDictCursor

def getallcountrylanguage(countrycode_id):
    conn = None
    try:
        params = configdb()
        conn = psycopg2.connect(**params)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        sql = 'select * from countrylanguage order by language asc limit 10'
        if countrycode_id != '':
            sql = 'select * from countrylanguage where countrycode=\'' + countrycode_id + '\''
            print(sql)
        cur.execute(sql)
        return json.dumps(cur.fetchall(), cls=CustomJsonEncoder)
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

def getallregion(cont_id):
    conn = None
    try:
        params = configdb()
        conn = psycopg2.connect(**params)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        sql = 'select * from country order by name asc limit 10'
        if cont_id != '':
            sql = 'select region, count(code) , continent from country where continent=\'' + cont_id + '\' group by region,continent order by region asc'
            print(sql)
        cur.execute(sql)
        return json.dumps(cur.fetchall(), cls=CustomJsonEncoder)
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

def getallcountries(region_id):
    conn = None
    try:
        params = configdb()
        conn = psycopg2.connect(**params)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        sql = 'select * from country order by name asc limit 10'
        if region_id != '':
            sql = 'select * from country where region=\'' + region_id + '\' order by name asc'
            print(sql)
        cur.execute(sql)
        return json.dumps(cur.fetchall(), cls=CustomJsonEncoder)
        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


def getallcontinent():
    conn = None
    try:
        params = configdb()
        conn = psycopg2.connect(**params)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("select continent , count(code) from country group by continent order by continent asc ")
        return json.dumps(cur.fetchall(), indent=2)

        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


if __name__ == '__main__':
    res = getallcontinent()
    print(res)