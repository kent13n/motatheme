<footer>
    <div class="container">
        <ul>
            <?php wp_nav_menu([
                'container' => '',
                'depth' => 1,
                'items_wrap' => '%3$s',
                'theme_location' => 'footer'
            ]) ?>
        </ul>
    </div>
</footer>

<?php get_template_part('template-parts/contact') ?>
<?php get_template_part('template-parts/lightbox') ?>
<?php wp_footer(); ?>
</body>
</html>