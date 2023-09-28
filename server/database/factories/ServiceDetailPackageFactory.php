<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ServiceDetailPackage>
 */
class ServiceDetailPackageFactory extends Factory
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
            'tour_date' => $this->faker->date(),
            'tour_type' => json_encode(['24h Ticket','48h Ticket','72h Ticket','One Run']),
            'is_online' => $this->faker->boolean(),
            'meeting_point' => $this->faker->sentence(),
            'starting_time' => $this->faker->date(),
            'ticket_details' => $this->faker->paragraph(),

        ];
    }
}
