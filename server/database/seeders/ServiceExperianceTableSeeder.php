<?php

namespace Database\Seeders;

use App\Models\ServiceExperiance;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceExperianceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ServiceExperiance::factory(100)->create();
    }
}
