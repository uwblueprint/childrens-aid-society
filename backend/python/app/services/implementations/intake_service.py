from ...models import db
from ...models.intake import Intake
from ...resources.intake_dto import CreateIntakeDTO, IntakeDTO
from ..interfaces.intake_service import IIntakeService


class IntakeService(IIntakeService):
    def __init__(self, logger):
        self.logger = logger

    def create_intake(self, intake):
        try:
            if not intake:
                raise Exception(
                    "Empty intake DTO/None passed to create_intake function"
                )
            if not isinstance(intake, CreateIntakeDTO):
                raise Exception("Intake passed is not of CreateIntakeDTO type")
            error_list = intake.validate()
            if error_list:
                raise Exception(error_list)

            new_intake_entry = Intake(**intake.__dict__)
            db.session.add(new_intake_entry)
            db.session.commit()

            return IntakeDTO(
                id=new_intake_entry.id,
                user_id=new_intake_entry.user_id,
                intake_status=new_intake_entry.intake_status,
                referring_worker_name=new_intake_entry.referring_worker_name,
                referring_worker_contact=new_intake_entry.referring_worker_contact,
                referral_date=new_intake_entry.referral_date,
                family_name=new_intake_entry.family_name,
                cpin_number=new_intake_entry.cpin_number,
                cpin_file_type=new_intake_entry.cpin_file_type,
                court_status=new_intake_entry.court_status,
                court_order_file=new_intake_entry.court_order_file,
                first_nation_heritage=new_intake_entry.first_nation_heritage,
                first_nation_band=new_intake_entry.first_nation_band,
                transportation_requirements=new_intake_entry.transportation_requirements,
                scheduling_requirements=new_intake_entry.scheduling_requirements,
                suggested_start_date=new_intake_entry.suggested_start_date,
                date_accepted=new_intake_entry.date_accepted,
                access_weekday=new_intake_entry.access_weekday,
                access_location=new_intake_entry.access_location,
                access_time=new_intake_entry.access_time,
                lead_access_worker_id=new_intake_entry.lead_access_worker_id,
                denial_reason=new_intake_entry.denial_reason,
            )
        except Exception as error:
            db.session.rollback()
            raise error
