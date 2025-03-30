import { ErrorBoundary } from "react-error-boundary";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { __ } from '@wordpress/i18n';
import Header from "../components/header/Header";
import MenuTabs from "../components/menu-tabs/MenuTabs";
import { fetchProductsStat } from "../services/apiService";

const App = () => {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProductsStat());
	}, [])

	return (
		<div className="wrap">
			<Header />
			<ErrorBoundary fallback={<div>{ __( 'Something went wrong', 'delete-all-products' ) }</div>}>
				<MenuTabs/>
			</ErrorBoundary>
		</div>
	)
}

export default App;