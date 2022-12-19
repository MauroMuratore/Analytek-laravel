<?php

namespace App\Models\Analytek;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perfomance extends Model
{
    protected $table = "performances";
    protected $fillable = ['id', 'page', 'time'];
    public $timestamps = false;
    use HasFactory;

    public function perfomanceData(){
        return $this->hasMany(PerfomanceData::class, 'id_perfomance');
    }

    public function useCase(){
        return $this->belongsTo(UseCase::class, 'id_use_case');
    }

}
