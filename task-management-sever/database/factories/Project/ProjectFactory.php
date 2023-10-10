<?php

namespace Database\Factories\Project;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->text(15),
            'description' => fake()->text(30),
            'status' => fake()->randomElement([1]),
            'created_by' => 1
        ];
    }
}
