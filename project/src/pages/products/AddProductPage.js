import { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';

const NavBarComponent = lazy(
	() => import('../../components/common/NavbarComponent'),
);

const AddProductForm = lazy(
	() => import('../../components/product/AddProductForm'),
);

const AddProductPage = () => {
	return (
		<>
			<div className="vh-100">
				<Suspense fallback={<div>Loading...</div>}>
					<NavBarComponent />
					<AddProductForm />
					{/* lỗi ở đây */}
				</Suspense>
			</div>
		</>
	);
};

export default AddProductPage;