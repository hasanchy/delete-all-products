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

class ProductsTrash extends Endpoint {
	/**
	 * API endpoint for the current endpoint.
	 *
	 * @since 1.0.0
	 *
	 * @var string
	 */
	protected $endpoint = 'products/trash';

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
					'callback'            => array( $this, 'trash_products' ),
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
	public function trash_products( WP_REST_Request $request ) {
		// Sanitize the nonce header value
		$nonce = sanitize_text_field( $request->get_header( 'X-WP-NONCE' ) );
		if ( ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
			return new WP_REST_Response( 'Invalid nonce', 403 );
		}

		$args  = array(
			'post_type'      => 'product',
			'post_status'    => array( 'publish', 'pending', 'draft', 'private' ),
			'posts_per_page' => 10,
		);
		$posts = get_posts( $args );

		$total_trashed = 0;
		foreach ( $posts as $post ) {
			$product = wc_get_product( $post->ID );
			$product->delete( false );
			++$total_trashed;
		}

		// Prepare response
		$response = array(
			'total_trashed' => $total_trashed,
			'stat'          => ProductHelper::get_product_stat(),
		);

		return new WP_REST_Response( $response );
	}
}
