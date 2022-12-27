<?php

namespace App\Models\AnalytekUC;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UCExecution extends Model
{
    protected $table = "uc_executions";
    protected $fillable = ['uuid', 'id_use_case'];
    public $timestamps = false;
    use HasFactory;

    public function UCTimeOnPage(){
        return $this->hasMany(UCTimeOnPage::class, 'id_uc_execution');
    }

    public function useCase(){
        return $this->belongsTo(UseCase::class, 'id_use_case');
    }

}
