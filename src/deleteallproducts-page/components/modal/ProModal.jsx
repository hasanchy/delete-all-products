import React, {useState} from 'react';
import { Button, Modal } from 'antd';
import { __ } from '@wordpress/i18n';

const ProModal = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleOpenChange = ( open ) => {
        if(!open){
            props.onCancel(false);
        }
    }

  return (
    <>
        <Modal 
            title={ __( 'Upgrade to Pro' ) } 
            open={isModalOpen} 
            onOk={handleOk} 
            onCancel={handleCancel}
            afterOpenChange={handleOpenChange}
            footer={[
                <Button
                    key="link"
                    target='_blank'
                    href="https://woocommerce.com/products/product-cleaner-for-woocommerce/"
                    type="primary"
                >
                    { __( 'Upgrade to Pro' ) }
                </Button>
            ]}
        >
            <p>{ __( 'This feature is available in the Pro version of the plugin.' ) }</p>
        </Modal>
    </>
  );
}
export default ProModal;