<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Cart>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
       
        return [
            'user_id' => $this->faker->numberBetween(1, 100),
            'service_id' => $this->faker->numberBetween(1, 100),
            'quantity' => $this->faker->numberBetween(1, 100),
            'total_price' => $this->faker->numberBetween(1, 100),
            'status' => $this->faker->randomElement(['available', 'selected', 'ordered', 'cancelled']),
        ];
    }
}
