import React, { useState, useEffect } from 'react'; // useState 누락 방지
import { useParams } from 'react-router-dom';
import Point from '../components/detail/point/Point';
import Video from '../components/detail/video/Video';
import Chat from '../components/detail/chat/Chat';

import Player from '../components/detail/tabMenu/Player'; // Player.jsx
import Team from '../components/detail/tabMenu/Team'; // Team.jsx
import MatchStatus from '../components/detail/tabMenu/MatchStatus'; // MatchStatus.jsx
import MatchRecord from '../components/detail/tabMenu/MatchRecord'; // MatchRecord.jsx
import Highlight from '../components/home/highlight/Highlight'; // Highlight 컴포넌트 추가
import { highlightData } from '../store/highlightData'; // 데이터 추가
import { sportsVideos } from '../store/videoData'; // 비디오 데이터 추가

import './Detail.css'; // 외부 CSS 파일 임포트

// 기존 channels 객체를 다음과 같이 변경합니다.
// (실제 각 방송사의 유튜브 ID가 있다면 'sDawO6w8bd4' 자리에 넣어주세요!)
const channelsInfo = {
  KBS: { logo: '/images/kbs.svg', videoId: 'sDawO6w8bd4' },
  MBC: { logo: '/images/mbc.svg', videoId: 'sDawO6w8bd4' },
  SBS: { logo: '/images/sbs.svg', videoId: 'sDawO6w8bd4' },
};

const Detail = () => {
  const [activeTab, setActiveTab] = useState('선수 소개');

  // Video 관련 상태 (Detail에서 관리)
  const { id } = useParams();
  const [activeChannel, setActiveChannel] = useState('KBS');
  const [videoId, setVideoId] = useState(id || 'sDawO6w8bd4'); // URL 파라미터가 있으면 사용, 없으면 기본값

  // 현재 비디오 데이터 찾기
  const currentVideo = sportsVideos.find((v) => v.id === videoId) || {};
  const startTime = currentVideo.startTime || 0;

  // ID가 바뀌면 업데이트 및 스크롤 최상단 이동
  useEffect(() => {
    if (id) {
      setVideoId(id);
    }
    window.scrollTo(0, 0);
  }, [id]);

  const handleChannelChange = (channel) => {
    setActiveChannel(channel);
    setVideoId(channelsInfo[channel].videoId);
  };

  // ... recordData ... (생략 없이 기존 코드 유지)
  const recordData = {
    1: {
      kor: { scores: [10, 8, 9, 10, 10, 9], total: 56 },
      chn: { scores: [9, 10, 8, 8, 9, 9], total: 53 },
    },
    2: {
      kor: { scores: [10, 9, 10], total: 29 },
      chn: { scores: [8, 10, 9], total: 27 },
    },
    3: null,
    4: null,
  };

  return (
    <div
      style={{
        backgroundColor: '#151515',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          margin: '0 auto',
          padding: '5.21vw 5.9259vw 0',
          boxSizing: 'border-box',
        }}
      >
        {/* 상단 섹션: 2단 구조 (Row 1: Player+Chat, Row 2: Title/Btn) */}
        <section style={{ marginBottom: '1.56vw' }}>
          {/* Row 1: 비디오 플레이어와 채팅창 (높이 맞춤) */}
          <div className="detail-grid-container">
            {/* Video Wrapper ONLY */}
            <div className="video-section-wrapper">
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: '0.63vw',
                  overflow: 'hidden',
                }}
              >
                <Video videoId={videoId} startTime={startTime} />
              </div>
            </div>
            {/* Chat Wrapper */}
            <aside className="chat-section-wrapper">
              <Chat/>
            </aside>
          </div>
          <div className="detail-controls-container">
            <div className="video-controls">
              <h2 className="video-title">
                2025 세계선수권대회 리커브 여자 단체전 결승
              </h2>
              <div
                className="channel-buttons"
                style={{ display: 'flex', gap: '0.31vw' }}
              >
                {Object.keys(channelsInfo).map((channel) => {
                  // 현재 채널이 활성화 상태인지 변수로 저장
                  const isActive = activeChannel === channel;

                  return (
                    <button
                      key={channel}
                      className={isActive ? 'active' : ''}
                      onClick={() => handleChannelChange(channel)}
                      style={{
                        // 1. 버튼 자체는 클릭하기 좋게 넓은 패딩 영역을 유지합니다.
                        padding: '0.42vw 0.78vw',
                        backgroundColor: 'transparent',
                        border: 'none', // 버튼 자체의 테두리는 없앱니다.
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {/* 2. 이미지를 감싸는 상자(div)를 만들고, 여기에 밑줄을 줍니다. */}
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          // 이 상자에 밑줄을 설정합니다. 상자 너비는 내용물(이미지)에 맞춰집니다.
                          borderBottom: isActive
                            ? '0.21vw solid #354AC4'
                            : '0.1vw solid transparent',
                          // 로고와 밑줄 사이의 간격을 줍니다. 이 값을 조절하면 간격이 변합니다.
                          paddingBottom: '0.31vw',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <img
                          src={channelsInfo[channel].logo}
                          alt={`${channel} logo`}
                          style={{
                            height: '1.25vw', // 이미지 높이는 24px로 고정되어 잘 보입니다.
                            width: 'auto',
                            opacity: isActive ? 1 : 0.5,
                            display: 'block', // 이미지 하단의 미세한 여백 제거
                          }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 중단: 점수판 (탭바 포함) */}
        <Point
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          recordData={recordData}
        />

        {/* 하단: 탭별 가변 콘텐츠 (컴포넌트 이름 수정) */}
        <div className="tab-content" style={{ marginTop: '1.56vw' }}>
          {activeTab === '채팅' && <Chat />}
          {activeTab === '선수 소개' && <Player />}
          {activeTab === '팀 소개' && <Team />}
          {activeTab === '경기 상황' && <MatchStatus />}
          {activeTab === '경기 기록' && <MatchRecord recordData={recordData} />}
        </div>

      </div>

      {/* 하단: 하이라이트 섹션 — 왼쪽만 패딩 정렬, 오른쪽은 화면 끝까지 */}
      <Highlight highlightVideos={highlightData} className="detail-type" />
    </div>
  );
};

export default Detail;
