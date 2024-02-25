<?php
/**
 * Plugin Name: Delete Woocommerce Products
 * Plugin URI: https://wordpress.org/plugins/delete-woocommerce-products/
 * Description: A WordPress plugin to Delete Woocommerce Products listed on the Shop page
 * Version: 1.0.0
 * Author: Hasan Chowdhury
 * Author URI: https://auburnforest.com/
 * Developer: Hasan Chowdhury
 * Developer URI: https://auburnforest.com/
 * Text Domain:  delete-woocommerce-products
 *
 * License: GNU General Public License v3.0
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 *
 */


if( ! defined( 'ABSPATH' ) ) : exit(); endif; // No direct access allowed.
add_filter( 'plugin_action_links_' . plugin_basename(__FILE__), 'add_action_links' );

function add_action_links ( $actions ) {
	$delete_link = sprintf('<a href="%s">%s</a>', admin_url('edit.php?post_type=product&page=dwp-page'), __('Delete Products', 'wooazon-settings'));
   	array_unshift($actions, $delete_link);

   	return $actions;
}

if ( ! class_exists( 'DeleteWooProducts' ) ) {
	/**
	 * Main plugin class
	 */
	class DeleteWooProducts {

		private static $instance;

		public static function instance() {
			if( ! isset( self::$instance ) && ! (self::$instance instanceof DeleteWooProducts ) ) {
				self::$instance = new DeleteWooProducts;
				self::$instance->setup_constants();

				self::$instance->includes();
				self::$instance->admin  = new DWP_Admin();
				self::$instance->route = new DWP_Settings_Rest_Route();
			}
			return self::$instance;
		}

		private function includes() {
			require_once DWP_PLUGIN_DIR . 'includes/class-dwp-admin.php';
			require_once DWP_PLUGIN_DIR . 'includes/class-create-settings-routes.php';
		}

		private function setup_constants() {

			// Plugin version.
			if( ! defined( 'DWP_VERSION' ) ){
				define( 'DWP_VERSION', '1.0.0' );
			}

			// Plugin basename.
			if( ! defined( 'DWP_PLUGIN_BASENAME' ) ){
				define( 'DWP_PLUGIN_BASENAME', plugin_basename(__FILE__) );
			}

			// Plugin folder Path.
			if( ! defined( 'DWP_PLUGIN_DIR' ) ){
				define( 'DWP_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
			}

			// Plugin folder URL.
			if( ! defined( 'DWP_PLUGIN_URL' ) ){
				define( 'DWP_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
			}

			// Plugin root file.
			if( ! defined( 'DWP_PLUGIN_FILE' ) ){
				define( 'DWP_PLUGIN_FILE', __FILE__ );
			}

			// Options
			if( ! defined( 'DWP_OPTIONS' ) ){
				define( 'DWP_OPTIONS', 'wooazon_options' );
			}

		}

		/**
		 * Setup Hooks
		 */
		public function setup_actions() {

			add_action( 'admin_init', array( $this, 'check_required_plugin' ) );
			add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
			add_action( 'admin_menu', array( $this, 'register_admin_menus' ) );

		}

	}

	function run_dwp() {
		return DeleteWooProducts::instance();
	}

	$GLOBALS['dwp'] = run_dwp();
}