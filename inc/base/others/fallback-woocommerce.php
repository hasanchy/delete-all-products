<?php
defined('ABSPATH') or die('No direct access allowed!'); // Avoid direct file request

/**
 * Show an admin notice to administrators when Woocommerce plugin is not activated. The error message is only in english available.
 */
function daprods_skip_woocommerce_notice() {
    if (current_user_can('activate_plugins') ) {
        echo '<div class=\'notice notice-error\'>
            <p>Please activate Woocommerce plugin before using <strong>Delete Woocommerce Products</strong> plugin.</p>
        </div>';
    }
}
add_action('admin_notices', 'daprods_skip_woocommerce_notice');
