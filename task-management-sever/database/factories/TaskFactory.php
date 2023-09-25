<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => fake()->randomElement([1, 2, 3, 4, 5]),
            'project_id' => fake()->randomElement([1, 2, 3, 4, 5]),
            'created_by' => 1,
            'title' => fake()->text(15),
            'description' => fake()->text(30),
            'status' => 0,
            'hours' => 8,
            'start_date' => $this->faker->dateTimeBetween('-30 days', '+30 days'),
            'end_date' => $this->faker->dateTimeBetween('now', '+90 days'),
        ];
    }
}
