<?php

namespace App\Services\Admin\User;

use App\Repositories\Admin\User\UserRepositoryInterface;
use App\Services\File\FileService;
use App\Services\Admin\User\UserServiceInterface;

class UserService implements UserServiceInterface
{
    public function __construct(
        private UserRepositoryInterface $userRepository,
        private FileService $fileService
    ) {
    }

    public function index($options)
    {
        return $this->userRepository->list($options);
    }

    public function show($id)
    {
        return $this->userRepository->getById($id);
    }

    public function create($userInfo)
    {
        return $this->userRepository->create($userInfo);
    }

    public function update($userInfo, $id)
    {
        $user = $this->userRepository->getById($id);

        if (!empty($userInfo['avatar'])) {
            $userInfo['avatar'] = $this->fileService->upload($userInfo['avatar'], 'avatar');
            $this->fileService->delete($user->avatar);
        }

        $user->update($userInfo);
        $user->syncRoles([])->assignRole($userInfo['role_id']);

        return $user;
    }

    public function avatar($avatar, $id)
    {
        $user = $this->userRepository->getById($id);

        $userInfo = ['avatar' => $this->fileService->upload($avatar, 'avatar')];
        $this->fileService->delete($user->avatar);
        $user->update($userInfo);

        return $user;
    }

    public function password($id)
    {
        $user = $this->userRepository->getById($id);
        $user->update([
            'password' => config('user.password_default'),
        ]);

        return $user;
    }

    public function delete($id)
    {
        $user = $this->userRepository->getById($id);
        $user->delete();

        return $user;
    }

    public function restore($id)
    {
        $user = $this->userRepository->getById($id);
        $user->restore();

        return $user;
    }

    public function force($id)
    {
        $user = $this->userRepository->getById($id);
        $user->forceDelete();

        return $user;
    }

    public function list()
    {
        return $this->userRepository->getAll();
    }
}
