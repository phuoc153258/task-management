<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TaskReport>
 */
class TaskReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'task_id' => fake()->unique()->numberBetween(1, 20),
            'title' => fake()->text(15),
            'description' => fake()->text(30),
            'status' => 0,
        ];
    }
}
