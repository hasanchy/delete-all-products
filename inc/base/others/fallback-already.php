<?php
defined('ABSPATH') or die('No direct access allowed!'); // Avoid direct file request

/**
 * Show an admin notice to administrators when the plugin is already active.
 */
function daprods_skip_already_admin_notice() {
    if (current_user_can('activate_plugins')) {
        echo '<div class=\'notice notice-error\'>
            <p>Currently multiple versions of the plugin <strong>Delete Wordpress Products</strong> are active. Please deactivate all versions except the one you want to use.</p>' .
            '</div>';
    }
}
add_action('admin_notices', 'daprods_skip_already_admin_notice');
