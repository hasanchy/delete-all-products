import React, { useState, useRef } from 'react';
import { Button, Card, Col, Modal, Progress, Row, Space } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { __ } from "@wordpress/i18n";
import { useDispatch, useSelector } from 'react-redux';
import { trashProducts } from '../../services/apiService';
const { confirm } = Modal;

const AllProducts = () => {

    const dispatch = useDispatch();
    const { isProductsStatLoading, productsAll, isTrashingInProgress, isRestoringInProgress, isDeletingInProgress } = useSelector((state) => state.products);

    const [totalProducts, setTotalProducts] = useState(0);
    const [totalTrashed, setTotalTrashed] = useState(0);
    const [displayTrashingProgressBar, setDisplayTrashingProgressBar] = useState(false);
    const [isTrashCancellingInProgress, setIsTrashCancellingInProgress] = useState(false);
    const [displayStopButton, setDisplayStopButton] = useState(false);

    // Use useRef for cancellation state
    const isTrashingCancelled = useRef(false);

    const handleTrashAllProducts = async () => {

        let totalTrashed = 0;
        let totalProducts = productsAll;

        setTotalTrashed(totalTrashed);
        setTotalProducts(totalProducts);
        setDisplayStopButton( true );
        setDisplayTrashingProgressBar(true);
        isTrashingCancelled.current = false; // Reset cancellation state before starting

        while (totalTrashed < totalProducts) {
            if (isTrashingCancelled.current) {
                break; // Exit the loop if trashing is cancelled
            }

            try {
                let response = await dispatch(trashProducts());
                totalTrashed += response.payload.total_trashed;
                totalProducts = totalTrashed + response.payload.stat.all;

                setTotalTrashed(totalTrashed);
                setTotalProducts(totalProducts);
            } catch (error) {
                console.error('Error trashing products:', error);
                break; // Exit the loop in case of an error
            }
        }

        setDisplayTrashingProgressBar( false );
        setIsTrashCancellingInProgress( false );
        setDisplayStopButton( false );
    };

    const showMoveToTrashConfirm = () => {
        confirm({
            title: 'Trash Confirmation',
            icon: <ExclamationCircleFilled />,
            content: 'Are you sure you want to move all the products to the trash?',
            okText: 'Yes',
            onOk() {
                handleTrashAllProducts();
            },
            cancelText: 'No',
            onCancel() {
                console.log('Cancel');
            },
            closable: true,
            maskClosable: true,
        });
    };

    const renderTrashAllProgress = () => {
        if (displayTrashingProgressBar) {
            let percent = Math.round((totalTrashed / totalProducts) * 100);
            return (
                <>
                    <b>{`Trashed ${totalTrashed} out of ${totalProducts} products.`}</b>
                    <Progress
                        percent={percent}
                        status="active"
                        strokeColor={{
                            from: '#531dab',
                            to: '#531dab',
                        }}
                        showInfo={true}
                    />
                </>
            );
        }
        return null;
    };

    const stopMoveToTrash = () => {
        isTrashingCancelled.current = true; // Set cancellation state to true
        setIsTrashCancellingInProgress( true );
    };

    const renderInfo = () => {
        if(isProductsStatLoading){
            return 'Loading...';
        }else if( productsAll > 0 && !isTrashingInProgress) {
            return <>A total of {productsAll} products were found.</>
        }else if( !productsAll && !isTrashingInProgress ){
            return <>No products were found.</>
        }
        return null;
    }

    const renderMoveToTrashButton = () => {
        if( productsAll > 0 ) {
            return <Button type="primary" onClick={showMoveToTrashConfirm} loading={isTrashingInProgress} disabled={isProductsStatLoading || isRestoringInProgress || isDeletingInProgress}>
                Move To Trash
            </Button>
        }
        return null;
    }

    const renderStopButton = () => {
        if( displayStopButton ){
            return <Button type="default" onClick={stopMoveToTrash} loading={isTrashCancellingInProgress}>
                Stop
            </Button>
        }

        return null;
    }

    return (
        <Card>
            <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                <Row>
                    <Col span={24}>
                        {renderTrashAllProgress()}
                        {renderInfo()}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Space>
                            {renderMoveToTrashButton()}
                            {renderStopButton()}
                        </Space>
                    </Col>
                </Row>
            </Space>
        </Card>
    );
};

export default AllProducts;