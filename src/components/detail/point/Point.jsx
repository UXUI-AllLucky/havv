import React from 'react';
import './style.css'; // 기존 점수판 스타일 파일

// Detail에서 넘겨준 activeTab, setActiveTab, 그리고 recordData를 받아옵니다.
const Point = ({ activeTab, setActiveTab, recordData }) => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 360);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 360);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tabs = isMobile
    ? ['채팅', '선수 소개', '팀 소개', '경기 상황', '경기 기록']
    : ['선수 소개', '팀 소개', '경기 상황', '경기 기록'];

  // 세트 탭 상태 관리 (기본값: 2세트)
  const [activeSet, setActiveSet] = React.useState(2);

  // 점수 배열을 항상 6개로 채워주는 헬퍼 함수
  const padScores = (scores) => {
    if (!scores) return Array(6).fill('');
    const padded = [...scores];
    while (padded.length < 6) {
      padded.push('');
    }
    return padded;
  };

  // 현재 선택된 세트의 데이터 가져오기 (없으면 null)
  const currentSetData = recordData[activeSet];

  return (
    <div className="point-container">
      {/* 1. 상단 메인 요약 점수판 (고정) */}
      <div className="main-summary">
        <div className="summary-team">
          <img src="/images/team/korealogo.jpg" alt="KOR" />
          <p>대한민국</p>
        </div>
        <div className="summary-score">
          <span className="num">
            {currentSetData
              ? currentSetData.kor.total > currentSetData.chn.total
                ? 2
                : currentSetData.kor.total === currentSetData.chn.total
                  ? 1
                  : 0
              : 0}
          </span>
          <div className="mid">
            <img src="/images/Archerylogo.svg" alt="WA" className="wa-logo" />
            <p className="round">결승</p>
            <p className="set">{activeSet}세트</p>
          </div>
          <span className="num">
            {currentSetData
              ? currentSetData.chn.total > currentSetData.kor.total
                ? 2
                : currentSetData.chn.total === currentSetData.kor.total
                  ? 1
                  : 0
              : 0}
          </span>
        </div>
        <div className="summary-team">
          <img src="/images/team/chinalogo.jpg" alt="CHN" />
          <p>중국</p>
        </div>
      </div>

      {/* 2. 상세 세트 점수바 (가변) */}
      <div className="score-detail-area">
        <div className="set-indicator">
          {[1, 2, 3, 4].map((setNum) => (
            <span
              key={setNum}
              className={activeSet === setNum ? 'active' : ''}
              onClick={() => setActiveSet(setNum)}
              style={{ cursor: 'pointer' }}
            >
              SET {setNum}
            </span>
          ))}
        </div>

        {/* 모든 세트에 대해 공통 템플릿 사용 (데이터 유무에 따라 내용만 변경) */}
        <div className="score-card">
          {/* 대한민국 행 */}
          <div className="score-row">
            <div className="t-info">
              <span className="ctr">KOR</span>
              <img
                src="/images/team/korealogo.jpg"
                alt="KOR"
                className="row-flag"
              />
            </div>
            <div className="point-num">
              <div className="s-point highlight">
                {currentSetData
                  ? currentSetData.kor.total > currentSetData.chn.total
                    ? 2
                    : currentSetData.kor.total === currentSetData.chn.total
                      ? 1
                      : 0
                  : ''}
              </div>
              <div className="arrows">
                {padScores(currentSetData?.kor?.scores).map((score, i) => (
                  <span key={i}>{score}</span>
                ))}
              </div>
              <div className="total">
                {currentSetData ? currentSetData.kor.total : ''}
              </div>
            </div>
          </div>
          {/* 중국 행 */}
          <div className="score-row">
            <div className="t-info">
              <span className="ctr">CHN</span>
              <img
                src="/images/team/chinalogo.jpg"
                alt="CHN"
                className="row-flag"
              />
            </div>
            <div className="point-num">
              <div className="s-point highlight">
                {currentSetData
                  ? currentSetData.chn.total > currentSetData.kor.total
                    ? 2
                    : currentSetData.chn.total === currentSetData.kor.total
                      ? 1
                      : 0
                  : ''}
              </div>
              <div className="arrows">
                {padScores(currentSetData?.chn?.scores).map((score, i) => (
                  <span key={i}>{score}</span>
                ))}
              </div>
              <div className="total">
                {currentSetData ? currentSetData.chn.total : ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 탭 메뉴 (클릭 시 부모 상태 변경) */}
      <div className="point-tab-bar">
        {tabs.map((tab) => (
          <span
            key={tab}
            className={`tab-item ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {' '}
            {tab}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Point;
