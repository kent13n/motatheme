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
<?php wp_footer(); ?>
</body>
</html>