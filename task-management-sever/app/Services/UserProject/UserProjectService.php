<?php

namespace App\Services\UserProject;

use App\Repositories\UserProject\UserProjectRepositoryInterface;

class UserProjectService implements UserProjectServiceInterface
{
    public function __construct(private UserProjectRepositoryInterface $userProjectRepository)
    {
    }

    public function index($options, $project_id, $user_id)
    {
        if (empty($this->userProjectRepository->isJoined($project_id, $user_id))) abort(400, trans('base.base-failed'));

        return $this->userProjectRepository->list($options, $project_id);
    }

    public function create($project_id, $user_id, $current_user_id)
    {
        if (empty($this->userProjectRepository->isJoined($project_id, $current_user_id))) abort(400, trans('base.base-failed'));

        return $this->userProjectRepository->create($project_id, $user_id);
    }

    public function delete($project_id, $user_id, $current_user_id)
    {
        if (empty($this->userProjectRepository->isJoined($project_id, $current_user_id))) abort(400, trans('base.base-failed'));

        $userProject = $this->userProjectRepository->isJoined($project_id, $user_id);
        if (!$userProject) abort(400, trans('base.base-failed'));
        $userProject->delete();

        return $userProject;
    }
}
