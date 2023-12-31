<?php $categories = get_terms(['taxonomy' => 'category_photo', 'orderby' => 'id']); ?>
<div class="categories" data-select="category">
    <button class="dropdown-toggle">
        <span data-placeholder="Catégories">Catégories</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M5.58909 7.74408C5.26366 7.41864 4.73602 7.41864 4.41058 7.74408C4.08514 8.06951 4.08514 8.59715 4.41058 8.92259L9.41058 13.9226C9.73602 14.248 10.2637 14.248 10.5891 13.9226L15.5891 8.92259C15.9145 8.59715 15.9145 8.06951 15.5891 7.74408C15.2637 7.41864 14.736 7.41864 14.4106 7.74408L9.99984 12.1548L5.58909 7.74408Z"
                  fill="#313144"/>
        </svg>
    </button>
    <ul class="dropdown">
        <li>
            <a data-reset href="javascript:"></a>
        </li>
        <?php foreach ($categories as $cat): ?>
            <li>
                <a data-filter="<?= $cat->slug ?>" href="<?= get_term_link($cat) ?>">
                    <?= $cat->name ?>
                </a>
            </li>
        <?php endforeach ?>
    </ul>
</div>
