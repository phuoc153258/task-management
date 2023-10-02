<?php

namespace App\Services\Admin\Task;

interface TaskServiceInterface
{
    public function index($options, $project_id);

    public function show($id);

    public function create($taskDetails);

    public function update($taskDetails, $id);

    public function delete($id);
}
