import React from 'react';
import '../point/style.css'; // Point 컴포넌트의 스타일 재사용
import './matchRecord.css'; // 추가적인 간격 조정 등

const MatchRecord = ({ recordData }) => {
    const sets = [1, 2, 3, 4];

    // 점수 배열을 항상 6개로 채워주는 헬퍼 함수
    const padScores = (scores) => {
        const padded = [...scores];
        while (padded.length < 6) {
            padded.push(''); // 빈 문자열로 채움
        }
        return padded;
    };

    return (
        <div className="match-record-container">
            {sets.map((setNum) => {
                const data = recordData[setNum]; // 부모로부터 받은 데이터 사용

                return (
                    <div key={setNum} className="record-set-block">
                        <h3 className="record-set-title">SET {setNum}</h3>

                        {/* Point.jsx와 동일한 구조의 Score Card */}
                        <div className="score-card">
                            {/* 대한민국 행 */}
                            <div className="score-row">
                                <div className="t-info">
                                    <img src="/images/team/korealogo.jpg" alt="KOR" className="row-flag" />
                                    <span>KOR</span>
                                </div>
                                <div className="s-point highlight">
                                    {data ? (data.kor.total > data.chn.total ? 2 : data.kor.total === data.chn.total ? 1 : 0) : ''}
                                </div>
                                <div className="arrows">
                                    {data ? (
                                        padScores(data.kor.scores).map((score, idx) => (
                                            <span key={idx}>{score}</span>
                                        ))
                                    ) : (
                                        <>
                                            <span></span><span></span><span></span><span></span><span></span><span></span>
                                        </>
                                    )}
                                </div>
                                <div className="total">
                                    {data ? data.kor.total : ''}
                                </div>
                            </div>

                            {/* 중국 행 */}
                            <div className="score-row">
                                <div className="t-info">
                                    <img src="/images/team/chinalogo.jpg" alt="CHN" className="row-flag" />
                                    <span>CHN</span>
                                </div>
                                <div className="s-point highlight">
                                    {data ? (data.chn.total > data.kor.total ? 2 : data.chn.total === data.kor.total ? 1 : 0) : ''}
                                </div>
                                <div className="arrows">
                                    {data ? (
                                        padScores(data.chn.scores).map((score, idx) => (
                                            <span key={idx}>{score}</span>
                                        ))
                                    ) : (
                                        <>
                                            <span></span><span></span><span></span><span></span><span></span><span></span>
                                        </>
                                    )}
                                </div>
                                <div className="total">
                                    {data ? data.chn.total : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MatchRecord;
