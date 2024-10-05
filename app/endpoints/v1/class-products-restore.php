<?php
/**
 * Products Endpoint.
 */

namespace DAPRODS\App\Endpoints\V1;

// Avoid direct file request
defined( 'ABSPATH' ) || die( 'No direct access allowed!' );

use DAPRODS\Core\Endpoint;
use DAPRODS\Core\ProductHelper;
use WP_Error;
use WP_REST_Request;
use WP_REST_Response;

class ProductsRestore extends Endpoint {
	/**
	 * API endpoint for the current endpoint.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	protected $endpoint = 'products/restore';

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
					'methods'             => 'POST',
					'callback'            => array( $this, 'restore_products' ),
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
	public function restore_products( WP_REST_Request $request ) {
		// Sanitize the nonce header value
		$nonce = sanitize_text_field( $request->get_header( 'X-WP-NONCE' ) );
		if ( ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
			return new WP_REST_Response( 'Invalid nonce', 403 );
		}

		$args  = array(
			'post_type'      => 'product',
			'post_status'    => 'trash',
			'posts_per_page' => 10,
		);
		$posts = get_posts( $args );

		$total_restored = 0;
		foreach ( $posts as $post ) {
			$post = array(
				'ID'          => $post->ID,
				'post_status' => 'publish',
			);
			wp_update_post( $post );
			++$total_restored;
		}

		// Prepare response
		$response = array(
			'total' => $total_restored,
			'stat'           => ProductHelper::get_product_stat(),
		);

		return new WP_REST_Response( $response );
	}
}
