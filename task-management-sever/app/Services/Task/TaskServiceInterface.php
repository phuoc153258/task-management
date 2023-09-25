<?php

namespace App\Services\Task;

interface TaskServiceInterface
{
    public function index($options, $project_id);

    public function show($id, $project_id);
}
