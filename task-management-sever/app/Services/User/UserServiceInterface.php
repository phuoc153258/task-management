<?php

namespace App\Services\User;

interface UserServiceInterface
{
    public function update($userInfo, $id);

    public function avatar($avatar, $id);

    public function password($userInfo, $id);
}
