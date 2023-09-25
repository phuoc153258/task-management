<?php

namespace App\Repositories\Admin\Project;

interface ProjectRepositoryInterface
{
    public function index($options);
    public function show($id);
}
