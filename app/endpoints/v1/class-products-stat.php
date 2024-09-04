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

class ProductsStat extends Endpoint {
	/**
	 * API endpoint for the current endpoint.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	protected $endpoint = 'products/stat';

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
					'methods'             => 'GET',
					'callback'            => array( $this, 'get_products_stat' ),
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
	public function get_products_stat( WP_REST_Request $request ) {
		$nonce = $request->get_header( 'X-WP-NONCE' );
		if ( ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
			return new WP_REST_Response( 'Invalid nonce', 403 );
		}

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

		// Prepare response
		$response = array(
			'total' => $products_total,
			'trash'    => $trashed_products_count
		);

		return new WP_REST_Response( $response );
	}

}