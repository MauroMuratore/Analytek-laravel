 <?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnalytekTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('use_cases', function(Blueprint $table){
            $table->id();
            $table->text('name');
            $table->integer('max_time');
            $table->text('last_page');
        });
        Schema::create('performances', function(Blueprint $table){
            $table->uuid('id')->primary();
            $table->foreignId('id_use_case')->costrained('use_cases');
        });
        Schema::create('performances_data', function(Blueprint $table){
            $table->foreignId('id_performances')->costrained('performances');
            $table->text('page');
            $table->integer('time');
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('use_cases');
        Schema::dropIfExists('performances');
        Schema::dropIfExists('performances_data');
    }
}
