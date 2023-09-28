<?php

namespace Database\Seeders;

use App\Models\ServiceDetailImage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceDetailImageTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ServiceDetailImage::factory(100)->create();
    }
}
