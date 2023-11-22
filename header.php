<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<header>
    <div class="container">
        <?= get_template_part('template-parts/logo'); ?>

        <nav>
            <?= get_template_part('template-parts/logo'); ?>
            <ul>
                <?php wp_nav_menu([
                    'container' => '',
                    'depth' => 1,
                    'items_wrap' => '%3$s',
                    'theme_location' => 'primary'
                ]) ?>
            </ul>
        </nav>
    </div>
    <div class="overlay"></div>
</header>
<?php wp_body_open(); ?>
