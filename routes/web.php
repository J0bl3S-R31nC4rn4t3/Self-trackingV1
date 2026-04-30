<?php

use Illuminate\Support\Facades\Route;

// Catch-all route to serve the React application
// This matches any URL path except those starting with /api
Route::get('/{any}', function () {
    return view('welcome'); // Or whatever your main blade file is named
})->where('any', '^(?!api).*$');