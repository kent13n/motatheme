<?php get_header(); ?>
    <main class="container">
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

            <article class="photo">
                <section class="content">
                    <h1><?php the_title(); ?></h1>

                    <ul class="photo__meta">
                        <li>
                            <span>Référence</span> : <?= get_field('reference') ?>
                        </li>
                        <li>
                            <span>Catégorie</span> : <?= the_terms(false, 'category_photo') ?>
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
                    <?php the_post_thumbnail(); ?>
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
    </main>
<?php get_footer(); ?>