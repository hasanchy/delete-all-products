<?php
namespace DAPRODS\rest;

use WP_Error;
use WP_REST_Response;

\defined('ABSPATH') or die('No direct access allowed!');

/**
 * Create an example REST Service.
 */

class Service
{
    private function __construct()
    {
        // Silence is golden.
    }

    /**
     * Register endpoints.
     */
    public function rest_api_init()
    {
        \register_rest_route( 'daprods/v1', '/products/stat', [
            'methods' => 'GET',
            'callback' => [ $this, 'productsStat' ],
            'permission_callback' => [ $this, 'permission_callback' ]
        ] );
        
        \register_rest_route( 'daprods/v1', '/delete', [
            'methods' => 'POST',
            'callback' => [ $this, 'delete_trashed_products_permanently' ],
            'permission_callback' => [ $this, 'permission_callback' ]
        ] );

        \register_rest_route( 'daprods/v1', '/trash', [
            'methods' => 'POST',
            'callback' => [ $this, 'trash_products' ],
            'permission_callback' => [ $this, 'permission_callback' ]
        ] );

        register_rest_route( 'daprods/v1', '/restore', [
            'methods' => 'POST',
            'callback' => [ $this, 'restore_products' ],
            'permission_callback' => [ $this, 'permission_callback' ]
        ] );
        
    }

    public function restore_products() {

		$args = array(
			'post_type' => 'product',
			'post_status' => 'trash',
			'posts_per_page' => -1,
		);
		$posts = get_posts( $args );
		foreach ($posts as $post) {
			$post = array(
				'ID'        => $post->ID,
				'post_status' => 'publish',
			);
			wp_update_post( $post );
		}
		
		return $this->productsStat();
	}

    public function trash_products() {
		$args = array(
			'post_type' => 'product',
			'posts_per_page' => -1,
		);
		$posts = get_posts( $args );
		foreach ($posts as $post) {
			$product = wc_get_product($post->ID);
			$product->delete(false);
		}
		
		return $this->productsStat();
	}

    public function delete_trashed_products_permanently() {
		$args = array(
			'post_type' => 'product',
			'post_status' => 'trash',
			'posts_per_page' => -1,
		);
		$posts = get_posts( $args );
		foreach ($posts as $post) {
			$product = wc_get_product($post->ID);
			$product->delete(true);
		}

		return $this->productsStat();
	}

    /**
     * Check if user is allowed to call this service requests.
     */
    public function permission_callback()
    {
        $permit = \DAPRODS\rest\Service::permit();
        return $permit === null ? \true : $permit;
    }

    /**
     * See API docs.
     * @apiVersion 1.0.0
     * @apiPermission manage_categories
     */
    public function productsStat() {
		
		$args = array(
            'post_type'   => 'product',
            'posts_per_page' => -1, // Retrieve all products
        );
		$products = get_posts( $args );
		$products_total = count($products);

        $args = array(
            'post_type'   => 'product',
            'post_status' => 'trash',
            'posts_per_page' => -1, // Retrieve all trashed products
        );
        
        $trashed_products = get_posts( $args );
        $trashed_products_count = count($trashed_products);
		
		$response = [
            'total' => $products_total,
			'trash' => $trashed_products_count
        ];

        return new WP_REST_Response( $response );
	}

    /**
     * Checks if the current user has a given capability and throws an error if not.
     *
     * @param string $cap The capability
     * @throws \WP_Error
     */
    public static function permit($cap = 'publish_posts')
    {
        if (!\current_user_can($cap)) {
            return new WP_Error('rest_daprods_forbidden', \__('Forbidden'), ['status' => 403]);
        }
        if (!\daprods_is_plugin_active()) {
            return new WP_Error('rest_daprods_not_activated', \__('Delete WooCommerce Products is not active for the current user.', 'delete-all-products'), ['status' => 500]);
        }
        return null;
    }

    /**
     * New instance.
     */
    public static function instance()
    {
        return new \DAPRODS\rest\Service();
    }
}