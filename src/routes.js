import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import Blog from './pages/Blog';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import DashboardApp from './pages/DashboardApp';
//
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Products from './pages/Products';
import Register from './pages/Register';

// ----------------------------------------------------------------------

export default function Router() {
    return useRoutes([
        {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
                { element: <Navigate to="/dashboard/app" replace /> },
                { path: 'app', element: <DashboardApp /> },
                { path: 'products', element: <Products /> },
                { path: 'blog', element: <Blog /> },
                { path: 'cart', element: <Cart /> },
                { path: 'checkout', element: <Checkout /> }
            ]
        },
        {
            path: '/',
            element: <LogoOnlyLayout />,
            children: [
                { path: 'login', element: <Login /> },
                { path: 'register', element: <Register /> },
                { path: '404', element: <NotFound /> },
                { path: '/', element: <Navigate to="/dashboard" /> },
                { path: '*', element: <Navigate to="/404" /> }
            ]
        },
        { path: '*', element: <Navigate to="/404" replace /> }
    ]);
}
