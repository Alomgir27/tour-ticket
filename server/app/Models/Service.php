<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $hidden = ['created_at', 'updated_at'];

    protected $guarded = ['created_at', 'updated_at'];


    public function images()
    {
        return $this->hasMany(ServiceDetailImage::class, 'service_id');
    }

    public function whatIncludes()
    {
        return $this->hasMany(ServiceWhatIncluded::class, 'service_id');
    }

    public function servicePackage()
    {
        return $this->hasOne(ServiceDetailPackage::class, 'service_id');
    }

    public function serviceExp()
    {
        return $this->hasMany(ServiceExperiance::class, 'service_id');
    }

    public function serviceOverview()
    {
        return $this->hasOne(ServiceOverview::class, 'service_id');
    }
    
}

