<?php

namespace App\Services\Admin\UserProject;

use App\Repositories\Admin\UserProject\UserProjectRepositoryInterface;

class UserProjectService implements UserProjectServiceInterface
{
    public function __construct(private UserProjectRepositoryInterface $userProjectRepository)
    {
    }

    public function index($options, $project_id)
    {
        return $this->userProjectRepository->list($options, $project_id);
    }

    public function create($project_id, $user_id)
    {
        return $this->userProjectRepository->create($project_id, $user_id);
    }

    public function delete($project_id, $user_id)
    {
        $userProject = $this->userProjectRepository->isJoined($project_id, $user_id);
        if (!$userProject) abort(400, trans('base.base-failed'));
        $userProject->delete();

        return $userProject;
    }

    public function restore($project_id, $user_id)
    {
        $userProject = $this->userProjectRepository->isJoined($project_id, $user_id);
        if (!$userProject) abort(400, trans('base.base-failed'));
        $userProject->restore();

        return $userProject;
    }

    public function force($project_id, $user_id)
    {
        $userProject = $this->userProjectRepository->isJoined($project_id, $user_id);
        if (!$userProject) abort(400, trans('base.base-failed'));
        $userProject->forceDelete();

        return $userProject;
    }
}
