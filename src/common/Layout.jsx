import { Outlet } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';

const Layout = () => {
    return (
        <div className="layout__wrap">
            <Header />
            <main className="layout__main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
