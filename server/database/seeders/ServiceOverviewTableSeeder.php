<?php

namespace Database\Seeders;

use App\Models\ServiceOverview;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceOverviewTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ServiceOverview::factory(100)->create();
    }
}
