class IntakeDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("id")
        self.referring_worker_id = kwargs.get("referring_worker_id")
        self.lead_access_worker_id = kwargs.get("lead_access_worker_id")
        self.referral_date = kwargs.get("referral_date")
        self.family_name = kwargs.get("family_name")
        self.cpin_number = kwargs.get("cpin_number")
        self.is_investigation = kwargs.get("is_investigation")
        self.is_court_involved = kwargs.get("is_court_involved")
        self.court_status = kwargs.get("court_status")
        self.court_order = kwargs.get("court_order")
        self.court_order_file = kwargs.get("court_order_file")
        self.is_first_nation_heritage = kwargs.get("is_first_nation_heritage")
        self.first_nation_heritage = kwargs.get("first_nation_heritage")
        self.first_nation_band = kwargs.get("first_nation_band")
        self.family_strengths = kwargs.get("family_strengths")
        self.access_type = kwargs.get("access_type")
        self.transportation = kwargs.get("transportation")
        self.limitations = kwargs.get("limitations")
        self.case_date = kwargs.get("case_date")
        self.is_accepted = kwargs.get("is_accepted")
        self.date_accepted = kwargs.get("date_accepted")
        self.access_start_date = kwargs.get("access_start_date")
        self.access_weekday = kwargs.get("access_weekday")
        self.access_location_id = kwargs.get("access_location_id")
        self.access_time = kwargs.get("access_time")
        self.lead_access_worker_id = kwargs.get("lead_access_worker_id")
        self.denial_reason = kwargs.get("denial_reason")

    def validate(self):
        error_list = []
        return error_list
