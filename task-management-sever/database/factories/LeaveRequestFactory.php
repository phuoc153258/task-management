<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\LeaveRequest>
 */
class LeaveRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'content' => fake()->text(15),
            'start_date' => $this->faker->dateTimeBetween('-30 days', '+30 days'),
            'end_date' => $this->faker->dateTimeBetween('now', '+90 days'),
            'accept_by' => null,
            'status' => 0,
            'user_id' => fake()->randomElement([1, 2]),
            'leave_request_type_id' =>  fake()->randomElement([1, 2, 3])
        ];
    }
}
