<?php

namespace App\Models\Analytek;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerfomanceData extends Model
{
    protected $table = "performances_data";
    protected $fillable = ['id_performances', 'page', 'time'];
    public $timestamps = false;
    use HasFactory;

    public function perfomance(){
        return $this->belongsTo(Perfomance::class, 'id_perfomance');
    }

}
