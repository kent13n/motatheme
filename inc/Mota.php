<?php

namespace Mota;

use Extended\ACF\Fields\Tab;
use Extended\ACF\Fields\Text;
use Extended\ACF\Location;

class Mota
{
    public function __construct()
    {
        add_theme_support('post-thumbnails');
        add_theme_support('custom-logo');
        add_theme_support('title-tag');
        add_theme_support('menus');

        add_action('init', [$this, 'register_custom_post_type']);
        add_action('init', [$this, 'register_nav_menu']);
        add_action('init', [$this, 'register_taxonomies']);
        add_action('init', [$this, 'register_custom_fields']);
        add_action('wp_enqueue_scripts', [$this, 'register_assets']);

        add_filter('manage_photos_posts_columns', [$this, 'manage_photos_posts_columns']);
        add_action('manage_photos_posts_custom_column', [$this, 'manage_photos_posts_custom_column'], 10, 2);
    }

    public function register_assets()
    {
        wp_enqueue_style('mota-style', get_stylesheet_directory_uri() . '/style.css');
        wp_enqueue_script('mota-script', get_stylesheet_directory_uri() . '/scripts.js');
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

    public function register_taxonomies()
    {
        register_taxonomy('category_photo', 'photos', [
            'labels' => [
                'name' => 'Catégorie',
                'singular_name' => 'Catégorie',
                'plural_name' => 'Catégories',
                'search_items' => 'Rechercher des catégories',
                'all_items' => 'Toutes les catégories',
                'edit_item' => 'Modifier la catégorie',
                'update_item' => 'Mettre à jour la catégorie',
                'add_new_item' => 'Ajouter une catégorie',
                'new_item_name' => 'Ajouter une catégorie',
                'menu_name' => 'Catégories'
            ],
            'show_in_rest' => true,
            'hierarchical' => true,
            'show_admin_column' => true
        ]);

        register_taxonomy('format', 'photos', [
            'labels' => [
                'name' => 'Format',
                'singular_name' => 'Format',
                'plural_name' => 'Formats',
                'search_items' => 'Rechercher des formats',
                'all_items' => 'Tous les formats',
                'edit_item' => 'Modifier le format',
                'update_item' => 'Mettre à jour le format',
                'add_new_item' => 'Ajouter un format',
                'new_item_name' => 'Ajouter un format',
                'menu_name' => 'Formats'
            ],
            'show_in_rest' => true,
            'hierarchical' => true,
            'show_admin_column' => true
        ]);
    }

    public function register_custom_post_type()
    {
        $labels = [
            'name' => 'Photos',
            'singular_name' => 'Photo',
            'add_new' => 'Ajouter une photo',
            'all_items' => 'Toutes les photos',
            'edit_item' => 'Modifier une photo',
            'add_new_item' => 'Ajouter une photo',
            'menu_name' => 'Photos',
            'search_items' => 'Rechercher des photos'
        ];

        $args = [
            'taxonomies' => ['category_photo', 'format'],
            'labels' => $labels,
            'public' => true,
            'show_in_rest' => false,
            'has_archive' => true,
            'supports' => ['title', 'editor', 'thumbnail'],
            'menu_position' => 3,
            'menu_icon' => 'dashicons-portfolio'
        ];

        register_post_type('photos', $args);
        remove_post_type_support('photos', 'editor');
    }

    public function register_custom_fields()
    {
        register_extended_field_group([
            'title' => 'Paramètres photo',
            'location' => [
                Location::where('post_type', 'photos')
            ],
            'fields' => [
                Tab::make('Paramètres photo')->placement('left'),
                Text::make('Type', 'type')
                    ->required()
                    ->maxLength(50),
                Text::make('Référence', 'reference')
                    ->required()
                    ->maxLength(50)
            ]

        ]);
    }

    public function manage_photos_posts_columns($defaults)
    {
        $defaults['type'] = 'Type';
        $defaults['reference'] = 'Référence';
        return $defaults;
    }

    public function manage_photos_posts_custom_column($column_name, $post_id)
    {
        if ($column_name == 'type') {
            echo get_field('type', $post_id);
        }

        if ($column_name == 'reference') {
            echo get_field('reference', $post_id);
        }
    }
}