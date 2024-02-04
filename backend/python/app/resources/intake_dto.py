class IntakeDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("id")
        self.user_id = kwargs.get("user_id")
        self.intake_status = kwargs.get("intake_status")
        self.referring_worker_name = kwargs.get("referring_worker_name")
        self.referring_worker_contact = kwargs.get("referring_worker_contact")
        self.referral_date = kwargs.get("referral_date")
        self.family_name = kwargs.get("family_name")
        self.cpin_number = kwargs.get("cpin_number")
        self.cpin_file_type = kwargs.get("cpin_file_type")
        self.court_status = kwargs.get("court_status")
        # this is the file 
        self.court_order_file_id = kwargs.get("court_order_file_id")
        # self.court_order_file = kwargs.get("court_order_file")
        # **need to change this to match user id 
        self.first_nation_heritage = kwargs.get("first_nation_heritage")
        self.first_nation_band = kwargs.get("first_nation_band")
        self.transportation_requirements = kwargs.get("transportation_requirements")
        self.scheduling_requirements = kwargs.get("scheduling_requirements")
        self.suggested_start_date = kwargs.get("suggested_start_date")
        self.date_accepted = kwargs.get("date_accepted")
        self.access_location = kwargs.get("access_location")
        self.lead_access_worker_id = kwargs.get("lead_access_worker_id")
        self.denial_reason = kwargs.get("denial_reason")
        self.lead_access_worker_name = kwargs.get("lead_access_worker_name")
        self.intake_meeting_notes = kwargs.get("intake_meeting_notes")


class CreateIntakeDTO(IntakeDTO):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def validate(self):
        error_list = []

        if not self.user_id or not isinstance(self.user_id, int):
            error_list.append("user_id is invalid")
        if not self.referring_worker_name or not isinstance(
            self.referring_worker_name, str
        ):
            error_list.append("referring_worker_name is invalid")
        if not self.referring_worker_contact or not isinstance(
            self.referring_worker_contact, str
        ):
            error_list.append("referring_worker_contact is invalid")
        if not self.referral_date or not isinstance(self.referral_date, str):
            error_list.append("referral_date is invalid")
        if not self.family_name or not isinstance(self.family_name, str):
            error_list.append("family_name is invalid")
        if not self.cpin_number or not isinstance(self.cpin_number, str):
            error_list.append("cpin_number is invalid")
        if not self.cpin_file_type or not isinstance(self.cpin_file_type, str):
            error_list.append("cpin_file_type is invalid")
        if not self.court_status or not isinstance(self.court_status, str):
            error_list.append("court_status is invalid")
        if not self.court_order_file_id or not isinstance(self.court_order_file_id, str):
            error_list.append("court_order_file_id is invalid")
        if not self.transportation_requirements or not isinstance(
            self.transportation_requirements, str
        ):
            error_list.append("transportation_requirements is invalid")
        if not self.scheduling_requirements or not isinstance(
            self.scheduling_requirements, str
        ):
            error_list.append("scheduling_requirements is invalid")
        if not self.suggested_start_date or not isinstance(
            self.suggested_start_date, str
        ):
            error_list.append("suggested_start_date is invalid")

        # optional fields
        if self.intake_status and not isinstance(self.intake_status, str):
            error_list.append("intake_status is invalid")
        if self.first_nation_heritage and not isinstance(
            self.first_nation_heritage, str
        ):
            error_list.append("first_nation_heritage is invalid")
        if self.first_nation_band and not isinstance(self.first_nation_band, str):
            error_list.append("first_nation_band is invalid")
        if self.date_accepted and not isinstance(self.date_accepted, str):
            error_list.append("date_accepted is invalid")
        if self.access_location and not isinstance(self.access_location, str):
            error_list.append("access_location is invalid")
        if self.lead_access_worker_id and not isinstance(
            self.lead_access_worker_id, int
        ):
            error_list.append("lead_access_worker_id is invalid")
        if self.denial_reason and not isinstance(self.denial_reason, str):
            error_list.append("denial_reason is invalid")

        return error_list
