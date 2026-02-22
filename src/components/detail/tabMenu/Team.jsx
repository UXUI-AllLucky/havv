import React, { useState } from 'react';
import './Team.css'; // CSS 파일 임포트

// --- 서브 컴포넌트: 원형 차트 (수정 없음) ---
const StatCircle = ({ label, value, percent, color }) => (
    <div className="stat-circle-container">
        <div
            className="stat-circle-bg"
            style={{
                background: `conic-gradient(${color} ${percent}%, rgba(255, 229, 230, 0.22) ${percent}%)`,
            }}
        >
            <div className="stat-circle-inner">
                {value.replace('%', '')}<span className="stat-circle-percent">%</span>
            </div>
        </div>
        <div className="stat-circle-label">{label}</div>
    </div>
);

// --- 서브 컴포넌트: 선수 행(Row) ---
const PlayerRow = ({ photo, name, age, worldRank, stats, color, achievements, isLast }) => (
    <div className={`player-row ${isLast ? 'last-row' : ''}`}>
        {/* 1. 선수 사진 */}
        <img
            src={photo}
            alt={name}
            className="player-image"
        />

        {/* 2. 상세 정보 영역 */}
        <div className="player-info">
            {/* [상단 섹션] 이름/랭킹 + 우승경력 */}
            <div className="player-info-top">
                {/* 이름 및 랭킹 */}
                <div className="player-name-rank">
                    <div className="name">
                        {name}{' '}
                        <span className="age">({age})</span>
                    </div>
                    <div className="rank">세계 랭킹 {worldRank}</div>
                </div>

                {/* 우승 경력 */}
                {achievements && achievements.length > 0 && (
                    <div className="player-achievements">
                        <div className="achieve-label">우승 경력</div>
                        <div className="achieve-list">
                            {achievements.map((item, i) => (
                                <div key={i} className="achieve-item">
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* [하단 섹션] 동그란 그래프 4개 */}
            <div className="player-stats-grid">
                {stats.map((s, idx) => (
                    <StatCircle key={idx} {...s} color={color} />
                ))}
            </div>
        </div>
    </div>
);

// --- 메인 컴포넌트: Team (데이터 및 전체 구조 유지) ---
const Team = () => {
    // 모든 원본 데이터는 시안(Sian)님이 주신 그대로 유지합니다.
    const koreaPlayers = [
        {
            name: '전훈영',
            age: '30',
            worldRank: '21위',
            photo: '/images/team/korea1.jpg',
            stats: [
                { label: '평균 점수', value: '9.3', percent: 93 },
                { label: '승률', value: '75%', percent: 75 },
                { label: '슛오프 승률', value: '25%', percent: 25 },
                { label: '개인 최고 기록', value: '578', percent: 80 },
            ],
            achievements: [
                '2024 월드컵 3차 대회 여자 단체전 금메달',
                '2024 월드컵 2차 대회 여자 개인전 은메달',
                '2024 월드컵 1차 대회 여자 단체전 은메달',
            ],
        },
        {
            name: '임시현',
            age: '21',
            worldRank: '2위',
            photo: '/images/team/korea2.jpg',
            stats: [
                { label: '평균 점수', value: '9.4', percent: 94 },
                { label: '승률', value: '87%', percent: 82 },
                { label: '슛오프 승률', value: '71%', percent: 71 },
                { label: '개인 최고 기록', value: '694', percent: 95 },
            ],
            achievements: [
                '2024 파리 올림픽 개인/단체/혼성 금메달',
                '2023 항저우 아시안게임 개인/단체/혼성 금메달',
                '2024 월드컵 3차 대회 개인전 금메달',
            ],
        },
        {
            name: '남수현',
            age: '19',
            worldRank: '61위',
            photo: '/images/team/korea3.jpg',
            stats: [
                { label: '평균 점수', value: '9.3', percent: 93 },
                { label: '승률', value: '77%', percent: 77 },
                { label: '슛오프 승률', value: '0%', percent: 0 },
                { label: '개인 최고 기록', value: '688', percent: 85 },
            ],
            achievements: [
                '2024 파리 올림픽 여자 단체전 금메달',
                '2024 파리 올림픽 여자 개인전 은메달',
                '2024 월드컵 3차 대회 여자 단체전 금메달',
            ],
        },
    ];

    const chinaPlayers = [
        {
            name: '안샤오쉬안',
            age: '23',
            worldRank: '28위',
            photo: '/images/team/china1.jpg',
            stats: [
                { label: '평균 점수', value: '9.1', percent: 91 },
                { label: '승률', value: '66%', percent: 66 },
                { label: '슛오프 승률', value: '50%', percent: 50 },
                { label: '개인 최고 기록', value: '677', percent: 75 },
            ],
            achievements: [
                '2024 파리 올림픽 여자 단체전 은메달',
                '2024 월드컵 2차 대회 여자 단체전 금메달',
                '2024 월드컵 1차 대회 여자 개인전 은메달',
            ],
        },
        {
            name: '리자만',
            age: '27',
            worldRank: '15위',
            photo: '/images/team/china2.jpg',
            stats: [
                { label: '평균 점수', value: '9.3', percent: 93 },
                { label: '승률', value: '75%', percent: 75 },
                { label: '슛오프 승률', value: '18%', percent: 18 },
                { label: '개인 최고 기록', value: '678', percent: 76 },
            ],
            achievements: [
                '2024 파리 올림픽 여자 단체전 은메달',
                '2024 월드컵 2차 대회 여자 단체전 금메달',
                '2023 월드컵 파이널 여자 개인전 3위',
            ],
        },
        {
            name: '양샤오레이',
            age: '24',
            worldRank: '32위',
            photo: '/images/team/china3.jpg',
            stats: [
                { label: '평균 점수', value: '9.2', percent: 92 },
                { label: '승률', value: '67%', percent: 67 },
                { label: '슛오프 승률', value: '100%', percent: 100 },
                { label: '개인 최고 기록', value: '673', percent: 73 },
            ],
            achievements: [
                '2024 파리 올림픽 여자 단체전 은메달',
                '2024 월드컵 2차 대회 여자 단체전 금메달',
                '2021 도쿄 올림픽 대회 참가 기록',
            ],
        },
    ];

    const [activeTeam, setActiveTeam] = useState('KOR');

    return (
        <div className="team-container">
            {/* 서브 탭: 모바일 전용 */}
            <div className="team-sub-tabs">
                <button 
                    className={`sub-tab-btn ${activeTeam === 'KOR' ? 'active' : ''}`}
                    onClick={() => setActiveTeam('KOR')}
                >
                    대한민국
                </button>
                <button 
                    className={`sub-tab-btn ${activeTeam === 'CHN' ? 'active' : ''}`}
                    onClick={() => setActiveTeam('CHN')}
                >
                    중국
                </button>
            </div>

            <div className="team-content-wrapper">
                {/* 대한민국 팀 */}
                {(activeTeam === 'KOR' || window.innerWidth > 360) && (
                    <div className="team-side kor-side">
                        <div className="team-header">
                            <img
                                src="/images/team/korealogo.jpg"
                                alt="KOR Logo"
                                className="team-flag-img"
                            />
                            <div className="team-header-info">
                                <h2 className="team-name">
                                    대한민국
                                    <span className="team-rank">세계 랭킹 1위</span>
                                </h2>
                                <div className="recent-match">
                                    <span>최근 경기</span>
                                    <ul className="match-list">
                                        <li>네덜란드 4:5 대한민국 (준결승)</li>
                                    </ul>
                                </div>
                                <div className="past-records">
                                    <span>지난 대회 기록</span>
                                    <ul className="record-list">
                                        <li>2020 도쿄 올림픽 여자 단체전 금메달</li>
                                        <li>2016 리우 올림픽 여자 단체전 금메달</li>
                                        <li>2012 런던 올림픽 여자 단체전 금메달</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* 1. 감독 정보 Box */}
                        <div className="coach-info-wrapper">
                            <div className="coach-info-box">
                                <img
                                    src="/images/team/korea4.jpg"
                                    alt="감독"
                                    className="coach-image"
                                />
                                <div className="coach-details">
                                    <div className="coach-title">
                                        감독 <span className="coach-name">양창훈</span>
                                    </div>
                                    <div className="coach-role">
                                        現 대표팀 남녀 총감독
                                    </div>
                                    <div className="coach-career">
                                        2015-2016 대한민국 리커브 여자 감독 <br />
                                        2010 대한민국 리커브 남자 코치 <br />
                                        2001-2004 중국대표팀 감독
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. 선수 리스트 Box */}
                        <div className="player-list-title">선수</div>
                        <div className="player-list-box">
                            {koreaPlayers.map((p, idx) => (
                                <PlayerRow
                                    key={idx}
                                    {...p}
                                    color="#0047A0"
                                    isLast={idx === koreaPlayers.length - 1}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {(activeTeam === 'CHN' || window.innerWidth > 360) && (
                    <div className="team-side chn-side">
                        <div className="team-header">
                            <img
                                src="/images/team/chinalogo.jpg"
                                alt="CHN Logo"
                                className="team-flag-img"
                            />
                            <div className="team-header-info">
                                <h2 className="team-name">
                                    중국
                                    <span className="team-rank">세계 랭킹 2위</span>
                                </h2>
                                <div className="recent-match">
                                    <span>최근 경기</span>
                                    <ul className="match-list">
                                        <li>멕시코 3:5 중국 (준결승)</li>
                                    </ul>
                                </div>
                                <div className="past-records">
                                    <span>지난 대회 기록</span>
                                    <ul className="record-list">
                                        <li>2020 도쿄 올림픽 여자 단체전 9위</li>
                                        <li>2016 리우 올림픽 여자 단체전 7위</li>
                                        <li>2012 런던 올림픽 여자 단체전 은메달</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {/* 1. 감독 정보 Box */}
                        <div className="coach-info-wrapper">
                            <div className="coach-info-box">
                                <img
                                    src="/images/team/china4.jpg"
                                    alt="감독"
                                    className="coach-image"
                                />
                                <div className="coach-details">
                                    <div className="coach-title">
                                        감독 <span className="coach-name">권용학</span>
                                    </div>
                                    <div className="coach-role">
                                        現 중국 대표팀 여자 총감독
                                    </div>
                                    <div className="coach-career">
                                        2022-2025 중국 리커브 여자 감독 <br />
                                        상하이시 대표팀 감독 <br />
                                        장쑤성 대표팀 감독
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. 선수 리스트 Box */}
                        <div className="player-list-title">선수</div>
                        <div className="player-list-box">
                            {chinaPlayers.map((p, idx) => (
                                <PlayerRow
                                    key={idx}
                                    {...p}
                                    color="#DE2910"
                                    isLast={idx === chinaPlayers.length - 1}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Team;
