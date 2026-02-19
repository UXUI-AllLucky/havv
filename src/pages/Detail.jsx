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

  const channels = {
    KBS: 'sDawO6w8bd4',
    MBC: 'sDawO6w8bd4',
    SBS: 'sDawO6w8bd4',
  };

  const handleChannelChange = (channel) => {
    setActiveChannel(channel);
    setVideoId(channels[channel]);
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
        backgroundColor: '#000',
        minHeight: '100vh',
        padding: '100px 20px 20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1600px',
          margin: '0 auto',
          padding: '0 40px',
          boxSizing: 'border-box',
        }}
      >
        {/* 상단 섹션: 2단 구조 (Row 1: Player+Chat, Row 2: Title/Btn) */}
        <section style={{ marginBottom: '30px' }}>
          {/* Row 1: 비디오 플레이어와 채팅창 (높이 맞춤) */}
          <div className="detail-grid-container">
            {/* Video Wrapper ONLY */}
            <div className="video-section-wrapper">
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                <Video videoId={videoId} startTime={startTime} />
              </div>
            </div>
            {/* Chat Wrapper */}
            <aside className="chat-section-wrapper">
              <Chat />
            </aside>
          </div>

          {/* Video Title & Channel Buttons (Aligned with Video Width) */}
          <div className="detail-controls-container">
            <div className="video-controls">
              <h2 className="video-title">
                2025 세계선수권대회 리커브 여자 단체전 결승
              </h2>
              <div className="channel-buttons">
                {Object.keys(channels).map((channel) => (
                  <button
                    key={channel}
                    onClick={() => handleChannelChange(channel)}
                    style={{
                      padding: '8px 15px',
                      backgroundColor: 'transparent',
                      color: activeChannel === channel ? '#fff' : '#ccc',
                      border: 'none',
                      borderBottom:
                        activeChannel === channel
                          ? '2px solid #fff'
                          : '2px solid transparent',
                      borderRadius: '0',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      transition: 'all 0.3s ease',
                      textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    }}
                  >
                    {channel}
                  </button>
                ))}
              </div>
            </div>
            {/* Empty column to match Chat width above */}
            <div></div>
          </div>
        </section>

        {/* 중단: 점수판 (탭바 포함) */}
        <Point
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          recordData={recordData}
        />

        {/* 하단: 탭별 가변 콘텐츠 (컴포넌트 이름 수정) */}
        <div className="tab-content" style={{ marginTop: '30px' }}>
          {activeTab === '선수 소개' && <Player />}
          {activeTab === '팀 소개' && <Team />}
          {activeTab === '경기 상황' && <MatchStatus />}
          {activeTab === '경기 기록' && <MatchRecord recordData={recordData} />}
        </div>

        {/* 하단: 하이라이트 섹션 (모든 탭에서 보임) */}
        {/* 하단: 하이라이트 섹션 (모든 탭에서 보임) */}
        <Highlight
          highlightVideos={highlightData}

          className="detail-type"
        />
      </div>
    </div>
  );
};

export default Detail;
