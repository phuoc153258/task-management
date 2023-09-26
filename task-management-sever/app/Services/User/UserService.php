<?php

namespace App\Services\User;

use App\Repositories\User\UserRepositoryInterface;
use App\Services\File\FileService;
use App\Services\User\UserServiceInterface;
use Illuminate\Support\Facades\Hash;

class UserService implements UserServiceInterface
{
    private UserRepositoryInterface $userRepository;
    private FileService $fileService;

    public function __construct(UserRepositoryInterface $userRepository, FileService $fileService)
    {
        $this->userRepository = $userRepository;
        $this->fileService = $fileService;
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
            'fullname' => $userInfo['fullname'],
            'email' => $userInfo['email'],
            'avatar' => $this->fileService->upload($avatar, 'avatar'),
        ];
        $this->fileService->delete($user->avatar);
        $user->update($infoUser);
        return $user;
    }

    public function password($userInfo, $id)
    {
        $user = $this->userRepository->getUserById($id);
        if (empty($user)) abort(400, trans('user.user-is-not-exist'));

        if (!Hash::check($userInfo['old_password'], $user->password)) abort(400, 'Old password is not correct');
        $user->update($userInfo);
        return $user;
    }

    public function delete($id)
    {
        $user = $this->userRepository->getUserById($id);
        if (empty($user)) abort(400, trans('user.user-is-not-exist'));

        $user->delete();
    }
}
