import React, { useState } from 'react';
import { Button, Card, Col, Modal, Progress, Row, Space } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { __ } from "@wordpress/i18n";
import { useDispatch, useSelector } from 'react-redux';
import { trashProducts } from '../../services/apiService';
import { setIsProductsTrashing } from './productsSlice'
const { confirm } = Modal;

const AllProducts = () => {

    const dispatch = useDispatch();
    const { isProductsStatLoading, isProductsTrashing, allProducts, trashedProducts } = useSelector((state) => state.products);
    const DELETE_PRODUCTS_PER_REQUEST = 1;

    // const [percent, setPercent] = useState(0);
    const [isProductsTrashStarted, setIsProductsTrashStarted] = useState(false);
    const [progressNumber, setProgressNumber] = useState(0);
    const [progressTotal, setProgressTotal] = useState(allProducts);
    const percent = Math.round((progressNumber/progressTotal) * 100);

    const handleTrashAllProducts = async () => {
        
        let totalTrashed = 0;
        let totalProducts = allProducts;

        setIsProductsTrashStarted( true );

        while( totalTrashed < totalProducts ){
            let response = await dispatch(trashProducts( {limit: DELETE_PRODUCTS_PER_REQUEST} ));
            totalTrashed += response.payload.total_trashed;
            totalProducts = totalTrashed + response.payload.stat.total;
            setProgressNumber( totalTrashed );
            setProgressTotal( totalProducts );
        }
        
    };

    const showMoveToTrashConfirm = () => {
        confirm({
            title: 'Trash Confirmation',
            icon: <ExclamationCircleFilled />,
            content: 'Do you want to trash all the products?',
            okText: 'Yes',
            onOk() {
                handleTrashAllProducts()
            },
            cancelText:'No',
            onCancel() {
                console.log('Cancel');
            },
            closable: true,
            maskClosable: true,
        });
    };

    const renderTrashAllProgress = () => {
        if(isProductsTrashStarted){
            return <Row>
                <Col span={24}>
                    <b>{`Deleted ${progressNumber} product(s) out of ${progressTotal}`}</b>
                    <Progress
                        percent={percent}
                        status="active"
                        strokeColor={{
                            from: '#531dab',
                            to: '#531dab',
                        }}
                        showInfo={true} 
                    />
                </Col>
            </Row>
        };
        return null;
    }

    const stopMoveToTrash = () => {
        setIsProductsTrashStarted( false );
    }

    return (
        <Card>
            <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                {renderTrashAllProgress()}
                <Row>
                    <Col>
                        <Space>
                            <Button type="primary" onClick={showMoveToTrashConfirm} loading={isProductsTrashing} disabled={isProductsStatLoading}>
                                Move To Trash
                            </Button>
                            <Button type="default" onClick={stopMoveToTrash}>
                                Stop
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Space>
        </Card>
    );
}

export default AllProducts;