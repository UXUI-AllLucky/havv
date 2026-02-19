import React, { useState } from 'react';
import './MatchStatus.css';

const MatchStatus = () => {
    // 1. 데이터 구조화: 선수별로 개별 화살 좌표와 점수를 가짐
    const korTeam = [
        { name: '전훈영', shots: [{ x: 100, y: 100, score: 10 }] },
        { name: '남수현', shots: [{ x: 110, y: 105, score: 9 }] },
        { name: '임시현', shots: [{ x: 95, y: 95, score: 10 }] },
    ];

    const chnTeam = [
        { name: 'AN QIXYAN', shots: [{ x: 130, y: 110, score: 8 }] },
        { name: 'LI JIAMAN', shots: [{ x: 100, y: 105, score: 10 }] },
        { name: 'YANG XIAOLEI', shots: [{ x: 90, y: 95, score: 9 }] },
    ];

    const [korIdx, setKorIdx] = useState(2); // 초기값 임시현
    const [chnIdx, setChnIdx] = useState(2); // 초기값 YANG XIAOLEI

    const TargetBoard = ({ team, playerIdx, isChina = false }) => {
        // 선수 순서에 따른 화살 색상 테마:
        // 1번(0): 검정, 2번(1): 회색, 3번(2): 흰색
        const themes = [
            { bg: '#000000', text: 'white', border: 'white' }, // 1번 (검정)
            { bg: '#888888', text: 'white', border: 'white' }, // 2번 (회색)
            { bg: '#ffffff', text: 'black', border: '#444' }, // 3번 (흰색)
        ];

        // 선택된 선수까지 누적해서 보여줌
        const shotsToRender = [];
        // 0번(1번선수) ~ playerIdx(현재선수) 까지 순회
        team.slice(0, playerIdx + 1).forEach((player, idx) => {
            const playerTheme = themes[idx];
            player.shots.forEach((shot) => {
                shotsToRender.push({ ...shot, theme: playerTheme });
            });
        });

        return (
            <svg viewBox="0 0 200 200" className="target-svg">
                {/* 과녁판 원형들 */}
                <circle
                    cx="100"
                    cy="100"
                    r="95"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                />
                <circle cx="100" cy="100" r="90" fill="white" />
                <circle cx="100" cy="100" r="72" fill="#111" />
                <circle cx="100" cy="100" r="54" fill="#009edb" />
                <circle cx="100" cy="100" r="36" fill="#e4002b" />
                <circle cx="100" cy="100" r="18" fill="#ffcc00" />

                {/* 화살 렌더링 */}
                {shotsToRender.map((s, i) => (
                    <g key={i} transform={`translate(${s.x}, ${s.y})`}>
                        <circle r="8" fill={s.theme.bg} stroke={s.theme.border} strokeWidth="1" />
                        <text
                            y="3"
                            textAnchor="middle"
                            fontSize="9"
                            fontWeight="bold"
                            fill={s.theme.text}
                        >
                            {s.score}
                        </text>
                    </g>
                ))}
            </svg>
        );
    };

    return (
        <div className="match-status-container">
            <div className="match-set-title">SET 2</div>

            <div className="match-dashboard">
                {/* 대한민국 팀 박스 */}
                <div className="team-card">
                    <div className="team-info-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <img src="https://flagcdn.com/w40/kr.png" alt="KR" style={{ width: '40px', borderRadius: '4px' }} />
                        <span>대한민국</span>
                    </div>
                    <div className="target-area-box">
                        <div className="wind-indicator">
                            <span className="arrow">↗</span>
                            <span className="speed">0.7m/s</span>
                        </div>
                        <TargetBoard team={korTeam} playerIdx={korIdx} isChina={false} />
                    </div>
                    <div className="player-selection-tabs">
                        {korTeam.map((p, i) => (
                            <button
                                key={p.name}
                                className={`player-tab-btn ${korIdx === i ? 'active-kor' : ''}`}
                                onClick={() => setKorIdx(i)}
                            >
                                {p.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 중국 팀 박스 */}
                <div className="team-card">
                    <div className="team-info-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <img src="https://flagcdn.com/w40/cn.png" alt="CN" style={{ width: '40px', borderRadius: '4px' }} />
                        <span>중국</span>
                    </div>
                    <div className="target-area-box">
                        <div className="wind-indicator">
                            <span className="arrow">↗</span>
                            <span className="speed">0.7m/s</span>
                        </div>
                        <TargetBoard team={chnTeam} playerIdx={chnIdx} isChina={true} />
                    </div>
                    <div className="player-selection-tabs">
                        {chnTeam.map((p, i) => (
                            <button
                                key={p.name}
                                className={`player-tab-btn ${chnIdx === i ? 'active-chn' : ''}`}
                                onClick={() => setChnIdx(i)}
                            >
                                {p.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchStatus;
