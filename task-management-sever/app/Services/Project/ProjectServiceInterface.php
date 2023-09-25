<?php

namespace App\Services\Project;

interface ProjectServiceInterface
{
    public function index($options, $user_id);

    public function show($id, $user_id);
}
