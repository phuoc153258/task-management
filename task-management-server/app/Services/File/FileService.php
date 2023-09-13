<?php

namespace App\Services\File;

use Illuminate\Support\Facades\File;
use App\Services\File\FileServiceInterface;

class FileService implements FileServiceInterface
{
    public function __construct()
    {
    }

    public function upload($file, $type): string
    {
        if (!$file->getSize() > FILE_SIZE_LIMIT)  abort(400, trans('file.file-size'));
        if (!in_array($file->getClientOriginalExtension($type), FILE_EXTENSION))  abort(400, trans('file.format-file'));

        $file_type = getFileType($file->getClientMimeType($type));
        $file_name = genarateUUID() . " - " . $file->getClientOriginalName($type);
        $file->move($file_type, $file_name);
        return $file_type . "/" . $file_name;
    }

    public function delete($file): string
    {
        if ($file === null) return trans('file.delete-file-success');

        if (!File::exists($file))  abort(400, trans('file.file-not-exist'));

        File::delete($file);

        return trans('file.delete-file-success');
    }
}
