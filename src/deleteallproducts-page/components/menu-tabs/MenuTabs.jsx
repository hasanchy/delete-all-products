import React, { useState } from 'react';
import { Tabs, ConfigProvider, Spin } from 'antd';
import { ProductOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from './manuTabsSlice';
import AllProducts from '../../features/products/AllProducts';
import TrashedProducts from '../../features/products/TrashedProducts';

const MenuTabs = () => {

	const { activeTab  } = useSelector((state) => state.menuTabs);
	const { isProductsStatLoading, productsAll, productsTrash } = useSelector((state) => state.products);
	const dispatch = useDispatch();

	let allLabel = ( isProductsStatLoading ) ? <>All <Spin indicator={<LoadingOutlined spin />} size="small" /></> : `All (${productsAll})`;
	let trashLabel = ( isProductsStatLoading ) ? <>Trash <Spin indicator={<LoadingOutlined spin />} size="small" /></> : `Trash (${productsTrash})`;
	const tabItems = [
		{
			key: 'all',
			label: __( allLabel, 'delete-all-products' ),
			children: <AllProducts />,
			icon: <ProductOutlined />
		},
		{
			key: 'trash',
			label: __( trashLabel, 'delete-all-products' ),
			children: <TrashedProducts/>,
			icon: <DeleteOutlined />
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