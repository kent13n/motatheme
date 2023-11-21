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
        <?php if (has_custom_logo()): ?>
            <!-- logo -->
            <?= get_custom_logo() ?>
        <?php else : ?>
            <h2>
                <a href="/" class="custom-logo-link"
                   title="<?= esc_attr(get_bloginfo('name', 'display')) ?>"
                   rel="home">
                    <svg xmlns="http://www.w3.org/2000/svg" width="216" height="14" viewBox="0 0 216 14" fill="none">
                        <path d="M6.39518 12.4615H6.73374V0.26923H9.21658V13.7308H4.36377L2.8214 1.53846H2.48283V13.7308H0V0.26923H4.85281L6.39518 12.4615Z" fill="currentColor"/>
                        <path d="M24.0064 10.8462H19.5298L18.8903 13.7308H16.2946L19.4358 0.26923H24.1005L27.2417 13.7308H24.646L24.0064 10.8462ZM20.0565 8.42308H23.461L21.9374 1.53846H21.5989L20.0565 8.42308Z" fill="currentColor"/>
                        <path d="M34.188 0.26923H43.6679V2.69231H40.1694V13.7308H37.6866V2.69231H34.188V0.26923Z" fill="currentColor"/>
                        <path d="M51.4795 0.26923H53.9624V5.76923H58.2133V0.26923H60.6961V13.7308H58.2133V8.19231H53.9624V13.7308H51.4795V0.26923Z" fill="currentColor"/>
                        <path d="M75.486 10.8462H71.0094L70.3699 13.7308H67.7742L70.9153 0.26923H75.58L78.7212 13.7308H76.1255L75.486 10.8462ZM71.536 8.42308H74.9405L73.417 1.53846H73.0784L71.536 8.42308Z" fill="currentColor"/>
                        <path d="M86.1942 0.26923H88.6771V11.3077H94.6584V13.7308H86.1942V0.26923Z" fill="currentColor"/>
                        <path d="M103.166 0.26923H111.969V2.69231H108.809V11.3077H111.969V13.7308H103.166V11.3077H106.326V2.69231H103.166V0.26923Z" fill="currentColor"/>
                        <path d="M120.514 0.26923H128.828V2.69231H122.997V5.76923H128.602V8.19231H122.997V11.3077H129.053V13.7308H120.514V0.26923Z" fill="currentColor"/>
                        <path d="M153.705 0.26923H158.069L158.821 10.3846V12.3462H159.273V10.3846L160.025 0.26923H164.389V13.7308H162.132V4.73077L162.357 1.65385H161.906L160.928 13.7308H157.204L156.188 1.65385H155.736L155.962 4.73077V13.7308H153.705V0.26923Z" fill="currentColor"/>
                        <path d="M171.354 5.5C171.354 3.75641 171.78 2.40385 172.633 1.44231C173.498 0.480769 174.689 0 176.207 0C177.724 0 178.909 0.480769 179.762 1.44231C180.627 2.40385 181.06 3.75641 181.06 5.5V8.5C181.06 10.2949 180.627 11.6603 179.762 12.5962C178.909 13.5321 177.724 14 176.207 14C174.689 14 173.498 13.5321 172.633 12.5962C171.78 11.6603 171.354 10.2949 171.354 8.5V5.5ZM176.207 11.6923C176.658 11.6923 177.034 11.6218 177.335 11.4808C177.636 11.3269 177.881 11.1154 178.069 10.8462C178.257 10.5769 178.389 10.2564 178.464 9.88462C178.539 9.51282 178.577 9.10256 178.577 8.65385V5.34615C178.577 4.92308 178.533 4.52564 178.445 4.15385C178.357 3.78205 178.219 3.46154 178.031 3.19231C177.843 2.92308 177.599 2.71154 177.298 2.55769C176.997 2.39103 176.633 2.30769 176.207 2.30769C175.78 2.30769 175.417 2.39103 175.116 2.55769C174.815 2.71154 174.57 2.92308 174.382 3.19231C174.194 3.46154 174.056 3.78205 173.968 4.15385C173.881 4.52564 173.837 4.92308 173.837 5.34615V8.65385C173.837 9.10256 173.874 9.51282 173.95 9.88462C174.025 10.2564 174.157 10.5769 174.345 10.8462C174.533 11.1154 174.777 11.3269 175.078 11.4808C175.379 11.6218 175.755 11.6923 176.207 11.6923Z" fill="currentColor"/>
                        <path d="M188.627 0.26923H198.107V2.69231H194.608V13.7308H192.125V2.69231H188.627V0.26923Z" fill="currentColor"/>
                        <path d="M212.765 10.8462H208.288L207.649 13.7308H205.053L208.194 0.26923H212.859L216 13.7308H213.404L212.765 10.8462ZM208.815 8.42308H212.219L210.696 1.53846H210.357L208.815 8.42308Z" fill="currentColor"/>
                    </svg>
                </a>
            </h2>
        <?php endif; ?>

        <button type="button" class="hamburger">
            <span class="sr-only">Toggle Main Menu</span>
            <span></span>
        </button>

        <nav>
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
</header>
<?php wp_body_open(); ?>
