<?php

namespace App\Services\Admin\Project;

interface ProjectServiceInterface
{
    public function index($options);
    public function show($id);
}
