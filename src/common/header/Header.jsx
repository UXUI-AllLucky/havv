import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Nav from './Nav';
import Info from './Info';
import './style.scss';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isMainPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (isMainPage) {
        const mySportsSection = document.getElementById('mySport');

        if (mySportsSection) {
          const sectionTop = mySportsSection.offsetTop;
          const triggerPoint = sectionTop - 80; // 헤더 높이만큼 보정

          if (window.scrollY >= triggerPoint) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        }
      } else {
        // ⭐ 메인 페이지가 아니면(상세페이지 등) 항상 배경색 유지
        setIsScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 실행 시점 체크

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMainPage, location.pathname]); // 경로 바뀔 때마다 다시 계산

  return (
    /* ⭐ [중요 로직] 
           1. 메인이 아닐 때(!isMainPage) -> 무조건 'on'
           2. 메인인데 스크롤 됐을 때(isMainPage && isScrolled) -> 'on'
        */
    <header className={`header ${isScrolled ? 'on' : ''}`}>
      <div className="inner">
        <div className="left">
          <h1>
            <a className="havv-pc-logo" href="/">
              <img src="/images/havv_logo.svg" alt="main_logo" />
            </a>
            <a className="havv-mobile-logo" href="/">
              <img src="/images/havv_mobile_logo.svg" alt="main_mobile_logo" />
            </a>
          </h1>
          <Nav />
        </div>
        <Info />
      </div>
    </header>
  );
};

export default Header;
