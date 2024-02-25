import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { deleteProductsPermanently, restoreTrashedProducts, setTrashTabMessage } from './productsSlice';

const TrashedProducts = () => {

	const dispatch = useAppDispatch();
	const { trashedProducts, isProductStatLoading, isProductsRestoring, trashTabMessage } = useAppSelector((state) => state.products);

	const handlePermanentDelete = () => {
		dispatch(deleteProductsPermanently())
	}

	const handleRestoreTrash = () => {
		dispatch(restoreTrashedProducts())
	}

	const renderMessage = () => {
		if (trashTabMessage) {
			return <div id="setting-error-settings_updated" className="notice notice-success settings-error is-dismissible">
				<p><strong>{trashTabMessage}</strong></p>
				<button type="button" className="notice-dismiss" onClick={() => dispatch(setTrashTabMessage(''))}>
					<span className="screen-reader-text">Dismiss this notice.</span>
				</button>
			</div>
		}
		return null;
	}

	const renderButtons = () => {
		if (trashedProducts) {
			let restoreButtonLabel = (isProductsRestoring) ? 'Restoring...' : 'Restore Trash';
			return <p>
				<button className="button-primary wooazon-button-primary" onClick={(e) => handlePermanentDelete(e)}>Delete Permanently</button>
				<button className="button-primary wooazon-button-primary" style={{ marginLeft: '10px' }} onClick={(e) => handleRestoreTrash(e)} disabled={isProductsRestoring}>{restoreButtonLabel}</button>
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

export default TrashedProducts;