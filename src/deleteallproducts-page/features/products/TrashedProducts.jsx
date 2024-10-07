import React from 'react';
import { Card, Col, Row, Space } from "antd";
import { __ } from "@wordpress/i18n";
import { useSelector } from 'react-redux';
import ActionButtons from './ActionButtons';

const TrashedProducts = () => {

    const { isProductsStatLoading, productsTrash } = useSelector((state) => state.products);

    return (
        <Card>
            <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                <Row>
                    <Col span={24}>
                        <ActionButtons filters={{ product_status: { trash: true } }} total={productsTrash} isLoading={isProductsStatLoading}/>
                    </Col>
                </Row>
            </Space>
        </Card>
    );
}

export default TrashedProducts;