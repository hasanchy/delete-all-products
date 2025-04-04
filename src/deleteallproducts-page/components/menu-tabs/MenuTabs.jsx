import React, { useState } from 'react';
import { Tabs, ConfigProvider, Spin } from 'antd';
import { ProductOutlined, DeleteOutlined, SettingOutlined, LoadingOutlined } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from './manuTabsSlice';
import AllProducts from '../../features/products/AllProducts';
import TrashedProducts from '../../features/products/TrashedProducts';
import Settings from '../../features/settings/Settings';

const MenuTabs = () => {

	const { activeTab  } = useSelector((state) => state.menuTabs);
	const { isProductsStatLoading, isTrashingInProgress, isRestoringInProgress, isDeletingInProgress, productsAll, productsTrash } = useSelector((state) => state.products);
	const dispatch = useDispatch();
	const isOperationInProgress = (isTrashingInProgress || isRestoringInProgress || isDeletingInProgress) ? true : false;

	let allLabel = ( isProductsStatLoading ) ? <>All <Spin indicator={<LoadingOutlined spin />} size="small" /></> : `All (${productsAll})`;
	let trashLabel = ( isProductsStatLoading ) ? <>Trash <Spin indicator={<LoadingOutlined spin />} size="small" /></> : `Trash (${productsTrash})`;
	const tabItems = [
		{
			key: 'all',
			label: __( allLabel, 'delete-all-products' ),
			children: <AllProducts />,
			icon: isOperationInProgress ? <Spin size="small"/> : <ProductOutlined />
		},
		{
			key: 'trash',
			label: __( trashLabel, 'delete-all-products' ),
			children: <TrashedProducts/>,
			icon: isOperationInProgress ? <Spin size="small"/> : <DeleteOutlined />
		},
		{
			key: 'settings',
			label: __( 'Settings', 'delete-all-products' ),
			children: <Settings/>,
			icon: <SettingOutlined />
		}
	];

	const handleOnChange = (activeKey) => {
		dispatch( setActiveTab( activeKey ) );
	}

	return (
		<React.Fragment>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: '#672fb4',
						margin:"0"
					},
				}}
			>
				<Tabs
					activeKey={activeTab}
					type="card"
					size="large"
					items={tabItems}
					onChange={handleOnChange}
				/>
			</ConfigProvider>
		</React.Fragment>
	)
}

export default MenuTabs