import React, { useEffect, useRef } from 'react';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { Toast } from 'primereact/toast';
import { setToastMessage } from '../products/productsSlice';

const Notifications = () => {
    const toast = useRef<Toast>(null);
	const dispatch = useAppDispatch();

    const { toastMessage } = useAppSelector((state) => state.products);

    const renderMessage = () => {
		if (toastMessage) {
			toast.current?.show({ severity: 'info', summary: 'Confirmed', detail: toastMessage, life: 5000 });
			dispatch(setToastMessage(''));
		}
		return null;
	}
	
    return (
		<>
			<Toast ref={toast} position="bottom-right"/>
            {renderMessage()}
		</>
	)
}

export default Notifications;