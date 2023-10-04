<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\LeaveRequestType;
use Database\Factories\LeaveRequestFactory;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RoleSeeder::class);
        $this->call(UserSeeder::class);
        \App\Models\User::factory(10)->create();
        $this->call(LeaveRequestTypeSeeder::class);
        \App\Models\LeaveRequest::factory(20)->create();
        \App\Models\Project::factory(5)->create();
        $this->call(UserProjectSeeder::class);
        \App\Models\Task::factory(20)->create();
        \App\Models\TaskReport::factory(20)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
