import React from 'react';
import { Card, Col, Row, Space } from "antd";
import { __ } from "@wordpress/i18n";
import { useSelector } from 'react-redux';
import SearchProducts from './SearchProducts';
import ActionButtons from './ActionButtons';

const AllProducts = () => {

    const { isProductsStatLoading, productsAll } = useSelector((state) => state.products);

    return (
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Card>
                <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                    <Row>
                        <Col span={24}>
                            <ActionButtons filters={{}} total={productsAll} isLoading={isProductsStatLoading}/>
                        </Col>
                    </Row>
                </Space>
            </Card>
            
            <SearchProducts />
        </Space>
    );
};

export default AllProducts;