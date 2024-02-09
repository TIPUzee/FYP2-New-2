import os

from flask import send_file

from ..request.response import Response as Res


class SavedFile:
    def __init__(self, file_name):
        self.file_name = file_name

    def exists(self):
        return os.path.exists(os.path.join('uploads', self.file_name))

    def return_file(self, as_attachment: bool = False):
        if not self.exists():
            raise Res.server_error(f'File {self.file_name} does not exist')
        raise Res.send_file(send_file(os.path.join('uploads', self.file_name), as_attachment=as_attachment),
                            Res.HTTPCode.OK)
