<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('service_experiances', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('service_id');
            $table->text('full_description');
            $table->text('highlights');
            $table->text('important_information');
            $table->timestamps();
            $table->foreign('service_id')->references('id')->on('services')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_experiances');
    }
};
