import pytest
from flask import current_app

from app.models.address import Address
from app.resources.address_dto import AddressDTO, CreateAddressDTO
from app.services.implementations.address_service import AddressService


@pytest.fixture
def address_service():
    address = AddressService(current_app.logger)
    yield address
    Address.query.delete()


class TestCreateAddressSuccess:
    def test_normal(self, address_service):
        param = CreateAddressDTO(
            street_address="333 Lester",
            city="Waterloo",
            postal_code="N2L 3W6",
            latitude=8.38,
            longitude=9.89,
        )
        address_instance = address_service.create_address(param)
        assert type(address_instance) is AddressDTO

    def test_boundary(self, address_service):
        param = CreateAddressDTO(
            street_address="333 Lester",
            city="Waterloo",
            postal_code="N2L 3W6",
            latitude=89.38,
            longitude=99.89,
        )  # boundary case with latitude and longitude's defined scope and precision
        address_instance = address_service.create_address(param)
        assert type(address_instance) is AddressDTO

    def test_precision(self, address_service):
        param = CreateAddressDTO(
            street_address="333 Lester",
            city="Waterloo",
            postal_code="N2L 3W6",
            latitude=8.380900,
            longitude=9.899900,
        )  # boundary case with latitude's and longitude's precision
        address_instance = address_service.create_address(param)
        assert type(address_instance) is AddressDTO

    def test_nullable_true(self, address_service):
        param = CreateAddressDTO(
            street_address="333 Lester",
            city="Waterloo",
            postal_code="N2L 3W6",
        )  # case without latitude and longitude
        address_instance = address_service.create_address(param)
        assert type(address_instance) is AddressDTO

    def test_validate_fields(self, address_service):
        param = CreateAddressDTO(
            street_address="333 Lester",
            city="Kitchener",
            postal_code="N2L 3W6",
            latitude=5.38,
            longitude=4.89,
        )
        address_instance = address_service.create_address(param)
        assert type(address_instance) is AddressDTO
        assert address_instance.street_address == param.street_address
        assert address_instance.city == param.city
        assert address_instance.postal_code == param.postal_code
        assert float(address_instance.latitude) == param.latitude
        assert float(address_instance.longitude) == param.longitude


class TestCreateAddressInvalidFails:
    def test_missing_field(self, address_service):
        param = CreateAddressDTO(
            street_address="333 Lester",
            city="Waterloo",
            latitude=8.3879056123,
            longitude=9.8909087345,
        )
        with pytest.raises(Exception):
            address_service.create_address(param)

    def test_out_of_bounds(self, address_service):
        param = CreateAddressDTO(
            street_address="333 Lester",
            city="Waterloo",
            postal_code="N2L 3W6",
            latitude=890780190.387,
            longitude=999992190.890,
        )
        with pytest.raises(Exception):
            address_service.create_address(param)

    def test_precision_out_of_scope(self, address_service):
        param = CreateAddressDTO(
            street_address="333 Lester",
            city="Waterloo",
            postal_code=123,
            latitude=890.387,
            longitude=991.890,
        )  # precision is out of scope ( > 10^2 ) for latitude and longitude
        with pytest.raises(Exception):
            address_service.create_address(param)

    def test_empty_input_string(self):
        param = CreateAddressDTO(
            street_address="333 Lester",
            city="",
            postal_code="N2L 3W6",
            latitude=8.380900,
            longitude=9.899900,
        )
        with pytest.raises(Exception):
            address_service.create_address(param)

    def test_empty_param(self):
        with pytest.raises(Exception):
            address_service.create_address(None)
