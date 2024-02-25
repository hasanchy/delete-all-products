<?php
/**
 * The admin-specific functionality of the plugin.
 *
 * @package     Featured_Image_By_URL
 * @subpackage  Featured_Image_By_URL/admin
 * @copyright   Copyright (c) 2018, Knawat
 * @since       1.0.0
 */
// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * The admin-specific functionality of the plugin.
 *
 * @package     Featured_Image_By_URL
 * @subpackage  Featured_Image_By_URL/admin
 */
class DWP_Admin {

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		add_action( 'admin_init', array( $this, 'check_required_plugin' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_assets' ) );
		add_action( 'admin_menu', array( $this, 'register_admin_menus' ) );
	}

	/**
	 * Check if required plugin is available
	 */
	public function check_required_plugin() {
		// check if woocommerce is installed.
		if ( is_admin() && current_user_can( 'activate_plugins' ) && ! class_exists( 'WooCommerce' ) ) {
			add_action( 'admin_notices', array( $this, 'plugin_notice' ) );

			deactivate_plugins( DWP_PLUGIN_BASENAME );

			if ( isset( $_GET['activate'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
				unset( $_GET['activate'] ); // phpcs:ignore WordPress.Security.NonceVerification
			}
		}
	}

	/**
	 * Show plugin activation notice
	 */
	public function plugin_notice() {
		?> <div class="error"><p> <?php esc_html_e( 'Please activate Woocommerce plugin before using', 'delete-woocommerce-products' ); ?> <strong><?php esc_html_e( 'Delete Woocommerce Products', 'delete-woocommerce-products' ); ?></strong> <?php esc_html_e( 'plugin', 'delete-woocommerce-products' ); ?>.</p></div>
		<?php
	}

	/**
	 * Enqueue CSS and JS files
	 *
	 * @param [String] $hook Standard WordPress hook.
	 */
	public function enqueue_assets( $hook ) {
		if ( 'product_page_dwp-page' !== $hook ) {
			return;
		}

		// Stylesheets.
		wp_register_style( 'dwp_css', ( DWP_PLUGIN_URL . 'build/scripts.css' ), false, wp_rand() );
		wp_enqueue_style( 'dwp_css' );

		// Javascripts.
		wp_register_script( 'dwp_js', ( DWP_PLUGIN_URL . 'build/scripts.js' ), [ 'wp-element' ], wp_rand(), true );
		wp_localize_script(
			'dwp_js',
			'appLocalizer',
			[
				'apiUrl' => home_url( '/wp-json' ),
				'nonce' => wp_create_nonce( 'wp_rest' ),
			]
		);
		wp_enqueue_script( 'dwp_js' );
	}

	/**
	 * Register Admin Menus
	 */
	public function register_admin_menus() {
		if ( $this->has_required_permissions() ) {
			$user = wp_get_current_user();
			$role = (array) $user->roles;
			if ( in_array( 'administrator', $role, true ) ) {
				$this->add_pages( 'manage_options' );
			} elseif ( in_array( 'shop_manager', $role, true ) ) {
				$this->add_pages( 'shop_manager' );
			} elseif ( current_user_can( 'manage_woocommerce' ) ) {
				$this->add_pages( 'manage_woocommerce' );
			}
		}
	}

	/**
	 * Add page to admin menu
	 *
	 * @param [String] $role Current User role.
	 */
	public function add_pages( $role ) {
		add_submenu_page(
			'edit.php?post_type=product',
			__( 'Delete Products', 'delete-woocommerce-products' ),
			__( 'Delete Products', 'delete-woocommerce-products' ),
			$role,
			'dwp-page',
			array( $this, 'add_pages_callback' )
		);
	}

	/**
	 * Callback to add_page
	 */
	public function add_pages_callback() {
		echo '<div class="wrap"><div id="dwp-admin-app"></div></div>';
	}

	/**
	 * Check if user have permissions
	 */
	public function has_required_permissions() {
		if ( is_user_logged_in() ) {
			$user = wp_get_current_user();
			$role = (array) $user->roles;
			if ( in_array( 'administrator', $role, true ) || in_array( 'shop_manager', $role, true ) || current_user_can( 'manage_woocommerce' ) ) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
}