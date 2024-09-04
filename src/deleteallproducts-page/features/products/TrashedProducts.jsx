import React, { useState } from 'react';
import { Button, Card, Col, Modal, Row, Space } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { __ } from "@wordpress/i18n";
const { confirm } = Modal;

const TrashedProducts = () => {
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

    return (
        <Card>
            <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                <Row>
                    <Col>
                        7 Products found in the trash
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Space>
                            <Button type="primary" danger onClick={showDeletePermanentlyConfirm} loading={false}>
                                Delete Permanently
                            </Button>

                            <Button type="primary" onClick={showRestoreTrashConfirm} loading={false}>
                                Restore Trash
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Space>
        </Card>
    );
}

export default TrashedProducts;