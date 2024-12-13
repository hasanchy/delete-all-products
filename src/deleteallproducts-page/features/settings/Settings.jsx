import { Button, Card, Form, message, Switch } from 'antd';
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDeleteProductImages, setSettingsToastMessage } from './settingsSlice';
import { saveSettings } from '../../services/apiService';
import { __ } from '@wordpress/i18n';

const Settings = () => {
	const dispatch = useDispatch();
	const { deleteProductImages, isSettingsSaving, isSettingsLoading, settingsToastMessage } = useSelector((state) => state.settings);

	const [form] = Form.useForm();

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
        deleteProductImages
    });

    const onFinish = () => {
        const data = {
            'delete_product_images': deleteProductImages ? 'yes' : 'no',
        }
        dispatch(saveSettings(data));
    };

    const handleDeleteProductImages = (value) => {
        dispatch(setDeleteProductImages(value));
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
                disabled={isSettingsLoading}
            >
                <Form.Item
                    label={ __('Delete product images on permanent deletion', 'delete-all-products' ) }
                    name="deleteProductImages"
                >
                    <Switch
                        checkedChildren={__('Yes', 'delete-all-products')}
                        unCheckedChildren={__('No', 'delete-all-products')}
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
                    <Button type="primary" htmlType="submit" loading={isSettingsSaving}>
                        { __('Submit', 'delete-all-products' ) }
                    </Button>
                </Form.Item>
            </Form>
        </Card>
	);
}

export default Settings;