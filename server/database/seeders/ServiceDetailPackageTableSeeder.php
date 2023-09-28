<?php

namespace Database\Seeders;

use App\Models\ServiceDetailPackage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceDetailPackageTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ServiceDetailPackage::factory(100)->create();
    }
}
