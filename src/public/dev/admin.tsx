import ReactDOM from 'react-dom/client';
import './style/admin.scss';
import { Provider } from 'react-redux'
import App from './features/app/App';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('delete-all-products-component')!)

root.render(
	<Provider store={store}>
		<App />
	</Provider>
)