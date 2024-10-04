import React, { useState } from 'react';
import { Button, Card, Checkbox, Form, Space } from "antd";
import { __ } from "@wordpress/i18n";
import { useDispatch } from 'react-redux';
import { searchProducts } from '../../services/apiService';

const SearchProducts = () => {

    const dispatch = useDispatch();
    const [form] = Form.useForm();

    // State to track the checkbox selections
    const [filters, setFilters] = useState({
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
    });

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
    const onFinish = () => {
        // Filter out unchecked statuses
        const stock_status = Object.keys(filters.stock_status).filter(key => filters.stock_status[key]);
        const product_status = Object.keys(filters.product_status).filter(key => filters.product_status[key]);

        const params = {};
        if (stock_status.length > 0) params.stock_status = stock_status;
        if (product_status.length > 0) params.product_status = product_status;

        // Dispatch the searchProducts action with dynamic params
        dispatch(searchProducts(params));
    };

    return (
        <Card title="Delete by Filter">
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
                    <Button type="primary" htmlType="submit" loading={false}>
                        { __( 'Search', 'delete-all-products' ) }
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default SearchProducts;