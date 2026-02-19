import { IoIosSearch } from 'react-icons/io';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { RxHamburgerMenu } from "react-icons/rx";
import './style.scss';
const Info = () => {
    return (
        <div className="info-box">
            <ul className="info">
                <li className="search">
                    <a href="#">
                        <i>
                            <IoIosSearch />
                        </i>
                    </a>
                </li>
                <li className="profile">
                    <a href="#">
                        <i className='profile'>
                            <IoPersonCircleSharp />
                        </i>
                        
                    </a>
                </li>
                <li className="menubar">
                    <a href="#">                     
                        <i className='menu'>
                            <RxHamburgerMenu/>
                        </i>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Info;
