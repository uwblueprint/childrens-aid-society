class AddressDTO:
    def __init__(self, city, id, latitude, longitude, postal_code, street_address):
        self.id = id
        self.city = city
        self.street_address = street_address
        self.postal_code = postal_code
        self.latitude = latitude
        self.longitude = longitude


class CreateAddressDTO:
    def __init__(self, **kwargs):
        self.street_address = kwargs.get("street_address")
        self.city = kwargs.get("city")
        self.postal_code = kwargs.get("postal_code")
        self.latitude = kwargs.get("latitude", 0.0)
        self.longitude = kwargs.get("longitude", 0.0)

    def validate(self):
        error_list = []
        if type(self.street_address) is not str:
            error_list.append("The street_address value supplied is not a string.")
        if type(self.street_address) is str and self.street_address == "":
            error_list.append("The street_address value supplied is empty.")
        if type(self.city) is not str:
            error_list.append("The city value supplied is not a string.")
        if type(self.city) is str and self.city == "":
            error_list.append("The city value supplied is empty.")
        if type(self.postal_code) is not str:
            error_list.append("The postal_code value supplied is not a string.")
        if type(self.postal_code) is str and self.postal_code == "":
            error_list.append("The postal_code value supplied is empty.")
        if type(self.latitude) is not float:
            error_list.append("The latitude value supplied is not a float.")
        if type(self.longitude) is not float:
            error_list.append("The longitude value supplied is not a float.")
        return error_list
