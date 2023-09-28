<?php

namespace App\Services\Project;

use App\Repositories\Project\ProjectRepositoryInterface;

class ProjectService implements ProjectServiceInterface
{
    public function __construct(private ProjectRepositoryInterface $projectRepository)
    {
    }

    public function index($options, $user_id)
    {
        $projectResponse = $this->projectRepository->getList($options, $user_id);

        return $projectResponse;
    }

    public function show($id, $user_id)
    {
        $projectResponse = $this->projectRepository->getById($id, $user_id);
        if (empty($projectResponse))
            abort(400, trans('base.base-failed'));

        return $projectResponse;
    }
}
