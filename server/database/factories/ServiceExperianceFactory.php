<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceExperiance>
 */
class ServiceExperianceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'service_id' => $this->faker->numberBetween(1, 100),
            'full_description' => $this->faker->paragraph(),
            'highlights' => $this->faker->paragraph(),
            'important_information' => $this->faker->sentence(),

        ];
    }
}
