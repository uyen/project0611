from flask import Blueprint
from city import *
from country import *
from flask import request


account_api = Blueprint('account_api', __name__)


@account_api.route("/continent", methods=["GET"])
def get_continents():
    return getallcontinent()


@account_api.route("/country", methods=["GET"])
def getcountry():
    return getallcountries('')


@account_api.route("/region/<cont_id>", methods=["GET"])
def get_region_byid(cont_id):
    return getallregion(cont_id)

@account_api.route("/country/<region_id>", methods=["GET"])
def get_countries_byid(region_id):
    return getallcountries(region_id)


@account_api.route("/countrylanguage/<countrycode_id>", methods=["GET"])
def get_countrylanguage_byid(countrycode_id):
    return getallcountrylanguage(countrycode_id)


@account_api.route("/city", methods=["GET"])
def get_cities():
    return getallcity('')


@account_api.route("/city/<countrycode_id>", methods=["GET"])
def get_cities_byid(countrycode_id):
    return getallcity(countrycode_id)


#   Should be POST only
@account_api.route("/city/new", methods=["POST", "GET"])
def insert_new_city():
    #   for testing in dev purpose
    if request.method == "GET":
        return insertnewcity(request.args)
    elif request.method == "POST":
        return insertnewcity(request.json)

    return json.dumps({}, cls=CustomJsonEncoder)


#   Should be POST or DELETE
@account_api.route("/city/remove", methods=["POST", "GET", "DELETE"])
def remove_city():
    #   for testing in dev purpose
    if request.method == "GET":
        return removecity(request.args)
    elif request.method == "POST":
        return removecity(request.json)
    elif request.method == "DELETE":
        return removecity(request.args)

    return json.dumps({}, cls=CustomJsonEncoder)


#   Should be POST only
@account_api.route("/city/update", methods=["POST", "GET"])
def update_city():
    data = request.args
    #return json.dumps(request.args, cls=CustomJsonEncoder)
    return updatecity(request.args)

