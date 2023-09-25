<?php

namespace Database\Seeders;

use App\Models\LeaveRequestType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LeaveRequestTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LeaveRequestType::create(['title' => 'Paid leave']);
        LeaveRequestType::create(['title' => 'Unpaid leave']);
        LeaveRequestType::create(['title' => 'Other']);
    }
}
