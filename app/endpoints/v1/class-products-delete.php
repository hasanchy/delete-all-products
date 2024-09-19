<?php
/**
 * Products Endpoint.
 */

namespace DAPRODS\App\Endpoints\V1;

// Avoid direct file request
defined( 'ABSPATH' ) || die( 'No direct access allowed!' );

use DAPRODS\Core\Endpoint;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;
use WP_Query;

class ProductsDelete extends Endpoint {
	/**
	 * API endpoint for the current endpoint.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	protected $endpoint = 'products/delete';

	/**
	 * Register the routes for handling products functionality.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public function register_routes() {
		register_rest_route(
			$this->get_namespace(),
			$this->get_endpoint(),
			array(
				array(
					'methods'             => 'DELETE',
					'callback'            => array( $this, 'delete_products' ),
					'permission_callback' => array( $this, 'edit_permission' ),
				),
			)
		);
	}

	/**
	 * Handle the request to get products.
	 *
	 * @param WP_REST_Request $request The request object.
	 * @return WP_REST_Response|WP_Error
	 * @since 1.0.0
	 */
	public function delete_products( WP_REST_Request $request ) {
		$nonce = $request->get_header( 'X-WP-NONCE' );
		if ( ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
			return new WP_REST_Response( 'Invalid nonce', 403 );
		}

		$args = array(
			'post_type' => 'product',
			'post_status' => 'trash',
			'posts_per_page' => 10,
		);
		$posts = get_posts( $args );

		$total_deleted = 0;
		foreach ($posts as $post) {
			$product = wc_get_product($post->ID);
			$product->delete(true);
			$total_deleted++;
		}

		// Prepare response
		$response = array(
			'total_deleted'    => $total_deleted,
			'stat'			   => $this->get_product_stat()
		);

		return new WP_REST_Response( $response );
	}

	public function get_product_stat(){
		$args = array(
            'post_type'   => 'product',
            'posts_per_page' => -1, // Retrieve all products
        );
		$products = get_posts( $args );
		$products_all = count($products);

        $args = array(
            'post_type'   => 'product',
            'post_status' => 'trash',
            'posts_per_page' => -1, // Retrieve all trashed products
        );
        
        $trashed_products = get_posts( $args );
        $trashed_products_count = count($trashed_products);

		// Prepare response
		return array(
			'all' => $products_all,
			'trash'    => $trashed_products_count
		);
	}
}
