<?php

namespace App\Services\User;

use App\Repositories\User\UserRepositoryInterface;
use App\Services\File\FileService;
use App\Services\User\UserServiceInterface;

class UserService implements UserServiceInterface
{
    private UserRepositoryInterface $userRepository;
    private FileService $fileService;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
        $this->fileService = new FileService();
    }

    public function index($options)
    {
        $usersResponse = $this->userRepository->getUsers($options);
        return $usersResponse;
    }

    public function show($id)
    {
        $userResponse =  $this->userRepository->getUserById($id);
        if (!$userResponse) abort(400, trans('base.base-failed'));
        return $userResponse;
    }

    public function create($userInfo)
    {
        $userResponse = $this->userRepository->createUser($userInfo);
        return $userResponse;
    }

    public function update($userInfo, $id, $avatar)
    {
        $user = $this->userRepository->getUserById($id);
        if (empty($user)) abort(400, trans('user.user-is-not-exist'));

        $infoUser = [
            'username' => $userInfo['username'],
            'fullname' => $userInfo['fullname'],
            'email' => $userInfo['email'],
            'password' => $userInfo['password'],
            'avatar' => $this->fileService->upload($avatar, 'avatar'),
            'role_id' => $userInfo['role_id'],
        ];
        $this->fileService->delete($user->avatar);
        $user->update($infoUser);
        return $user;
    }

    public function delete($id)
    {
        $user = $this->userRepository->getUserById($id);
        if (empty($user)) abort(400, trans('user.user-is-not-exist'));

        $user->delete();
    }
}
