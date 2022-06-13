import pytest
from flask import current_app
from app.resources.address_dto import CreateAddressDTO, AddressDTO
from app.services.implementations.address_service import AddressService


def test_create_address_success():
	valid_cases = [
				# normal case
                CreateAddressDTO(street_address="333 Lester",
										city="Waterloo",
										postal_code="N2L 3W6",
										latitude=8.38,
										longitude=9.89),
				# boundary case with latitude and longitude's defined scope and precision
				CreateAddressDTO(street_address="333 Lester",
									city="Waterloo",
									postal_code="N2L 3W6",
									latitude=89.38,
									longitude=99.89),
				# boundary case with latitude's and longitude's precision
				CreateAddressDTO(street_address="333 Lester",
									city="Waterloo",
									postal_code="N2L 3W6",
									latitude=8.380900,
									longitude=9.899900),
				# boundary case with city being assigned an empty string
				CreateAddressDTO(street_address="333 Lester",
									city="",
									postal_code="N2L 3W6",
									latitude=8.380900,
									longitude=9.899900)]
	test_address_service = AddressService(current_app.logger)
	for valid in valid_cases:
		address_instance = test_address_service.create_address(valid)
		assert type(address_instance) is AddressDTO


def test_create_address_invalid_field_fails():

	invalid_cases = [
		# missing field
		CreateAddressDTO(street_address="333 Lester", city="Waterloo", latitude=8.3879056123, longitude=9.8909087345),
		# precision is out of bounds for latitude and longitude
		CreateAddressDTO(street_address="333 Lester", city="Waterloo", postal_code="N2L 3W6", latitude=890780190.387,
						 longitude=999992190.890),
		# precision is out of scope ( > 10^2 ) for latitude and longitude
		CreateAddressDTO(street_address="333 Lester", city="Waterloo", postal_code=123, latitude=890.387,
						 longitude=991.890)
	]
	test_address_service = AddressService(current_app.logger)
	for invalid in invalid_cases:
		with pytest.raises(Exception):
			test_address_service.create_address(invalid)
