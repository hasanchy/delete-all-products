import React from 'react';
import { Button, Card, Col, Row, Space, Tooltip } from "antd";
import { __ } from "@wordpress/i18n";
import { useDispatch, useSelector } from 'react-redux';
import ActionButtons from './ActionButtons';
import { fetchProductsStat } from '../../services/apiService';
import { ReloadOutlined } from '@ant-design/icons';

const TrashedProducts = () => {

    const dispatch = useDispatch();

    const { isProductsStatLoading, productsTrash } = useSelector((state) => state.products);

    const handleRefresh = () => {
        dispatch(fetchProductsStat());
    }

    return (
        <Card title="Delete/Restore Products From Trash" extra={<Tooltip placement="topLeft" title={ __( 'Reload', 'delete-all-products' ) } color={'purple'} key={'reload'}><Button type="default" icon={<ReloadOutlined/>} onClick={handleRefresh}></Button></Tooltip>}>
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