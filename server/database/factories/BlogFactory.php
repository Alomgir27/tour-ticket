<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Blog>
 */
class BlogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'thumbnail' => $this->faker->imageUrl(),
            'image' => $this->faker->imageUrl(),
            'tag' => $this->faker->word(),
            'short_desc' => $this->faker->sentence(),
            'details' => $this->faker->paragraph(),
        ];
    }
}
