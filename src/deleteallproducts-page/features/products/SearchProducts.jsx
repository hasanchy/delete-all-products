import React, { useState } from 'react';
import { Alert, Button, Card, Checkbox, Form, Space } from "antd";
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

    const [displaySearchResult, setDisplaySearchResult] = useState(false);
    const [searchResult, setSearchResult] = useState(0);
    const [displayDeleteButtons, setDisplayDeleteButtons] = useState(false);

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
        setDisplaySearchResult(true);
        // if(response.payload.search_count > 0){
        //     setDisplayDeleteButtons(true);
        // }else{
        //     setDisplayDeleteButtons(false);
        // }

        setSavedFilters(filters);
    };

    const renderSearchResult = () => {
        if(displaySearchResult && JSON.stringify(filters) === JSON.stringify(savedFilters) ){
            let description;
            if(searchResult === 1 ){
                description = `A total of ${searchResult} product was found in this search result.`;
            }else if(searchResult > 1){
                description = `A total of ${searchResult} products were found in this search result.`;
            }else{
                description = `No products were found in this search result.`;
            }
            return <Alert
                description={description}
                type='warning'
                showIcon={false}
            />;
        }
        return null;
    }

    const renderDeleteButtons = () => {
        if(JSON.stringify(filters) === JSON.stringify(savedFilters)){
            return <ActionButtons filters={filters} total={searchResult} isLoading={isProductsSearching}/>;
        }
        return false;
    }

    return (
        <Card title="Delete by Filter">
            <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                <Form
                    name="importSettings"
                    form={form}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 20,
                    }}
                    style={{
                        maxWidth: 900,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                    disabled={false}
                >
                    <Form.Item
                        label="Stock Status"
                        name="stockStatus"
                    >
                        <Space
                            direction="vertical"
                            size="small"
                            style={{
                                display: 'flex',
                            }}
                        >
                            <Checkbox
                                onChange={(e) => handleCheckboxChange('stock_status', 'instock', e.target.checked)}
                            >
                                In stock
                            </Checkbox>
                            <Checkbox
                                onChange={(e) => handleCheckboxChange('stock_status', 'outofstock', e.target.checked)}
                            >
                                Out of stock
                            </Checkbox>
                            <Checkbox
                                onChange={(e) => handleCheckboxChange('stock_status', 'onbackorder', e.target.checked)}
                            >
                                On backorder
                            </Checkbox>
                        </Space>        
                    </Form.Item>

                    <Form.Item
                        label="Product Status"
                        name="productStatus"
                    >
                        <Space
                            direction="vertical"
                            size="small"
                            style={{
                                display: 'flex',
                            }}
                        >
                            <Checkbox
                                onChange={(e) => handleCheckboxChange('product_status', 'publish', e.target.checked)}
                            >
                                Publish
                            </Checkbox>
                            <Checkbox
                                onChange={(e) => handleCheckboxChange('product_status', 'pending', e.target.checked)}
                            >
                                Pending Review
                            </Checkbox>
                            <Checkbox
                                onChange={(e) => handleCheckboxChange('product_status', 'draft', e.target.checked)}
                            >
                                Draft
                            </Checkbox>
                            <Checkbox
                                onChange={(e) => handleCheckboxChange('product_status', 'private', e.target.checked)}
                            >
                                Private
                            </Checkbox>
                        </Space>        
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 4,
                            span: 20,
                        }}
                    >
                        <Button type="primary" htmlType="submit" loading={isProductsSearching} disabled={ JSON.stringify(initialFiltersState) === JSON.stringify(filters) }>
                            { __( 'Search', 'delete-all-products' ) }
                        </Button>
                    </Form.Item>
                </Form>
                {/* {renderSearchResult()} */}
                {renderDeleteButtons()}
            </Space>
        </Card>
    );
};

export default SearchProducts;