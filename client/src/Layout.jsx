import Header from './components/Header';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Outlet/>
        </div>
    );
}