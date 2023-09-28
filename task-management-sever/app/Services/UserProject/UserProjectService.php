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
        $userProjectResponse = $this->userProjectRepository->list($options, $project_id, $user_id);

        return $userProjectResponse;
    }

    public function show($id, $project_id, $user_id)
    {
        if (!$this->userProjectRepository->isJoined($project_id, $user_id)) abort(400, trans('base.base-failed'));

        $userProjectResponse = $this->userProjectRepository->getById($id, $project_id);
        if (empty($userProjectResponse))
            abort(400, trans('base.base-failed'));

        return $userProjectResponse;
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
}
