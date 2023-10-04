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
        LeaveRequestType::create(['title' => 'Paid leave (8h - 10h)']);
        LeaveRequestType::create(['title' => 'Paid leave (9h - 11h)']);
        LeaveRequestType::create(['title' => 'Paid leave (10h - 12h)']);
        LeaveRequestType::create(['title' => 'Paid leave (13h - 15h)']);
        LeaveRequestType::create(['title' => 'Paid leave (14h - 16h)']);
        LeaveRequestType::create(['title' => 'Paid leave (15h - 17h)']);
        LeaveRequestType::create(['title' => 'Unpaid leave (8h - 10h)']);
        LeaveRequestType::create(['title' => 'Unpaid leave (9h - 11h)']);
        LeaveRequestType::create(['title' => 'Unpaid leave (10h - 12h)']);
        LeaveRequestType::create(['title' => 'Unpaid leave (13h - 15h)']);
        LeaveRequestType::create(['title' => 'Unpaid leave (14h - 16h)']);
        LeaveRequestType::create(['title' => 'Unpaid leave (15h - 17h)']);
        LeaveRequestType::create(['title' => 'Other']);
    }
}
