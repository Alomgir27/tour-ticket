<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceWhatIncluded>
 */
class ServiceWhatIncludedFactory extends Factory
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
            'service_includes' => json_encode(['2', '3', '4', '5'])
        ];
    }
}
