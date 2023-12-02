<?php

namespace Mota;

use WP_Query;

class API
{
    private string $namespace = 'mota/v1';

    public function __construct()
    {
        add_filter('rest_authentication_errors', [$this, 'rest_authentication_needed'], 10);
        add_filter('rest_authentication_errors', [$this, 'rest_authorization'], 9);
        add_action('rest_api_init', [$this, 'register_get_photos_route']);
    }

    public function rest_authentication_needed($result)
    {
        if (true === $result || is_wp_error($result)) {
            return $result;
        }

        if (!is_user_logged_in()) {
            return new \WP_Error(
                'rest_not_logged_in',
                __('You are not currently logged in.'),
                ['status' => 401]
            );
        }

        return $result;
    }

    public function rest_authorization($result)
    {
        global $wp;
        if (strpos($wp->query_vars['rest_route'], $this->namespace) !== false) {
            return true;
        }
        return $result;
    }

    public function register_get_photos_route()
    {
        register_rest_route($this->namespace, 'photos', [
            'methods' => 'POST',
            'permission_callback' => '__return_true',
            'callback' => function (\WP_REST_Request $request) {
                $tax_query = [];
                $date_query = [];
                $current_page = 1;
                $posts_per_page = get_option('posts_per_page');
                $category = $request->get_param('category');
                $year = $request->get_param('year');
                $format = $request->get_param('format');
                $page = $request->get_param('page');


                if ($category) {
                    $tax_query[] = [
                        'taxonomy' => 'category_photo',
                        'terms' => $category,
                        'field' => 'slug'
                    ];
                }

                if ($format) {
                    $tax_query[] = [
                        'taxonomy' => 'format',
                        'terms' => $format,
                        'field' => 'slug'
                    ];
                }

                if ($year) {
                    $date_query[] = [
                        'year' => $year
                    ];
                }

                if ($page && filter_var($page, FILTER_VALIDATE_INT)) {
                    $current_page = max(1, (int)$page);
                }

                $query = new WP_Query([
                    'post_type' => 'photos',
                    'posts_per_page' => $posts_per_page,
                    'paged' => $current_page,
                    'orderby' => 'date',
                    'order' => 'asc',
                    'tax_query' => $tax_query,
                    'date_query' => $date_query
                ]);

                ob_start();
                while ($query->have_posts()): $query->the_post();
                    get_template_part('template-parts/photo');
                endwhile;
                $content = ob_get_contents();
                ob_end_clean();

                return new \WP_REST_Response([
                    'category' => $category,
                    'year' => $year,
                    'format' => $format,
                    'total_pages' => $query->max_num_pages,
                    'current_page' => $current_page,
                    'total' => $query->post_count,
                    'content' => $content
                ]);
            }
        ]);
    }
}