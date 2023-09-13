<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'username' => 'admin',
            'fullname' => 'Nguyen Don Phuoc',
            'email' => 'admin@gmail.com',
            'password' => '$2y$10$rws9RlrlNjDHc5ebCqrlKeJua0.UdxwhTLuMBIgh70gSyxrk1cgT6'
        ]);
    }
}
