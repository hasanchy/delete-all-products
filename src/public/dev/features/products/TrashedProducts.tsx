import React, { useRef } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { deleteProductsPermanently, restoreTrashedProducts } from './productsSlice';

const TrashedProducts = () => {

	const dispatch = useAppDispatch();
	const { trashedProducts, isProductStatLoading, isProductsRestoring } = useAppSelector((state) => state.products);

	const acceptDelete = () => {
		dispatch(deleteProductsPermanently());
    }

	const acceptRestore = () => {
		dispatch(restoreTrashedProducts());
    }

	const confirmDelete = () => {
        confirmDialog({
            message: 'Do you want to delete all the trashed products permanently?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: acceptDelete
        });
    };

	const confirmRestore = () => {
        confirmDialog({
            message: 'Do you want to restore all the trashed products?',
            header: 'Restore Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: acceptRestore
        });
    };

	const renderButtons = () => {
		if (trashedProducts) {
			let restoreButtonLabel = (isProductsRestoring) ? 'Restoring...' : 'Restore Trash';
			let productText = trashedProducts > 1 ? 'products' : 'product';
			return <p>
				<p>{trashedProducts} {productText} found in the trash</p>
				<button className="button-primary daprods-button-danger" onClick={confirmDelete}>Delete Permanently</button>
				<button className="button-primary daprods-button-primary" style={{ marginLeft: '10px' }} onClick={confirmRestore} disabled={isProductsRestoring}>{restoreButtonLabel}</button>
			</p>
		} else if (!isProductStatLoading) {
			return <p>No products found in the trash</p>;
		}
		return null;
	}

	const renderLoader = () => {
		if (isProductStatLoading) {
			return <p>Loading...</p>;
		}
		return null;
	}

	return <>
        <ConfirmDialog draggable={false}/>
		{renderLoader()}
		{renderButtons()}
	</>
}

export default TrashedProducts;