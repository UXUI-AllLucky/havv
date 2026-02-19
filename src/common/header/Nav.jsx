import './style.scss';

const Nav = () => {
    return (
        <nav className="nav">
            <ul className="gnb">
                <li>
                    <a href="#">홈</a>
                </li>
                <li className="live_menu">
                    <a href="#">LIVE</a>
                </li>
                <li>
                    <a href="#">리그</a>
                </li>
                <li>
                    <a href="#">스포츠</a>
                </li>
                <li>
                    <a href="#">일정</a>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
