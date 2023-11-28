<?php get_header(); ?>
<?php $query = \Mota\Mota::get_hero_image() ?>
<?php if ($query->have_posts()): $query->the_post(); ?>
    <div class="hero-header">
        <?php the_post_thumbnail('full'); ?>
        <h1>
            <img src="<?= get_template_directory_uri() . '/assets/images/photographe-event.svg' ?>"
                 alt="Photographe event">
        </h1>
        <?php wp_reset_postdata() ?>
    </div>
<?php endif ?>

    <main class="container">
        <div class="filters">
            <div class="filter-group">
                <?= get_template_part('template-parts/filter', 'categories') ?>
                <?= get_template_part('template-parts/filter', 'formats') ?>
            </div>
            <?= get_template_part('template-parts/filter', 'dates') ?>
        </div>
        <div class="grid">
            <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                <?= get_template_part('template-parts/photo') ?>
            <?php endwhile; endif; ?>
        </div>
    </main>
<?php get_footer(); ?>