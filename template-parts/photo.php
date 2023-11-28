<a href="<?= get_permalink(get_the_ID()) ?>" class="post-photo">
    <?php the_post_thumbnail('photo-thumbnail', ['data-lightbox-image' => wp_get_attachment_image_src(get_post_thumbnail_id(), 'full')[0]]); ?>
    <span class="img-overlay">
        <img class="icon-eye"
             src="<?= get_template_directory_uri() . '/assets/images/icon-eye.svg' ?>"
             alt="Icon eye">
        <img class="icon-fullscreen"
             src="<?= get_template_directory_uri() . '/assets/images/icon-fullscreen.svg' ?>"
             alt="Icon fullscreen">
        <span class="ref-photo"><?= get_field('reference') ?></span>
        <span class="categories-photo"><?= trim(array_reduce(array_map(fn(\WP_Term $term) => $term->name, get_the_terms(get_post(), 'category_photo')), fn($acc, $name) => $acc . $name . ' ')) ?></span>
    </span>
</a>