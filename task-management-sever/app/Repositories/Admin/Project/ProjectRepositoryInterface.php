<?php

namespace App\Repositories\Admin\Project;

interface ProjectRepositoryInterface
{
    public function list($options);

    public function show($id);

    public function create($projectDetails);
}
