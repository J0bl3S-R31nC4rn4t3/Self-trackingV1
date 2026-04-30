<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf- strikes">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Self Tracker</title>

        <!-- Load Vite -->
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    </head>
    <body>
        <!-- React Mount Point -->
        <div id="app"></div>
    </body>
</html>