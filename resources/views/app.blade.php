<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';

                if (appearance === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                    if (prefersDark) {
                        document.documentElement.classList.add('dark');
                    }
                }
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: oklch(1 0 0);
            }

            html.dark {
                background-color: oklch(0.145 0 0);
            }
        </style>

        {{-- template title (Inertia akan gabungkan dengan Head title dari React) --}}
        <title inertia>{{ config('app.name', 'MyToDo') }}</title>

        <link rel="icon" href="{{ asset('favicon.ico') }}" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        {{-- load vite / assets --}}
        @viteReactRefresh
        @vite(['resources/js/app.js'])

        {{-- Inertia head: tempat Inertia/React memasukkan <Head title="..."/> --}}
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
