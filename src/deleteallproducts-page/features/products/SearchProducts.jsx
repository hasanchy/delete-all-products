import React, { useState } from 'react';
import { Alert, Button, Card, Checkbox, Col, Form, Image, Row, Space, Typography } from "antd";
import { CheckCircleOutlined } from '@ant-design/icons';
import { __ } from "@wordpress/i18n";
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../../services/apiService';
import ActionButtons from './ActionButtons';

const SearchProducts = () => {

    const dispatch = useDispatch();
    const { isProductsSearching } = useSelector((state) => state.products);
    const [form] = Form.useForm();
    const initialFiltersState = {
        stock_status: {
            instock: false,
            outofstock: false,
            onbackorder: false
        },
        product_status: {
            publish: false,
            pending: false,
            draft: false,
            private: false
        }
    };

    // State to track the checkbox selections
    const [filters, setFilters] = useState(initialFiltersState);

    const [savedFilters, setSavedFilters] = useState({});

    const [searchResult, setSearchResult] = useState(0);

    // Handle checkbox changes dynamically for stock_status and product_status
    const handleCheckboxChange = (category, key, checked) => {
        setFilters((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: checked
            }
        }));
    };

    // Handle form submission
    const onFinish = async () => {
        // Filter out unchecked statuses
        const stock_status = Object.keys(filters.stock_status).filter(key => filters.stock_status[key]);
        const product_status = Object.keys(filters.product_status).filter(key => filters.product_status[key]);

        const params = {};
        if (stock_status.length > 0) params.stock_status = stock_status;
        if (product_status.length > 0) params.product_status = product_status;

        // Dispatch the searchProducts action with dynamic params
        let response = await dispatch(searchProducts(params));
        
        setSearchResult(response.payload.search_count);

        setSavedFilters(filters);
    };

    const renderDeleteButtons = () => {
        if(JSON.stringify(filters) === JSON.stringify(savedFilters)){
            return <ActionButtons filters={filters} total={searchResult} isLoading={isProductsSearching}/>;
        }
        return false;
    } 
    
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