<?php

namespace Database\Seeders;

use App\Models\Overview;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OverviewTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Overview::factory(100)->create();
    }
}
