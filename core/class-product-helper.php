<?php
/**
 * Product Helper.
 */

namespace DAPRODS\Core;

class ProductHelper {
	/**
	 * Get the count of all products by status.
	 *
	 * @return array
	 */
	public static function get_product_stat() {
		// Get the count of all products by status
		$product_counts = wp_count_posts( 'product' );

		// Sanitize the product counts
		$products_all  = intval( $product_counts->publish ) + intval( $product_counts->pending ) + intval( $product_counts->draft ) + intval( $product_counts->private );
		$trashed_count = intval( $product_counts->trash );

		// Prepare and return the stat
		$stat = array(
			'all'   => rest_sanitize_value_from_schema( $products_all, array( 'type' => 'integer' ) ),
			'trash' => rest_sanitize_value_from_schema( $trashed_count, array( 'type' => 'integer' ) ),
		);

		return $stat;
	}
}
