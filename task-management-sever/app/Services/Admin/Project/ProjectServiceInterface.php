<?php

namespace App\Services\Admin\Project;

interface ProjectServiceInterface
{
    public function index($options);

    public function show($id);

    public function create($projectDetails);

    public function update($projectDetails, $id);

    public function delete($id);
}
