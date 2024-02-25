import Tabs from '../tabs/Tabs';
import Notifications from '../notifications/Notifications';
import { ErrorBoundary } from "react-error-boundary";

const App = (): JSX.Element => {

	return (
		<div className="wrap">
			<h1 style={{ fontSize: '30px' }}><span style={{ color: '#674399' }}>Delete All Products</span></h1>
			<ErrorBoundary fallback={<div>Something went wrong</div>}>
				<Tabs />
				<Notifications />
			</ErrorBoundary>
		</div>
	)
}

export default App;