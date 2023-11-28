<?php

if (!class_exists('Mota\Mota')) {
    require_once(get_template_directory() . '/vendor/autoload.php');
}

new Mota\Mota();
new \Mota\Settings();