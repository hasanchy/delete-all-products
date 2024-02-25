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
if (defined('DAP_PATH')) {
    require_once dirname(__FILE__) . '/inc/base/others/fallback-already.php';
    return;
}

define('DAP_FILE', __FILE__);
define('DAP_PATH', dirname(DAP_FILE));
define('DAP_SLUG', basename(DAP_PATH));
define('DAP_INC', DAP_PATH . '/inc/');
define('DAP_MIN_PHP', '7.2.0'); // Minimum of PHP 7.2 required for autoloading and namespacing
define('DAP_MIN_WP', '5.2.0'); // Minimum of WordPress 5.0 required
define('DAP_NS', 'DAP');
define('DAP_IS_PRO', false);
define('DAP_SLUG_LITE', 'delete-wordpress-products');
define('DAP_SLUG_PRO', 'delete-wordpress-products-pro');

// Check PHP Version and print notice if minimum not reached, otherwise start the plugin core
require_once DAP_INC .
    'base/others/' .
    (version_compare(phpversion(), DAP_MIN_PHP, '>=') ? 'start.php' : 'fallback-php-version.php');