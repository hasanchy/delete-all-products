<?php
/**
 * Main file for WordPress.
 * 
 * @wordpress-plugin
 * Plugin Name:     Delete All Products
 * Description:     Efficiently delete all WooCommerce products in just a few clicks
 * Author:          Themedyno
 * Author URI:      https://themedyno.com/
 * Version:         1.0.3
 * Text Domain:     delete-all-products
 * Domain Path:	    /languages
 *
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 */

defined('ABSPATH') or die('No direct access allowed!'); // Avoid direct file request

/**
 * Plugin constants. This file is procedural coding style for initialization of
 * the plugin core and definition of plugin configuration.
 */
if (defined('DAPRODS_PATH')) {
    require_once dirname(__FILE__) . '/inc/base/others/fallback-already.php';
    return;
}

define('DAPRODS_FILE', __FILE__);
define('DAPRODS_PATH', dirname(DAPRODS_FILE));
define('DAPRODS_SLUG', basename(DAPRODS_PATH));
define('DAPRODS_INC', DAPRODS_PATH . '/inc/');
define('DAPRODS_MIN_PHP', '7.2.0'); // Minimum of PHP 7.2 required for autoloading and namespacing
define('DAPRODS_MIN_WP', '5.2.0'); // Minimum of WordPress 5.0 required
define('DAPRODS_NS', 'DAPRODS');
define('DAPRODS_IS_PRO', false);
define('DAPRODS_SLUG_LITE', 'delete-all-products');
define('DAPRODS_SLUG_PRO', 'delete-all-products-pro');

// Check PHP Version and print notice if minimum not reached, otherwise start the plugin core
require_once DAPRODS_INC .
    'base/others/' .
    (version_compare(phpversion(), DAPRODS_MIN_PHP, '>=') ? 'start.php' : 'fallback-php-version.php');