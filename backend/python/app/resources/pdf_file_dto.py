class PdfFileDTO:
    def __init__(self, **kwargs):
        self.id = kwargs.get("id")
        self.file_name = kwargs.get("file_name")
        self.file_data = kwargs.get("file_data")

class CreatePdfFileDTO(PdfFileDTO):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def validate(self):
        error_list = []

        if not self.file_name or not isinstance(self.file_name, str):
            error_list.append("file_name is invalid")
        if not self.file_data or not isinstance(self.file_data, str):
            error_list.append("file_name is invalid")
            
        return error_list
