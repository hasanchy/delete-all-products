import React, { useRef } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { moveProductsToTrash } from './productsSlice';

const AllProducts = () => {

	const dispatch = useAppDispatch();
	const { allProducts, isProductStatLoading, isProductsMovingToTrash } = useAppSelector((state) => state.products);

	const acceptTrash = () => {
		dispatch(moveProductsToTrash());
    }

	const confirmTrash = () => {
        confirmDialog({
            message: 'Do you want to trash all the products?',
            header: 'Trash Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: acceptTrash
        });
    };

	const renderButtons = () => {
		if (allProducts) {
			let trashButtonLabel = (isProductsMovingToTrash) ? 'Moving to trash...' : 'Move To Trash';
			let productText = allProducts > 1 ? 'products' : 'product';
			return <p>
				<p>{allProducts} {productText} found</p>
				<button className="button-primary daprods-button-primary" style={{ marginLeft: '10px' }} onClick={confirmTrash} disabled={isProductsMovingToTrash}>{trashButtonLabel}</button>
			</p>
		} else if (!isProductStatLoading) {
			return <p>No products found</p>;
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

export default AllProducts;