import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Modal, Progress, Row, Space, Card, Alert, Spin } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { __ } from "@wordpress/i18n";
import { useDispatch, useSelector } from 'react-redux';
import { deleteProducts, restoreProducts, trashProducts } from '../../services/apiService';
const { confirm } = Modal;

const ActionButtons = ( {filters, total, isLoading} ) => {
    const dispatch = useDispatch();
    const productStatus = filters.product_status?.trash ? 'trash' : 'all';
    const hasFilters = Object.keys(filters).length > 1 ? true : false; 

    const [isOperationInProgress, setIsOperationInProgress] = useState(false);

    const [totalProducts, setTotalProducts] = useState(0);
    const [totalExecuted, setTotalExecuted] = useState(0);
    const [displayProgressBar, setDisplayProgressBar] = useState(false);
    const [isDeleteCancellingInProgress, setIsDeleteCancellingInProgress] = useState(false);
    const [displayStopButton, setDisplayStopButton] = useState(false);
    const [searchResult, setSearchResult] = useState(total);

    // Use useRef for cancellation state
    const isOperationCancelled = useRef(false);
    const operationType = useRef('');

    // useEffect to update searchResult when total changes
    useEffect(() => {
        setSearchResult(total);
    }, [total]);

    const handleProductsOperation = async ( type ) => {

        operationType.current = type;
        setIsOperationInProgress(true);

        let totalExecuted = 0;
        let searchCount = searchResult;
        let totalProducts = searchResult;

        setTotalExecuted(totalExecuted);
        setTotalProducts(totalProducts);
        setDisplayStopButton( true );
        setDisplayProgressBar(true);
        isOperationCancelled.current = false; // Reset cancellation state before starting

        // Filter out unchecked statuses
        const stock_status = filters.stock_status ? Object.keys(filters.stock_status).filter(key => filters.stock_status[key]) : [];
        const product_status = filters.product_status ? Object.keys(filters.product_status).filter(key => filters.product_status[key]) : [];

        const params = {};
        if (stock_status.length > 0) params.stock_status = stock_status;
        if (product_status.length > 0) params.product_status = product_status;

        while (totalExecuted < totalProducts) {
            if (isOperationCancelled.current) {
                break; // Exit the loop if trashing is cancelled
            }

            try {
                let response;
                if(type === 'delete_permanently' ){
                    response = await dispatch(deleteProducts(params));
                }else if(type === 'move_to_trash') {
                    response = await dispatch(trashProducts(params));
                }else if(type === 'restore_trash') {
                    response = await dispatch(restoreProducts(params));
                }
                searchCount = response.payload?.search_count;
                totalExecuted += response.payload?.total;
                totalProducts = totalExecuted + searchCount;

                setTotalExecuted(totalExecuted);
                setTotalProducts(totalProducts);
                setSearchResult(searchCount);
            } catch (error) {
                console.error('Error trashing products:', error);
                break; // Exit the loop in case of an error
            }
        }

        setDisplayProgressBar( false );
        setIsDeleteCancellingInProgress( false );
        setDisplayStopButton( false );
        setIsOperationInProgress(false);
        operationType.current = '';
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
                handleProductsOperation( 'delete_permanently' );
            },
            cancelText:'No',
            onCancel() {
                console.log('Cancel');
            },
            closable: true,
            maskClosable: true,
        });
    }

    const showMoveToTrashConfirm = () => {
        confirm({
            title: 'Trash Confirmation',
            icon: <ExclamationCircleFilled />,
            content: 'Are you sure you want to move all the products to the trash?',
            okText: 'Yes',
            onOk() {
                handleProductsOperation( 'move_to_trash' );
            },
            cancelText: 'No',
            onCancel() {
                console.log('Cancel');
            },
            closable: true,
            maskClosable: true,
        });
    };

    const showRestoreTrashConfirm = () => {
        confirm({
            title: 'Restore Confirmation',
            icon: <ExclamationCircleFilled />,
            content: 'Are you sure you want to restore all the trashed products?',
            okText: 'Yes',
            onOk() {
                handleProductsOperation( 'restore_trash' );
            },
            cancelText:'No',
            onCancel() {
                console.log('Cancel');
            },
            closable: true,
            maskClosable: true,
        });
    }

    const handleStop = () => {
        isOperationCancelled.current = true; // Set cancellation state to true
        setIsDeleteCancellingInProgress( true );
    };

    const renderDeleteButton = () => {
        if( searchResult > 0 && operationType.current !== 'move_to_trash' && operationType.current !== 'restore_trash' ) {
            return <Button type="primary" danger onClick={showDeletePermanentlyConfirm} loading={isOperationInProgress} disabled={false}>
                Delete Permanently
            </Button>
        }
        return null;
    }

    const renderMoveToTrashButton = () => {
        if( productStatus === 'all' && searchResult > 0 && operationType.current !== 'delete_permanently') {
            return <Button type="primary" onClick={showMoveToTrashConfirm} loading={isOperationInProgress} disabled={false}>
                Move to Trash
            </Button>
        }
        return null;
    }

    const renderRestoreTrashButton = () => {
        if( productStatus === 'trash' && searchResult > 0 && operationType.current !== 'delete_permanently') {
            return <Button type="primary" onClick={showRestoreTrashConfirm} loading={isOperationInProgress} disabled={false}>
                Restore Trash
            </Button>
        }
        return null;
    }

    const renderStopButton = () => {
        if( displayStopButton ){
            return <Button type="default" onClick={handleStop} loading={isDeleteCancellingInProgress}>
                Stop
            </Button>
        }
        return null;
    }

    const renderProgressBar = () => {
        if (displayProgressBar) {
            let percent = Math.round((totalExecuted / totalProducts) * 100);
            let deleted;
            let progressBarColor;

            if( operationType.current === 'delete_permanently' ){
                deleted = 'Deleted';
                progressBarColor = '#ff4d4f';
            }else if( operationType.current === 'move_to_trash' ){
                deleted = 'Trashed';
                progressBarColor = '#531dab';
            }else{
                deleted = 'Restored';
                progressBarColor = '#531dab';
            }

            return (
                <>
                    <b>{`${deleted} ${totalExecuted} out of ${totalProducts} products.`}</b>
                    <Progress
                        percent={percent}
                        status="active"
                        strokeColor={{
                            from: progressBarColor,
                            to: progressBarColor,
                        }}
                        showInfo={true}
                    />
                </>
            );
        }
        return null;
    };

    const renderSearchResult = () => {
        if (!displayProgressBar) {
            let description;
            if(searchResult === 1 ){
                description = `A total of ${searchResult} product was found.`;
            }else if(searchResult > 1){
                description = `A total of ${searchResult} products were found.`;
            }else{
                description = `No products were found.`;
            }
            
            let alertType; 
            
            if( productStatus === 'all' ){
                alertType = hasFilters ? 'warning' : 'error';
            }else{
                alertType = 'info';
            }

            return <Alert
                description={description}
                type={alertType}
                showIcon={false}
            />;
        }
        return null;
    }

    if(!isLoading){
        return (
            <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                <Row>
                    <Col span={24}>
                        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                            {renderSearchResult()}
                            {renderProgressBar()}
                        </Space>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Space>
                            {renderDeleteButton()}
                            {renderMoveToTrashButton()}
                            {renderRestoreTrashButton()}
                            {renderStopButton()}
                        </Space>
                    </Col>
                </Row>
            </Space>
        );
    }else{
        const contentStyle = {
            padding: 50,
            background: 'rgba(0, 0, 0, 0.05)',
            borderRadius: 4,
          };
          const content = <div style={contentStyle} />;
          
        return <Spin tip="Loading">
        {content}
      </Spin>
    }
};

export default ActionButtons;