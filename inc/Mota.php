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

    public static function get_prev_next_thumbnails()
    {
        $prev_post = get_previous_post();
        $next_post = get_next_post();
        $html = '<div class="thumbnails">';
        if ($prev_post) {
            $prev_link = get_permalink($prev_post->ID);
            $prev_thumbnail = get_the_post_thumbnail($prev_post->ID, 'thumbnail');
            $html .= '<a class="prev-thumbnail" href="' . $prev_link . '">' . $prev_thumbnail . '</a>';
        }

        if ($next_post) {
            $next_link = get_permalink($next_post->ID);
            $next_thumbnail = get_the_post_thumbnail($next_post->ID, 'thumbnail');
            $html .= '<a class="next-thumbnail" href="' . $next_link . '">' . $next_thumbnail . '</a>';
        }

        return $html . '</div>';
    }

    public static function get_prev_next_links()
    {
        $prev_post = get_previous_post();
        $next_post = get_next_post();
        $html = '<div class="links">';

        if ($prev_post) {
            $prev_link = get_permalink($prev_post->ID);
            $html .= <<<HTML
            <a class="prev-link" href="{$prev_link}">
                <svg width="26" height="8" viewBox="0 0 26 8" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM1 4.5H26V3.5H1V4.5Z"
                          fill="black"/>
                </svg>
            </a>
            HTML;
        }

        if ($next_post) {
            $next_link = get_permalink($next_post->ID);
            $html .= <<<HTML
                <a class="next-link" href="{$next_link}">
                    <svg width="26" height="8" viewBox="0 0 26 8" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M25.3536 3.64645C25.5488 3.84171 25.5488 4.15829 25.3536 4.35355L22.1716 7.53553C21.9763 7.7308 21.6597 7.7308 21.4645 7.53553C21.2692 7.34027 21.2692 7.02369 21.4645 6.82843L24.2929 4L21.4645 1.17157C21.2692 0.976311 21.2692 0.659728 21.4645 0.464466C21.6597 0.269204 21.9763 0.269204 22.1716 0.464466L25.3536 3.64645ZM25 4.5H0V3.5H25V4.5Z"
                              fill="black"/>
                    </svg>
                </a>
            HTML;
        }

        return $html . '</div>';
    }
}