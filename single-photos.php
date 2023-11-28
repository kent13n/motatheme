<?php get_header(); ?>
    <main class="container">
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

            <article class="photo grid">
                <section class="content">
                    <h1><?php the_title(); ?></h1>

                    <ul class="photo__meta">
                        <li>
                            <span>Référence</span> : <span class="ref-photo"><?= get_field('reference') ?></span>
                        </li>
                        <li>
                            <span>Catégorie</span> : <span
                                    class="categories-photo"><?= the_terms(false, 'category_photo') ?></span>
                        </li>
                        <li>
                            <span>Format</span> : <?= the_terms(false, 'format') ?>
                        </li>
                        <li>
                            <span>Type</span> : <?= get_field('type') ?>
                        </li>
                        <li>
                            <span>Date</span> : <?= the_date('Y') ?>
                        </li>
                    </ul>
                </section>
                <section class="thumbnail">
                    <?php the_post_thumbnail(null, ['data-lightbox-image' => wp_get_attachment_image_src(get_post_thumbnail_id(), 'full')[0]]); ?>
                    <div class="thumbnail-overlay">
                        <img class="icon-fullscreen"
                             src="<?= get_template_directory_uri() . '/assets/images/icon-fullscreen.svg' ?>"
                             alt="Icon fullscreen">
                    </div>
                </section>
            </article>

        <?php endwhile; endif; ?>

        <section class="contact">
            <?php
            $prev_post = get_previous_post();
            $next_post = get_next_post();
            ?>
            <p>
                Cette photo vous intéresse ?
                <a class="btn" href="#contact" data-ref="<?= get_field('reference') ?>">Contact</a>
            </p>
            <nav class="previous-next">
                <div class="wrapper">
                    <?= \Mota\Mota::get_prev_next_thumbnails() ?>
                    <?= \Mota\Mota::get_prev_next_links() ?>
                </div>
            </nav>
        </section>

        <?php $query = \Mota\Mota::get_related_photos() ?>
        <?php if ($query->have_posts()): ?>
            <section class="related-photos">
                <h2>Vous aimerez aussi</h2>

                <div class="grid">
                    <?php while ($query->have_posts()): $query->the_post() ?>
                        <?= get_template_part('template-parts/photo') ?>
                    <?php endwhile ?>
                </div>

                <a class="btn" href="#home">Toutes les photos</a>
            </section>
        <?php endif ?>
    </main>
<?php get_footer(); ?>