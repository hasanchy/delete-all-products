import { __ } from '@wordpress/i18n';
import { Button, Col, Row } from 'antd';

const Header = () => {
    return (
        <Row>
            <Col span={12}>
                <h1 style={{ fontFamily: 'Trebuchet MS',fontWeight:600, fontSize: '28px', marginBottom: '10px' }}>
                    <span style={{ color: '#ff4d4f' }}>{ __( 'Delete All', 'delete-all-products' ) } </span> 
                    <span style={{ color: '#674399' }}>{ __( 'Products', 'delete-all-products' ) }</span>
                </h1>
            </Col>
            <Col span={12} style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                <Button
                    key="link"
                    href="https://woocommerce.com/products/product-cleaner-for-woocommerce/"
                    type="primary"
                    target='_blank'
                    style={{ marginRight: '10px' }}
                >
                    { __( 'Upgrade to Pro' ) }
                </Button>
            </Col>
        </Row>
    );
}

export default Header;