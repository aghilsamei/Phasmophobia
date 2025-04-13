import DisplayPage from './components/DisplayPage';
import AdminPanel from './components/AdminPanel';

const routes = [
    { path: '/', element: <DisplayPage /> },
    { path: '/panel', element: <AdminPanel/> },

]

export default routes