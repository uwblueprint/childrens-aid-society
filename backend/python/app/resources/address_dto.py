class AddressDTO:
    def __init__(self, id, street_address, city, postal_code, latitude, longitude):
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
        self.latitude = kwargs.get("latitude")
        self.longitude = kwargs.get("longitude")

    def validate(self):
        error_list = []
        if type(self.street_address) is not str:
            error_list.append("The street_address supplied is not a string.")
        if type(self.city) is not str:
            error_list.append("The city supplied is not a string.")
        if type(self.postal_code) is not str:
            error_list.append("The postal_code supplied is not a string.")
        if type(self.latitude) is not float:
            error_list.append("The latitude supplied is not a float.")
        if type(self.longitude) is not float:
            error_list.append("The longitude supplied is not a float.")
        return error_list
