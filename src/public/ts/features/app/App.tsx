import Tabs from '../tabs/Tabs';
import { ErrorBoundary } from "react-error-boundary";

const App = (): JSX.Element => {

	return (
		<div className="wrap">
			<h1 style={{ fontSize: '30px' }}><span style={{ color: '#674399' }}>Delete WooCommerce Products</span></h1>
			<ErrorBoundary fallback={<div>Something went wrong</div>}>
				<Tabs />
			</ErrorBoundary>
		</div>
	)
}

export default App;