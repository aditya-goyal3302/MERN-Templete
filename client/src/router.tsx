import { RouteObject, Navigate } from 'react-router-dom'
import BaseLayout from './layouts/BaseLayout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SidebarLayout from './layouts/SidebarLayout'
import UserSettings from './pages/UserSettings'
import UserLayout from './layouts/UserLayout'
import PersonalInfo from './pages/UserSettings/PersonalInfo'


const route = (isLogined:true|false,role:string) => {

    const routes: RouteObject[] = [
        {
            path: 'auth',
            element: isLogined?<Navigate to={'/'} />:<BaseLayout />,
            children: [
                {
                    path: 'login',
                    element: <Login />
                },
                {
                    path: 'signup',
                    element: <Signup />
                },
            ]
        },
        {
            path: 'user',
            element: isLogined ? <SidebarLayout />: <Navigate to='/auth/login'/>,
            children: [{
                path: 'dashboard',
                // element: <ProductDetails />
            }, {
                path: 'setting',
                element: <UserSettings />,
            }]
        },
        {
            path: '',
            element: role === "Vendor"?<Navigate to={'/user/dashboard'}/>:<UserLayout />,
            children: [{
                path: '',
                // element: <Home />
            }]
        }]
        return routes
}
export default route