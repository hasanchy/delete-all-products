import React from 'react';
import { Alert, Button, Card, Col, Image, Row, Space, Typography } from "antd";
import { CheckCircleOutlined } from '@ant-design/icons';
import { __ } from "@wordpress/i18n";

const SearchProducts = () => {
    
    return (
        <Card title="Delete Products By Filters">
            <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                <Alert
                    description={<>{__( 'Product deletion with filters is available in the', 'delete-all-products' )} <b><a href='https://woocommerce.com/products/product-cleaner-for-woocommerce/' target='_blank'>{__( 'Pro version', 'delete-all-products' )}</a></b> {__( 'of the plugin.', 'delete-all-products' )}</>}
                    type="info"
                />
                <Row gutter={20}>
                    <Col span={16} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <a href='https://woocommerce.com/products/product-cleaner-for-woocommerce/' target='_blank'>
                            <Image
                                preview={false}
                                src={window.daprodsDeleteAllProducts.filtersImageSrc} 
                                alt="Product Cleaner" style={{ width: '100%', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 1px 2px -2px rgba(0, 0, 0, 0.16),0 3px 6px 0 rgba(0, 0, 0, 0.12),0 5px 12px 4px rgba(0, 0, 0, 0.09)' }}
                                
                            /> 
                        </a>
                    </Col>
                    <Col span={8} style={{ display: 'flex'}}>
                        <Space size={15} direction="vertical" style={{ width: '100%' }}>
                            <div><Typography.Title level={4} style={{marginTop: 0}}>{__( 'Upgrade to Product Cleaner for WooCommerce', 'delete-all-products' )}</Typography.Title></div>
                            <div>{__( 'With Product Cleaner for WooCommerce, you can effortlessly filter, delete, or trash WooCommerce products in bulk while tracking progress in real time for a seamless cleanup experience.', 'delete-all-products' )}</div>
                            <div><CheckCircleOutlined style={{ color: '#52C41A', fontSize: '18px', marginRight: '8px' }} /> <Typography.Text strong>{__( 'Delete products with or without filters', 'delete-all-products' )}</Typography.Text></div>
                            <div><CheckCircleOutlined style={{ color: '#52C41A', fontSize: '18px', marginRight: '8px' }} /> <Typography.Text strong>{__( 'Permanently delete products & images', 'delete-all-products' )}</Typography.Text></div>
                            <div><CheckCircleOutlined style={{ color: '#52C41A', fontSize: '18px', marginRight: '8px' }} /> <Typography.Text strong>{__( 'Preview before deletion', 'delete-all-products' )}</Typography.Text></div>
                            <div><CheckCircleOutlined style={{ color: '#52C41A', fontSize: '18px', marginRight: '8px' }} /> <Typography.Text strong>{__( 'Track progress in real-time', 'delete-all-products' )}</Typography.Text></div>
                            <div><CheckCircleOutlined style={{ color: '#52C41A', fontSize: '18px', marginRight: '8px' }} /> <Typography.Text strong>{__( 'Get all future updates & improvements', 'delete-all-products' )}</Typography.Text></div>
                            <div><CheckCircleOutlined style={{ color: '#52C41A', fontSize: '18px', marginRight: '8px' }} /> <Typography.Text strong>{__( 'Enjoy priority support', 'delete-all-products' )}</Typography.Text></div>
                            <div style={{ width: '100%', textAlign: 'center' }}>
                                <Button
                                    key="link"
                                    href="https://woocommerce.com/products/product-cleaner-for-woocommerce/"
                                    type="primary"
                                    style={{ marginTop: '20px' }}
                                    target='_blank'
                                    size='large'
                                >
                                    { __( 'Upgrade Now' ) }
                                </Button>
                            </div>
                        </Space>
                    </Col>
                </Row>
            </Space>
        </Card>
    );
};

export default SearchProducts;