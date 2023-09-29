<?php

namespace App\Services\User;

use App\Repositories\User\UserRepositoryInterface;
use App\Services\File\FileService;
use App\Services\User\UserServiceInterface;
use Illuminate\Support\Facades\Hash;

class UserService implements UserServiceInterface
{

    public function __construct(private UserRepositoryInterface $userRepository, private FileService $fileService)
    {
    }

    public function update($userInfo, $id)
    {
        $user = $this->userRepository->getById($id);
        $user->update($userInfo);

        return $user;
    }

    public function avatar($avatar, $id)
    {
        $user = $this->userRepository->getById($id);

        $avatar_name = $this->fileService->upload($avatar, 'avatar');
        $this->fileService->delete($user->avatar);

        $user->update(['avatar' => $avatar_name]);

        return $user;
    }

    public function password($userInfo, $id)
    {
        $user = $this->userRepository->getById($id);

        if (!Hash::check($userInfo['old_password'], $user->password)) abort(400, 'Old password is not correct');
        $user->update($userInfo);

        return $user;
    }
}
