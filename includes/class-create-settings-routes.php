<?php
/**
 * This file will create Custom Rest API End Points.
 */
class DWP_Settings_Rest_Route {

    public function __construct() {
        add_action( 'rest_api_init', [ $this, 'create_rest_routes' ] );
    }

    public function create_rest_routes() {
        register_rest_route( 'dwp/v1', '/settings', [
            'methods' => 'GET',
            'callback' => [ $this, 'count_products' ],
            'permission_callback' => [ $this, 'get_settings_permission' ]
        ] );
        register_rest_route( 'dwp/v1', '/settings', [
            'methods' => 'POST',
            'callback' => [ $this, 'delete_products' ],
            'permission_callback' => [ $this, 'save_settings_permission' ]
        ] );

		register_rest_route( 'dwp/v1', '/delete', [
            'methods' => 'POST',
            'callback' => [ $this, 'delete_products_permanent' ],
            'permission_callback' => [ $this, 'save_settings_permission' ]
        ] );

    }

    public function get_settings() {
        $firstname = get_option( 'dwp_settings_firstname' );
        $lastname  = get_option( 'dwp_settings_lastname' );
        $email     = get_option( 'dwp_settings_email' );
        $response = [
            'firstname' => $firstname,
            'lastname'  => $lastname,
            'email'     => $email
        ];

        return rest_ensure_response( $response );
    }

    public function get_settings_permission() {
        return true;
    }

    public function save_settings( $req ) {
        $firstname = sanitize_text_field( $req['firstname'] );
        $lastname  = sanitize_text_field( $req['lastname'] );
        $email     = sanitize_text_field( $req['email'] );
        update_option( 'dwp_settings_firstname', $firstname );
        update_option( 'dwp_settings_lastname', $lastname );
        update_option( 'dwp_settings_email', $email );
        return rest_ensure_response( 'success' );
    }

	public function count_products() {
		
		$args = array(
			'post_type' => 'product',
			'posts_per_page' => -1,
		);
		$products = new WP_Query( $args );
		$total = $products->found_posts;

		$args = array(
			'post_type' => 'product',
			'post_status' => 'trash',
			'posts_per_page' => -1,
		);
		$products = new WP_Query( $args );
		$trash = $products->found_posts;
		
		$response = [
            'total' => $total,
			'trash' => $trash
        ];

        return rest_ensure_response( $response );
	}

	public function delete_products_permanent( $req ) {
		$action = sanitize_text_field( $req['action'] );

		if($action == 'permanent-delete'){
			$args = array(
				'post_type' => 'product',
				'posts_per_page' => -1,
			);
			$loop = new WP_Query( $args );
			foreach ($loop->posts as $post) {
				$product = wc_get_product($post->ID);
				$product->delete(true);
			}
		}
		
		return $this->count_products();
	}

	public function delete_products( $req ) {
		$action = sanitize_text_field( $req['action'] );

		if($action == 'delete-permanently'){
			$args = array(
				'post_type' => 'product',
				'posts_per_page' => -1,
			);
			$loop = new WP_Query( $args );
			foreach ($loop->posts as $post) {
				$product = wc_get_product($post->ID);
				$product->delete();
			}
		}else if($action == 'trash-delete'){
			$args = array(
				'post_type' => 'product',
				'post_status' => 'trash',
				'posts_per_page' => -1,
			);
			$loop = new WP_Query( $args );
			foreach ($loop->posts as $post) {
				$product = wc_get_product($post->ID);
				$product->delete(true);
			}
		}else if($action == 'restore-trash'){
			$args = array(
				'post_type' => 'product',
				'post_status' => 'trash',
				'posts_per_page' => -1,
			);
			$loop = new WP_Query( $args );
			foreach ($loop->posts as $post) {
				$post = array(
					'ID'        => $post->ID,
					'post_status' => 'publish',
				);
				wp_update_post( $post );
			}
		}else{
			$args = array(
				'post_type' => 'product',
				'posts_per_page' => -1,
			);
			$loop = new WP_Query( $args );
			foreach ($loop->posts as $post) {
				$product = wc_get_product($post->ID);
				$product->delete(false);
			}
		}
		
		return $this->count_products();
	}

    public function save_settings_permission() {
		global $dwp;
		if ( $dwp->admin->has_required_permissions() && current_user_can( 'publish_posts' )) {
			return true;
		}
        return false;
    }
}
new DWP_Settings_Rest_Route();