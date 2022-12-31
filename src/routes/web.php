<?php
/* Analytek routes*/
Route::get('/analytek', [UseCaseViewController::class, "getUseCases"])->name('analytek');
Route::get('/analytek/{id}', [UseCaseViewController::class, "getUCPlot"])->name('analytek.show');
/* End Analytek routes */