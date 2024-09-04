import { __ } from '@wordpress/i18n';

const Header = () => {
    return (<h1 style={{ fontFamily: 'Trebuchet MS',fontWeight:600, fontSize: '28px', marginBottom: '10px' }}><span style={{ color: '#eda93a' }}>{ __( 'Delete All Products', 'delete-all-products' ) }</span> <span style={{ color: '#674399' }}>{ __( 'for WooCommerce', 'delete-all-products' ) }</span></h1>);
}

export default Header;