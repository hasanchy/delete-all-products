import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { deleteProductsPermanently, moveProductsToTrash, setAllTabMessage } from './productsSlice';

const AllProducts = () => {

	const dispatch = useAppDispatch();
	const { allProducts, isProductStatLoading, isProductsMovingToTrash, allTabMessage } = useAppSelector((state) => state.products);

	const handlePermanentDelete = () => {
		dispatch(deleteProductsPermanently())
	}

	const handleMoveToTrash = () => {
		dispatch(moveProductsToTrash())
	}

	const renderMessage = () => {
		if (allTabMessage) {
			return <div id="setting-error-settings_updated" className="notice notice-success settings-error is-dismissible">
				<p><strong>{allTabMessage}</strong></p>
				<button type="button" className="notice-dismiss" onClick={() => dispatch(setAllTabMessage(''))}>
					<span className="screen-reader-text">Dismiss this notice.</span>
				</button>
			</div>
		}
		return null;
	}

	const renderButtons = () => {
		if (allProducts) {
			let trashButtonLabel = (isProductsMovingToTrash) ? 'Moving to trash...' : 'Move To Trash';
			return <p>
				<button className="button-primary wooazon-button-primary" onClick={(e) => handlePermanentDelete(e)}>Delete Permanently</button>
				<button className="button-primary wooazon-button-primary" style={{ marginLeft: '10px' }} onClick={(e) => handleMoveToTrash(e)} disabled={isProductsMovingToTrash}>{trashButtonLabel}</button>
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

	return <div>
		{renderLoader()}
		{renderMessage()}
		{renderButtons()}
	</div>
}

export default AllProducts;