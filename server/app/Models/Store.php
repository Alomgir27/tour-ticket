<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    protected $table = 'store';
    protected $fillable = ['title', 'description', 'lat', 'lng', 'address'];
    use HasFactory;
}
