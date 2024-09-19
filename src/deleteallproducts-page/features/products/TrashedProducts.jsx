import React, { useRef, useState } from 'react';
import { Button, Card, Col, Modal, Progress, Row, Space } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { __ } from "@wordpress/i18n";
import { restoreProducts } from '../../services/apiService';
import { useDispatch, useSelector } from 'react-redux';
const { confirm } = Modal;

const TrashedProducts = () => {

    const dispatch = useDispatch();
    const { isProductsStatLoading, isRestoringInProgress, productsTrash } = useSelector((state) => state.products);
    const DELETE_PRODUCTS_PER_REQUEST = 10;

    const [totalProducts, setTotalProducts] = useState(0);
    const [totalRestored, setTotalRestored] = useState(0);
    const [displayRestoringProgressBar, setDisplayRestoringProgressBar] = useState(false);
    const [displayStopButton, setDisplayStopButton] = useState(false);

    // Use useRef for cancellation state
    const isRestoringCancelled = useRef(false);

    const handleRestoreAllProducts = async () => {

        let totalRestored = 0;
        let totalProducts = productsTrash;

        setTotalRestored(totalRestored);
        setTotalProducts(totalProducts);
        setDisplayStopButton( true );
        setDisplayRestoringProgressBar(true);
        isRestoringCancelled.current = false; // Reset cancellation state before starting

        while (totalRestored < totalProducts) {
            if (isRestoringCancelled.current) {
                break; // Exit the loop if trashing is cancelled
            }

            try {
                let response = await dispatch(restoreProducts({ limit: DELETE_PRODUCTS_PER_REQUEST }));
                totalRestored += response.payload.total_restored;
                totalProducts = totalRestored + response.payload.stat.trash;

                setTotalRestored(totalRestored);
                setTotalProducts(totalProducts);
            } catch (error) {
                console.error('Error trashing products:', error);
                break; // Exit the loop in case of an error
            }
        }

        setDisplayStopButton( false );
    };

    const showDeletePermanentlyConfirm = () => {
        confirm({
            title: 'Delete Confirmation',
            icon: <ExclamationCircleFilled />,
            content: 'Do you want to delete all the trashed products permanently?',
            okText: 'Yes',
            okButtonProps: {
                danger: true,
            },
            onOk() {
                console.log('OK');
            },
            cancelText:'No',
            onCancel() {
                console.log('Cancel');
            },
            closable: true,
            maskClosable: true,
        });
    }
    
    const showRestoreTrashConfirm = () => {
        confirm({
            title: 'Restore Confirmation',
            icon: <ExclamationCircleFilled />,
            content: 'Do you want to restore all the trashed products?',
            okText: 'Yes',
            onOk() {
                handleRestoreAllProducts();
            },
            cancelText:'No',
            onCancel() {
                console.log('Cancel');
            },
            closable: true,
            maskClosable: true,
        });
    }

    const renderTrashAllProgress = () => {
        if (displayRestoringProgressBar) {
            let percent = Math.round((totalRestored / totalProducts) * 100);
            return (
                <>
                    <b>{`Restored ${totalRestored} product(s) out of ${totalProducts}`}</b>
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

    const handleStop = () => {
        isRestoringCancelled.current = true; // Set cancellation state to true
        setDisplayStopButton( false );
    };

    const renderInfo = () => {
        if( productsTrash > 0 && !isRestoringInProgress) {
            return <>{productsTrash} product(s) found in the trash</>
        }else if( !productsTrash && !isRestoringInProgress ){
            return <>No products found in the trash</>
        }
        return null;
    }

    const renderRestoreTrashButton = () => {
        if( productsTrash > 0 ) {
            return <Button type="primary" onClick={showRestoreTrashConfirm} loading={isRestoringInProgress} disabled={isProductsStatLoading}>
                Restore Trash
            </Button>
        }
        return null;
    }

    const renderStopButton = () => {
        if( displayStopButton ){
            return <Button type="default" onClick={handleStop}>
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
                        {/* 7 Products found in the trash */}
                        {renderTrashAllProgress()}
                        {renderInfo()}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Space>
                            {/* <Button type="primary" danger onClick={showDeletePermanentlyConfirm} loading={false}>
                                Delete Permanently
                            </Button> */}

                            {renderRestoreTrashButton()}
                            {renderStopButton()}
                        </Space>
                    </Col>
                </Row>
            </Space>
        </Card>
    );
}

export default TrashedProducts;