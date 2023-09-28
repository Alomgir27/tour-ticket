<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->title(),
            'tags' => $this->faker->word(),
            'discount' => $this->faker->numberBetween(1, 20),
            'price' => $this->faker->numberBetween(100, 200),
            'actual_price' => $this->faker->numberBetween(80, 180),
            'images' => $this->faker->imageUrl(),
            'activity_feature' => $this->faker->word(),
            'short_description'=>$this->faker->sentence(),
        ];
    }
}
