<?php

namespace App\Repositories\Project;

interface ProjectRepositoryInterface
{
    public function list($options, $user_id);
    public function getById(int $id, $user_id);
}
