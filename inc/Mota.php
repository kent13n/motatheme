<?php

namespace Mota;

class Mota
{
    public function __construct()
    {
        add_theme_support('post-thumbnails');
        add_theme_support('custom-logo');
        add_theme_support('title-tag');
        add_theme_support('menus');

        add_action('init', [$this, 'register_nav_menu']);
        add_action( 'wp_enqueue_scripts', [ $this, 'register_assets' ] );
    }

    public function register_assets() {
        wp_enqueue_style( 'mota-style', get_stylesheet_directory_uri() . '/style.css' );
        wp_enqueue_script( 'mota-script', get_stylesheet_directory_uri() . '/scripts.js' );
    }

    public function register_nav_menu()
    {
        register_nav_menus(
            [
                'primary' => __('Primary'),
                'footer' => __('Footer'),
            ]
        );
    }
}