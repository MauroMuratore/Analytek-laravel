<?php

namespace App\Models\Analytek;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerformanceData extends Model
{
    protected $table = "performances_data";
    protected $fillable = ['id_performance', 'page', 'time'];
    public $timestamps = false;
    use HasFactory;

    public function perfomance(){
        return $this->belongsTo(Performance::class, 'id_performance');
    }

}
