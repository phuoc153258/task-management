<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'username' => fake()->userName(),
            'fullname' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => '$2y$10$rws9RlrlNjDHc5ebCqrlKeJua0.UdxwhTLuMBIgh70gSyxrk1cgT6',
            'avatar' => 'image/user_avatar_default.jpg',
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
