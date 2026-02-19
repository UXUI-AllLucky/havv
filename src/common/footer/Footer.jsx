import './style.scss';

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-top">
        <nav className="footer-nav">
          <a href="#">고객센터</a>
          <a href="#">이용약관</a>
          <a href="#" className="highlight">
            개인정보처리방침
          </a>
          <a href="#">청소년 보호정책</a>
          <a href="#">법적고지</a>
        </nav>
        <div className="footer-social">
          <a href="#" aria-label="YouTube">
            <img src="/images/social/youtube.svg" alt="youtube" />
          </a>
          <a href="#" aria-label="Instagram">
            <img src="/images/social/instagram.svg" alt="instagram" />
          </a>
          <a href="#" aria-label="Facebook">
            <img src="/images/social/facebook.svg" alt="facebook" />
          </a>
          <a href="#" aria-label="X(Twitter)">
            <img src="/images/social/twitter.svg" alt="twitter" />
          </a>
        </div>
      </div>

      <div className="footer-info">
        {/* 텍스트 정보 영역 (줄바꿈은 CSS로 제어하거나 div 분리) */}
        <div className="info-text-group">
          <div className="info-row">
            <span>대표 : 이하브</span>
            <span className="divider">|</span>
            <span>사업자등록번호 : 188-08-08819</span>
          </div>
          {/* 모바일 디자인에 맞춰 순서 및 그룹 조정 */}
          <div className="info-row">
            <span>고객센터 (평일 09시~18시/공휴일 휴무)</span>
          </div>
          <div className="info-row">
            <span>사업장 : 서울특별시 서초구 서초대로77길 41 대동2빌딩</span>
          </div>
          <div className="info-row">
            <span>대표메일 : HAVV@gmail.com</span>
            <span className="divider">|</span>
            <span>ARS 080-1234-5677</span>
          </div>
        </div>

        {/* 버튼 영역을 텍스트 하단으로 완전히 분리 */}
        <div className="footer-buttons">
          <a href="#" className="link-underline">
            챗봇/채팅 상담
          </a>
          <a href="#" className="link-underline">
            1:1게시판문의
          </a>
        </div>

        <div className="copyright">© HAVV Co., Ltd. All rights reserved.</div>
      </div>
    </div>
  );
};

export default Footer;
