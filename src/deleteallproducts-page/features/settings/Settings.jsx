import { Button, Card, Form, message, Switch, Radio } from 'antd';
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteAllProductsType, setDeleteProductImages, setSettingsToastMessage } from './settingsSlice';
import { saveSettings } from '../../services/apiService';
import { __ } from '@wordpress/i18n';
import ProModal from '../../components/modal/ProModal';

const Settings = () => {
	const dispatch = useDispatch();
	const { deleteProductImages, deleteAllProductsType, isSettingsSaving, isSettingsLoading, settingsToastMessage } = useSelector((state) => state.settings);

	const [form] = Form.useForm();

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
		if(settingsToastMessage){
			message.success({
				style: {marginTop: '32px'},
				content: settingsToastMessage,
                duration: 3.5
			})
			dispatch(setSettingsToastMessage(''));
		}
	}, [settingsToastMessage])
    
    form.setFieldsValue({ 
        deleteAllProductsType,
        deleteProductImages
    });

    const onFinish = () => {
        const data = {
            'delete_all_products_type': deleteAllProductsType,
            'delete_product_images': deleteProductImages ? 'yes' : 'no'
        }
        dispatch(saveSettings(data));
    };

    const handleDeleteAllProductsType = (e) => {
        dispatch(setDeleteAllProductsType('all'));

        if(e.target.value === 'filter'){
            setIsModalOpen(true);
        }
    }

    const handleDeleteProductImages = (value) => {
        dispatch(setDeleteProductImages(false));

        if(value){
            setIsModalOpen(true);
        }
    }

    const options = [
        {
          label: __( 'Filters (Pro)', 'product-cleaner' ),
          value: 'filter',
        },
        {
          label: __( 'All', 'product-cleaner' ),
          value: 'all',
        },
    ];

    const renderProModal = () => {
        if(isModalOpen){
            return <ProModal onCancel={handleCancel}/>
        }
        return null;
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

	return (
        <Card title="Settings">
            <Form
                name="settings"
                form={form}
                labelCol={{
                    span: 10,
                }}
                wrapperCol={{
                    span: 14,
                }}
                style={{
                    maxWidth: 1000,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label={ __('Delete/Trash all products using', 'product-cleaner' ) }
                    name="deleteAllProductsType"
                >
                    <Radio.Group
                        options={options}
                        defaultValue={deleteAllProductsType}
                        optionType="button"
                        buttonStyle="solid"
                        onChange={handleDeleteAllProductsType}
                    />
                </Form.Item>
                <Form.Item
                    label={ __('Delete product images on permanent deletion (Pro)', 'product-cleaner' ) }
                    name="deleteProductImages"
                >
                    <Switch
                        checkedChildren={__('Yes', 'product-cleaner')}
                        unCheckedChildren={__('No', 'product-cleaner')}
                        defaultChecked={deleteProductImages}
                        onChange={handleDeleteProductImages}
                    />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 10,
                        span: 14,
                    }}
                >
                    <Button type="primary" htmlType="submit" disabled={true}>
                        { __('Submit', 'product-cleaner' ) }
                    </Button>
                </Form.Item>
            </Form>
            {renderProModal()}
        </Card>
	);
}

export default Settings;