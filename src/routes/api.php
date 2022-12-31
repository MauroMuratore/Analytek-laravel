<?php
/* Analytek routes*/

Route::get('/use_cases', [UseCaseController::class, 'getUseCases']); 
Route::get('/use_cases/{id}', [UseCaseController::class, 'getUseCase']); 
Route::post('/use_cases', [UseCaseController::class, 'setUCExecution']); 
Route::get('/data_uc/{id}', [UseCaseController::class, 'getUCDataPlot']);

/* End Analytek routes */