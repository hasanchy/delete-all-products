import React from 'react';
import { Button, Card, Col, Row, Space, Tooltip } from "antd";
import { __ } from "@wordpress/i18n";
import { useDispatch, useSelector } from 'react-redux';
import SearchProducts from './SearchProducts';
import ActionButtons from './ActionButtons';
import { fetchProductsStat } from '../../services/apiService';
import { ReloadOutlined } from '@ant-design/icons';

const AllProducts = () => {

    const dispatch = useDispatch();

    const { isProductsStatLoading, productsAll } = useSelector((state) => state.products);

    const handleRefresh = () => {
        dispatch(fetchProductsStat());
    }

    return (
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
            <Card title="Delete All Products" extra={<Tooltip placement="topLeft" title={ __( 'Reload', 'delete-all-products' ) } color={'purple'} key={'reload'}><Button type="default" icon={<ReloadOutlined/>} onClick={handleRefresh}></Button></Tooltip>}>
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