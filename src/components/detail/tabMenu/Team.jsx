import React from 'react';
import './Team.css'; // CSS 파일 임포트

// --- 서브 컴포넌트: 원형 차트 (수정 없음) ---
const StatCircle = ({ label, value, percent, color }) => (
    <div style={{ textAlign: 'center', flexShrink: 0 }}>
        <div
            style={{
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: `conic-gradient(${color} ${percent}%, #333 ${percent}%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '4px',
            }}
        >
            <div
                style={{
                    width: '34px',
                    height: '34px',
                    backgroundColor: '#1a1a1a',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: '#fff',
                }}
            >
                {value}
            </div>
        </div>
        <div style={{ fontSize: '10px', color: '#888', whiteSpace: 'nowrap' }}>{label}</div>
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
                { label: '승율', value: '75%', percent: 75 },
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
                { label: '승율', value: '87%', percent: 82 },
                { label: '슛오프 승률', value: '71%', percent: 71 },
                { label: '세트 최고 기록', value: '694', percent: 95 },
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
                { label: '승율', value: '77%', percent: 77 },
                { label: '슛오프 승률', value: '0%', percent: 0 },
                { label: '세트 최고 기록', value: '688', percent: 85 },
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
                { label: '10점', value: '66%', percent: 66 },
                { label: '시리즈 승률', value: '50%', percent: 50 },
                { label: '세트 최고 기록', value: '677', percent: 75 },
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
                { label: '10점', value: '75%', percent: 75 },
                { label: '시리즈 승률', value: '18%', percent: 18 },
                { label: '세트 최고 기록', value: '678', percent: 76 },
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
                { label: '10점', value: '67%', percent: 67 },
                { label: '시리즈 승률', value: '100%', percent: 100 },
                { label: '세트 최고 기록', value: '673', percent: 73 },
            ],
            achievements: [
                '2024 파리 올림픽 여자 단체전 은메달',
                '2024 월드컵 2차 대회 여자 단체전 금메달',
                '2021 도쿄 올림픽 대회 참가 기록',
            ],
        },
    ];

    return (
        <div className="team-container">
            <div className="team-content-wrapper">
                {/* 대한민국 팀 */}
                <div className="team-side">
                    <div className="team-header">
                        <img
                            src="https://flagcdn.com/w160/kr.png"
                            alt="KR"
                            className="team-flag-img"
                        />
                        <div>
                            <h2 style={{ margin: '0 0 10px 0', fontSize: '28px', color: '#fff' }}>
                                대한민국
                                <span
                                    style={{
                                        fontSize: '16px',
                                        color: '#aaa',
                                        fontWeight: 'normal',
                                        marginLeft: '10px',
                                    }}
                                >
                                    (세계랭킹 1위)
                                </span>
                            </h2>
                            <ul
                                style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                    fontSize: '14px',
                                    color: '#ccc',
                                    lineHeight: '1.6',
                                }}
                            >
                                <li>최근 경기: 네덜란드 4:5 대한민국 (준결승)</li>
                                <li>2020 도쿄 올림픽 여자 단체전 금메달</li>
                                <li>2016 리우 올림픽 여자 단체전 금메달</li>
                                <li>2012 런던 올림픽 여자 단체전 금메달</li>
                            </ul>
                        </div>
                    </div>
                    {/* 1. 감독 정보 Box */}
                    <div
                        style={{
                            backgroundColor: '#1a1a1a',
                            borderRadius: '12px',
                            border: '1px solid #333',
                            marginBottom: '20px', // 선수 리스트와 간격
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                padding: '30px 40px',
                            }}
                        >
                            <img
                                src="/images/team/korea4.jpg"
                                alt="감독"
                                style={{
                                    width: '90px',
                                    height: '90px',
                                    objectFit: 'cover',
                                    borderRadius: '6px',
                                }}
                            />
                            <div>
                                <div
                                    style={{
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        marginBottom: '8px',
                                    }}
                                >
                                    감독 양창훈
                                </div>
                                <div style={{ fontSize: '11px', color: '#aaa', lineHeight: '1.6' }}>
                                    現 대표팀 남녀 총감독 <br />
                                    2015-2016 대한민국 리커브 여자 감독 <br />
                                    2010 대한민국 리커브 남자 코치 <br />
                                    2001-2004 중국대표팀 감독
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. 선수 리스트 Box */}
                    <div
                        style={{
                            backgroundColor: '#1a1a1a',
                            borderRadius: '12px',
                            border: '1px solid #333',
                            overflow: 'hidden',
                        }}
                    >

                        {/* 선수 리스트 */}
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

                <div className="team-vs-text">
                    VS
                </div>

                {/* 중국 팀 */}
                <div className="team-side">
                    <div className="team-header">
                        <img
                            src="https://flagcdn.com/w160/cn.png"
                            alt="CN"
                            className="team-flag-img"
                        />
                        <div>
                            <h2 style={{ margin: '0 0 10px 0', fontSize: '28px', color: '#fff' }}>
                                중국
                                <span
                                    style={{
                                        fontSize: '16px',
                                        color: '#aaa',
                                        fontWeight: 'normal',
                                        marginLeft: '10px',
                                    }}
                                >
                                    (세계랭킹 2위)
                                </span>
                            </h2>
                            <ul
                                style={{
                                    listStyle: 'none',
                                    padding: 0,
                                    margin: 0,
                                    fontSize: '14px',
                                    color: '#ccc',
                                    lineHeight: '1.6',
                                }}
                            >
                                <li>최근 경기: 멕시코 3:5 중국 (준결승)</li>
                                <li>2020 도쿄 올림픽 여자 단체전 9위</li>
                                <li>2016 리우 올림픽 여자 단체전 7위</li>
                                <li>2012 런던 올림픽 여자 단체전 은메달</li>
                            </ul>
                        </div>
                    </div>
                    {/* 1. 감독 정보 Box */}
                    <div
                        style={{
                            backgroundColor: '#1a1a1a',
                            borderRadius: '12px',
                            border: '1px solid #333',
                            marginBottom: '20px',
                            overflow: 'hidden',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '15px',
                                padding: '30px 40px',
                            }}
                        >
                            <img
                                src="/images/team/china4.jpg"
                                alt="감독"
                                style={{
                                    width: '90px',
                                    height: '90px',
                                    objectFit: 'cover',
                                    borderRadius: '6px',
                                }}
                            />
                            <div>
                                <div
                                    style={{
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                        color: '#fff',
                                        marginBottom: '8px',
                                    }}
                                >
                                    감독 권용학
                                </div>
                                <div style={{ fontSize: '11px', color: '#aaa', lineHeight: '1.6' }}>
                                    現 중국 대표팀 여자 총감독 <br />
                                    2022-2025 중국 리커브 여자 감독 <br />
                                    상하이시 대표팀 감독 <br />
                                    장쑤성 대표팀 감독
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. 선수 리스트 Box */}
                    <div
                        style={{
                            backgroundColor: '#1a1a1a',
                            borderRadius: '12px',
                            border: '1px solid #333',
                            overflow: 'hidden',
                        }}
                    >

                        {/* 선수 리스트 */}
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
            </div>
        </div>
    );
};

export default Team;
