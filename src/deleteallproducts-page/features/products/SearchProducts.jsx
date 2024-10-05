import React, { useRef, useState } from 'react';
import { Alert, Button, Card, Checkbox, Col, Form, Modal, Progress, Row, Space } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { __ } from "@wordpress/i18n";
import { useDispatch, useSelector } from 'react-redux';
import { deleteProducts, searchProducts, trashProducts } from '../../services/apiService';
const { confirm } = Modal;

const SearchProducts = () => {

    const dispatch = useDispatch();
    const { isProductsSearching, productsSearchResult } = useSelector((state) => state.products);
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

    const [displaySearchResult, setDisplaySearchResult] = useState(false);
    const [displayDeleteButtons, setDisplayDeleteButtons] = useState(false);
    const [isProductsDeleting, setIsProductsDeleting] = useState(false);

    const [totalProducts, setTotalProducts] = useState(0);
    const [totalDeleted, setTotalDeleted] = useState(0);
    const [displayProgressBar, setDisplayProgressBar] = useState(false);
    const [isDeleteCancellingInProgress, setIsDeleteCancellingInProgress] = useState(false);
    const [displayStopButton, setDisplayStopButton] = useState(false);

    // Use useRef for cancellation state
    const isDeleteOperationCancelled = useRef(false);
    const deleteType = useRef('');

    const handleProductsDelete = async ( type ) => {

        deleteType.current = type;
        setIsProductsDeleting(true);

        let totalDeleted = 0;
        let searchCount = productsSearchResult;
        let totalProducts = productsSearchResult;

        setTotalDeleted(totalDeleted);
        setTotalProducts(totalProducts);
        setDisplayStopButton( true );
        setDisplayProgressBar(true);
        isDeleteOperationCancelled.current = false; // Reset cancellation state before starting

        // Filter out unchecked statuses
        const stock_status = Object.keys(filters.stock_status).filter(key => filters.stock_status[key]);
        const product_status = Object.keys(filters.product_status).filter(key => filters.product_status[key]);

        const params = {};
        if (stock_status.length > 0) params.stock_status = stock_status;
        if (product_status.length > 0) params.product_status = product_status;

        while (totalDeleted < totalProducts) {
            if (isDeleteOperationCancelled.current) {
                break; // Exit the loop if trashing is cancelled
            }

            try {
                let response;
                if(type === 'delete_permanently' ){
                    response = await dispatch(deleteProducts(params));
                }else{
                    response = await dispatch(trashProducts(params));
                }
                searchCount = response.payload.search_count;
                totalDeleted += response.payload.total;
                totalProducts = totalDeleted + searchCount;

                setTotalDeleted(totalDeleted);
                setTotalProducts(totalProducts);
            } catch (error) {
                console.error('Error trashing products:', error);
                break; // Exit the loop in case of an error
            }
        }

        setDisplayProgressBar( false );
        setIsDeleteCancellingInProgress( false );
        setDisplayStopButton( false );
        setIsProductsDeleting(false);
        
        if(!searchCount){
            setDisplayDeleteButtons(false);
        }
        deleteType.current = '';
    };


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
    const onFinish = async () => {
        // Filter out unchecked statuses
        const stock_status = Object.keys(filters.stock_status).filter(key => filters.stock_status[key]);
        const product_status = Object.keys(filters.product_status).filter(key => filters.product_status[key]);

        const params = {};
        if (stock_status.length > 0) params.stock_status = stock_status;
        if (product_status.length > 0) params.product_status = product_status;

        // Dispatch the searchProducts action with dynamic params
        let response = await dispatch(searchProducts(params));
        
        setDisplaySearchResult(true);
        if(response.payload.search_count > 0){
            setDisplayDeleteButtons(true);
        }else{
            setDisplayDeleteButtons(false);
        }
    };

    const renderSearchResult = () => {
        if(displaySearchResult){
            let description;
            if(productsSearchResult === 1 ){
                description = `A total of ${productsSearchResult} product was found in this search result.`;
            }else if(productsSearchResult > 1){
                description = `A total of ${productsSearchResult} products were found in this search result.`;
            }else{
                description = `No products were found in this search result.`;
            }
            return <Alert
                description={description}
                type='warning'
                showIcon={false}
            />;
        }
        return null;
    }

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
                handleProductsDelete( 'delete_permanently' );
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
                handleProductsDelete( 'move_to_trash' );
            },
            cancelText: 'No',
            onCancel() {
                console.log('Cancel');
            },
            closable: true,
            maskClosable: true,
        });
    };

    const handleStop = () => {
        isDeleteOperationCancelled.current = true; // Set cancellation state to true
        setIsDeleteCancellingInProgress( true );
    };

    const renderDeleteButton = () => {
        if( displayDeleteButtons && deleteType.current !== 'move_to_trash' ) {
            return <Button type="primary" danger onClick={showDeletePermanentlyConfirm} loading={isProductsDeleting} disabled={false}>
                Delete Permanently
            </Button>
        }
        return null;
    }

    const renderRestoreTrashButton = () => {
        if( displayDeleteButtons && deleteType.current !== 'delete_permanently') {
            return <Button type="primary" onClick={showMoveToTrashConfirm} loading={isProductsDeleting} disabled={false}>
                Move to Trash
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

    const renderTrashAllProgress = () => {
        if (displayProgressBar) {
            let percent = Math.round((totalDeleted / totalProducts) * 100);
            let deleted;
            let progressBarColor;

            if( deleteType.current === 'delete_permanently' ){
                deleted = 'Deleted';
                progressBarColor = '#ff4d4f';
            }else{
                deleted = 'Trashed';
                progressBarColor = '#531dab';
            }

            return (
                <div>
                    <b>{`${deleted} ${totalDeleted} out of ${totalProducts} products.`}</b>
                    <Progress
                        percent={percent}
                        status="active"
                        strokeColor={{
                            from: progressBarColor,
                            to: progressBarColor,
                        }}
                        showInfo={true}
                    />
                </div>
            );
        }
        return null;
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
                    <Button type="primary" htmlType="submit" loading={isProductsSearching}>
                        { __( 'Search', 'delete-all-products' ) }
                    </Button>
                </Form.Item>
            </Form>
            <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                <Row>
                    <Col span={24}>
                        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                            {renderSearchResult()}
                            {renderTrashAllProgress()}
                        </Space>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
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
};

export default SearchProducts;