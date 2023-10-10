<?php

namespace Database\Seeders;

use App\Models\UserProject\UserProject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserProject::create([
            'user_id' => 1,
            'project_id' => 1
        ]);
        UserProject::create([
            'user_id' => 1,
            'project_id' => 2
        ]);
        UserProject::create([
            'user_id' => 1,
            'project_id' => 3
        ]);
        UserProject::create([
            'user_id' => 1,
            'project_id' => 4
        ]);
        UserProject::create([
            'user_id' => 2,
            'project_id' => 1
        ]);
        UserProject::create([
            'user_id' => 2,
            'project_id' => 2
        ]);
        UserProject::create([
            'user_id' => 2,
            'project_id' => 3
        ]);
        UserProject::create([
            'user_id' => 2,
            'project_id' => 4
        ]);
        UserProject::create([
            'user_id' => 2,
            'project_id' => 5
        ]);
    }
}
