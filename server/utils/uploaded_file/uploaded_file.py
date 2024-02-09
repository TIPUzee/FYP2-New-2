import os
from datetime import datetime
import uuid

from werkzeug.datastructures import FileStorage

from ..request.response import Response as Res


class UploadedFile(FileStorage):
    def __init__(self, file_storage: FileStorage, *args, **kwargs):
        super().__init__(
            stream=file_storage.stream,
            filename=file_storage.filename,
            name=file_storage.name,
            content_type=file_storage.content_type,
            content_length=file_storage.content_length,
            headers=file_storage.headers,
        )
        _, extension = os.path.splitext(file_storage.filename)
        self.uuid = uuid.uuid4().hex
        timestamp = datetime.now().strftime('%Y-%m-%d-%H-%M-%S')
        self.uu_filename = f'{timestamp}_{self.uuid}{extension}'

    def save(self):
        super().save(os.path.join('uploads', self.uu_filename))


class UploadedFiles(list):
    def __init__(self, file_storages: list[FileStorage], *args, **kwargs):
        super().__init__(*args, **kwargs)
        for file_storage in file_storages:
            self.append(UploadedFile(file_storage))

    def save_all(self):
        [i.save() for i in self]

    def max_files(self, max_files: int):
        if len(self) > max_files:
            return Res.frontend_error(f'Maximum {max_files} file(s) are allowed',
                                      f'You have uploaded {len(self)} file(s)')
        return self

    def min_files(self, min_files: int):
        if len(self) < min_files:
            return Res.frontend_error(f'Minimum {min_files} file(s) are allowed',
                                      f'You have uploaded {len(self)} file(s)')
        return self

    def __getitem__(self, item):
        return super().__getitem__(item)

    def __setitem__(self, key, value):
        super().__setitem__(key, value)

    def __delitem__(self, key):
        super().__delitem__(key)

    def __iter__(self):
        return super().__iter__()

    def __reversed__(self):
        return super().__reversed__()

    def __contains__(self, item):
        return super().__contains__(item)

    def __add__(self, other):
        return super().__add__(other)
