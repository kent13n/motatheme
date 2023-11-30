<?php

namespace Mota;

use WP_Query;

class Settings
{
    public function __construct()
    {
        add_action('admin_menu', [$this, 'add_menu']);
        add_action('admin_init', [$this, 'register_fields']);
        add_action('template_redirect', [$this, 'template_redirect']);
        add_action('pre_get_posts', [$this, 'pre_get_posts']);
    }

    public function pre_get_posts(WP_Query $query)
    {
        if (is_home() && $query->is_main_query() && get_option('mota_options_photos_on_front_page')) {
            $query->set('post_type', 'photos');
            $query->set('order', 'ASC');
            $query->set('orderby', 'date');
        }
    }

    public function template_redirect()
    {
        if (is_post_type_archive('photos') && get_option('mota_options_photos_on_front_page')) {
            wp_redirect(home_url('/'), 301);
            exit;
        }

        if (is_home() && get_option('mota_options_photos_on_front_page')) {
            include(get_template_directory() . '/archive-photos.php');
            exit;
        }
    }

    public function register_fields()
    {
        register_setting('mota_options', 'mota_options_photos_on_front_page', ['default' => '1']);
        add_settings_section('mota_options_section', '', [$this, 'renderSection'], 'mota_options');
        add_settings_field('mota_options_photos_on_front_page_field', 'La page d\'accueil affiche les posts photos à la place des articles', [$this, 'render_photos_on_front_page_field'], 'mota_options', 'mota_options_section');
    }

    public function add_menu()
    {
        add_options_page('Settings Mota', 'Mota', 'manage_options', 'settings-mota', [$this, 'render']);
    }

    public function renderSection()
    {
    }

    public function render_photos_on_front_page_field()
    {
        $value = get_option('mota_options_photos_on_front_page');
        $checked = $value === '1' ? ' checked="checked"' : '';
        $html = <<<HTML
            <input type="checkbox" name="mota_options_photos_on_front_page" value="1"{$checked}>
        HTML;
        echo $html;
    }

    public function render()
    {
        ?>
        <h1>Paramètres Mota</h1>
        <form action="options.php" method="post">
            <?php
            settings_fields('mota_options');
            do_settings_sections('mota_options');
            submit_button();
            ?>
        </form>
        <?php
    }
}