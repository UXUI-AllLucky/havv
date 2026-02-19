import React from 'react';
import './player.css';

const Player = () => {
    return (
        <div className="player-intro-wrap">
            <h2 className="content-title">SET 2</h2>
            <div className="compare-grid">
                {/* 왼쪽 선수: 임시현 */}
                {/* 왼쪽 선수: 임시현 */}
                <div className="p-card">
                    <div className="player-top-area">
                        <div className="player-image-box">
                            <img src="/images/team/korea2.jpg" alt="임시현" />
                        </div>
                        <div className="player-names">
                            <h3>임시현</h3>
                            <p className="eng">Lim Si-hyeon</p>
                        </div>
                    </div>
                    {/* 숫자를 강조한 스탯 영역 */}
                    <div className="p-stats">
                        <p className="big-num">
                            2<span>위</span>
                        </p>
                        <p className="big-num">
                            689<span>점</span>
                        </p>
                        <p className="big-num">
                            9.51<span>점</span>
                        </p>
                        <p className="big-num">
                            2<span>개</span>
                        </p>
                    </div>
                </div>

                {/* 중앙 라벨 영역 */}
                <div className="v-labels">
                    <div className="player-top-area">
                        <p className="vs-text">VS</p>
                    </div>
                    <div className="p-stats"> {/* Reuse p-stats for consistent gap/layout */}
                        <p>
                            <img src="/images/player/icon1.png" alt="" className="stat-icon" /> 세계
                            랭킹
                        </p>
                        <p>
                            <img src="/images/player/icon2.png" alt="" className="stat-icon" /> 시즌
                            기록
                        </p>
                        <p>
                            <img src="/images/player/icon3.png" alt="" className="stat-icon" /> 평균
                            점수
                        </p>
                        <p>
                            <img src="/images/player/icon4.png" alt="" className="stat-icon" /> 메달
                            획득
                        </p>
                    </div>
                </div>

                {/* 오른쪽 선수: 리 지아만 */}
                <div className="p-card">
                    <div className="player-top-area">
                        <div className="player-image-box">
                            <img src="/images/player/china1.jpg" alt="리 지아만" />
                        </div>
                        <div className="player-names">
                            <h3>리 지아만</h3>
                            <p className="eng">Li Jiaman</p>
                        </div>
                    </div>
                    <div className="p-stats">
                        <p className="big-num">
                            6<span>위</span>
                        </p>
                        <p className="big-num">
                            676<span>점</span>
                        </p>
                        <p className="big-num">
                            9.22<span>점</span>
                        </p>
                        <p className="big-num">
                            2<span>개</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;
