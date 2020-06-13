import psycopg2
import json
from configdb import *
from psycopg2.extras import RealDictCursor

def insertnewcity(reqdata):
    if (reqdata.get("countrycode") != ''
        and reqdata.get("district") != ''
        and reqdata.get("name") != ''
        and reqdata.get("population") != '' ):
        conn = None
        try:
            params = configdb()
            conn = psycopg2.connect(**params)
            cur = conn.cursor(cursor_factory=RealDictCursor)
            sql ="select max(id)+1 as newid from city"
            cur.execute(sql)
            row = cur.fetchone()
            newid = row["newid"]
            if(newid > 0 ):
                sql2 = "insert into city (id, name, countrycode,district, population) values ( %s, %s, %s, %s, %s)"

                print([newid, reqdata.get("name"), reqdata.get("countrycode"), reqdata.get("district"),
                       reqdata.get("population"), ])
                print(json.dumps(reqdata, cls=CustomJsonEncoder))



                cur.execute(sql2 , [newid, reqdata.get("name"), reqdata.get("countrycode") , reqdata.get("district") , reqdata.get("population"), ])
                print([newid, reqdata.get("name"), reqdata.get("countrycode") , reqdata.get("district") , reqdata.get("population"), ])
                conn.commit()

            cur.close()
            return {"data": "success", "params": reqdata, "city_id": newid }

        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()

    return {"data": "success insert", "city_id": 12345, "info": reqdata}


def removecity(reqdata):
    if reqdata.get("city_id") != '' and int(reqdata.get("city_id")) >0 :
        conn = None
        try:
            params = configdb()
            conn = psycopg2.connect(**params)
            cur = conn.cursor(cursor_factory=RealDictCursor)
            sql = "delete from city where id= %s "
            cur.execute(sql , (int(reqdata.get("city_id")),))
            conn.commit()

            print(sql)
            count = cur.rowcount
            print(count, "Record deleted successfully ")

            cur.close()
            return {"data": "success remove", "params": reqdata, "city_id": reqdata.get("city_id")}

        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        finally:
            if conn is not None:
                conn.close()

    else:
        return {"data": "can not remove", "params": reqdata, "city_id": reqdata.get("city_id")}


def updatecity(reqdata):
    return {"data": "success update", "params": reqdata , "city_id" : reqdata.get("city_id")}


def getallcity(countrycode_id):
    conn = None
    try:
        params = configdb()
        conn = psycopg2.connect(**params)
        cur = conn.cursor(cursor_factory=RealDictCursor)
        sql = "select * from city order by name asc limit 10"
        if countrycode_id != '':
            sql = 'select * from city where countrycode=\'' + countrycode_id + '\' order by name asc'
            print(sql)
        cur.execute(sql)
        return json.dumps(cur.fetchall(), cls=CustomJsonEncoder)
#        row = cur.fetchone()
#         while row is not None:
#             print(row)
#             row = cur.fetchone()

        cur.close()
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()


if __name__ == '__main__':
    res = getallcity('')
    print(res)