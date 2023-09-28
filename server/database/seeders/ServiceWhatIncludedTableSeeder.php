<?php

namespace Database\Seeders;

use App\Models\ServiceWhatIncluded;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceWhatIncludedTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ServiceWhatIncluded::factory(100)->create();
    }
}
