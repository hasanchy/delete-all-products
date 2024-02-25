import React, { useEffect } from 'react';
import AllProducts from '../products/AllProducts';
import TrashedProducts from '../products/TrashedProducts';

import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setActiveTab } from './tabsSlice';
import { fetchProductStat } from '../products/productsSlice';

const Tabs = () => {

	const dispatch = useAppDispatch();
	const activeTab = useAppSelector((state) => state.tabs.activeTab);
	const { allProducts, trashedProducts, isProductStatLoading, isProductsMovingToTrash, isProductsRestoring } = useAppSelector((state) => state.products);

	useEffect(() => {
		dispatch(fetchProductStat());
	}, []);

	const handleActiveTab = (tabId: string) => {
		dispatch(setActiveTab(tabId));
	}

	const renderTabContent = (): JSX.Element => {
		if (activeTab === 'trash') {
			return <TrashedProducts />;
		} else {
			return <AllProducts />;
		}
	}

	let allProductNumber: JSX.Element = (isProductStatLoading || isProductsMovingToTrash || isProductsRestoring) ? <span className="dashicons dashicons-update spin" style={{ verticalAlign: 'sub', marginRight: '5px' }} /> : <>({allProducts})</>;
	let trashedProductNumber: JSX.Element = (isProductStatLoading || isProductsMovingToTrash || isProductsRestoring) ? <span className="dashicons dashicons-update spin" style={{ verticalAlign: 'sub', marginRight: '5px' }} /> : <>({trashedProducts})</>;

	return (
		<React.Fragment>
			<nav className="nav-tab-wrapper">
				<div className={activeTab === 'all' ? 'nav-tab nav-tab-active wooazon-nav-tab-active' : 'nav-tab'} style={{ cursor: 'pointer' }} onClick={() => handleActiveTab('all')}><span className="dashicons dashicons-database-import" style={{ verticalAlign: 'sub' }}></span> All {allProductNumber}</div>
				<div className={activeTab === 'trash' ? 'nav-tab nav-tab-active wooazon-nav-tab-active' : 'nav-tab'} style={{ cursor: 'pointer' }} onClick={() => handleActiveTab('trash')}><span className="dashicons dashicons-backup" style={{ verticalAlign: 'sub' }}></span> Trash {trashedProductNumber}</div>
			</nav>
			<div className="tab-content">
				{renderTabContent()}
			</div>
		</React.Fragment>
	)
}

export default Tabs;