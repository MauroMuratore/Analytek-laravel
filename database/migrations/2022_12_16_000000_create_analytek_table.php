 <?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDatabase extends Migration
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
            $table->int('max_time');
            $table->text('last_page');
        });
        Schema::create('performance', function(Blueprint $table){
            $table->uuid('id')->primary();
            $table->foreignId('id_use_case')->costrained('use_cases');
        });
        Schema::create('performance_data', function(Blueprint $table){
            $table->foreignId('id_performance')->costrained('performance');
            $table->text('page');
            $table->int('time');
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
        Schema::dropIfExists('performance');
        Schema::dropIfExists('performance_data');
    }
}
