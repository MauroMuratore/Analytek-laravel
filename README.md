# Analytek
cookie analitici per analizzare il percorso e i tempi che ci mettono gli utenti per completare un caso d'uso

# Come usarlo
-Scaricare e aggiungere il pacchetto al progetto laravel
-fare la migrazione e il seed
php artisan migrate:refresh --path=/database/migrations/fileName.php
php artisan db:seed --class=UseCaseSeeder
-aggiungere a route/api.php le seguenti linee
Route::get('/use_cases', [AnalytekController::class, 'getUseCases']);
Route::post('/use_cases', [AnalytekController::class, 'setPerfomanceData']);
-aggiungere a tutte le pagine i seguenti script nell'header
<script src="/js/Analytek/visit-time.js" type="module" language="javascript"></script>
<script src="/js/Analytek/send-use-case.js" type="module" language="javascript"></script>
-modificare i file storage/app/public/Analytek/UseCase.json per aggiungere i casi d'uso
