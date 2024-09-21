import React, { useRef, useState } from 'react';
import { Button, Card, Col, Modal, Progress, Row, Space } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { __ } from "@wordpress/i18n";
import { deleteProducts, restoreProducts } from '../../services/apiService';
import { useDispatch, useSelector } from 'react-redux';
const { confirm } = Modal;

const TrashedProducts = () => {

    const dispatch = useDispatch();
    const { isProductsStatLoading, isRestoringInProgress, isTrashingInProgress, isDeletingInProgress, productsTrash } = useSelector((state) => state.products);
    const DELETE_PRODUCTS_PER_REQUEST = 10;

    const [totalProducts, setTotalProducts] = useState(0);
    const [totalRestored, setTotalRestored] = useState(0);
    const [displayRestoringProgressBar, setDisplayRestoringProgressBar] = useState(false);
    const [totalDeleted, setTotalDeleted] = useState(0);
    const [displayDeletingProgressBar, setDisplayDeletingProgressBar] = useState(false);
    const [isCancellingInProgress, setIsCancellingInProgress] = useState(false);
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

        setDisplayRestoringProgressBar( false );
        setIsCancellingInProgress( false );
        setDisplayStopButton( false );
    };


    const handleDeleteAllProducts = async () => {

        let totalDeleted = 0;
        let totalProducts = productsTrash;

        setTotalDeleted(totalDeleted);
        setTotalProducts(totalProducts);
        setDisplayStopButton( true );
        setDisplayDeletingProgressBar(true);
        isRestoringCancelled.current = false; // Reset cancellation state before starting

        while (totalDeleted < totalProducts) {
            if (isRestoringCancelled.current) {
                break; // Exit the loop if trashing is cancelled
            }

            try {
                let response = await dispatch(deleteProducts());
                totalDeleted += response.payload.total_deleted;
                totalProducts = totalDeleted + response.payload.stat.trash;

                setTotalDeleted(totalDeleted);
                setTotalProducts(totalProducts);
            } catch (error) {
                console.error('Error trashing products:', error);
                break; // Exit the loop in case of an error
            }
        }

        setDisplayDeletingProgressBar( false );
        setIsCancellingInProgress( false );
        setDisplayStopButton( false );
    };

    const showDeletePermanentlyConfirm = () => {
        confirm({
            title: 'Delete Confirmation',
            icon: <ExclamationCircleFilled />,
            content: 'Are you sure you want to permanently delete all the trashed products?',
            okText: 'Yes',
            okButtonProps: {
                danger: true,
            },
            onOk() {
                handleDeleteAllProducts();
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
            content: 'Are you sure you want to restore all the trashed products?',
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
                    <b>{`Restored ${totalRestored} products out of ${totalProducts}`}</b>
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

    const renderDeleteAllProgress = () => {
        if (displayDeletingProgressBar) {
            let percent = Math.round((totalDeleted / totalProducts) * 100);
            return (
                <>
                    <b>{`Deleted ${totalDeleted} products out of ${totalProducts}`}</b>
                    <Progress
                        percent={percent}
                        status="active"
                        strokeColor={{
                            from: '#ff4d4f',
                            to: '#ff4d4f',
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
        setIsCancellingInProgress( true );
    };

    const renderInfo = () => {
        if(isProductsStatLoading){
            return 'Loading...';
        }else if( productsTrash > 0 && !isRestoringInProgress && !isDeletingInProgress) {
            return <>{productsTrash} products found in the trash</>
        }else if( !productsTrash && !isRestoringInProgress ){
            return <>No products found in the trash</>
        }
        return null;
    }

    const renderDeleteButton = () => {
        if( productsTrash > 0 && !isRestoringInProgress) {
            return <Button type="primary" danger onClick={showDeletePermanentlyConfirm} loading={isDeletingInProgress} disabled={isProductsStatLoading || isTrashingInProgress}>
                Delete Permanently
            </Button>
        }
        return null;
    }

    const renderRestoreTrashButton = () => {
        if( productsTrash > 0 && !isDeletingInProgress) {
            return <Button type="primary" onClick={showRestoreTrashConfirm} loading={isRestoringInProgress} disabled={isProductsStatLoading || isTrashingInProgress}>
                Restore Trash
            </Button>
        }
        return null;
    }

    const renderStopButton = () => {
        if( displayStopButton ){
            return <Button type="default" onClick={handleStop} loading={isCancellingInProgress}>
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
                        {renderDeleteAllProgress()}
                        {renderInfo()}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Space>
                            {renderDeleteButton()}
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