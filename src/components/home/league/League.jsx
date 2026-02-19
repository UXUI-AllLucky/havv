import { useState } from 'react';
import { mySportsData, leagueDataList } from '../../../store/mySportsData';
import useDragScroll from '../../../store/useDragScroll';
import './style.scss';

const League = () => {
    // 1. 초기 탭을 'LEAGUE'로 설정
    const [activeTab, setActiveTab] = useState('LEAGUE');

    const { scrollRef, onDragStart, onDragEnd, onDragMove } = useDragScroll();

    // 2. 현재 탭에 맞는 데이터를 선택 (별도의 정렬 없이 그대로 사용)
    const displayData = activeTab === 'LEAGUE' ? leagueDataList : mySportsData;

    return (
        <section className="league">
            <div className="inner">
                <div className="tab-menu">
                    <button
                        className={activeTab === 'LEAGUE' ? 'active' : ''}
                        onClick={() => setActiveTab('LEAGUE')}
                    >
                        <p> LEAGUE</p>
                    </button>
                    <button
                        className={activeTab === 'TEAM' ? 'active' : ''}
                        onClick={() => setActiveTab('TEAM')}
                    >
                        <p>CUP</p>
                    </button>
                </div>

                <div
                    className="league-container"
                    ref={scrollRef}
                    onMouseDown={onDragStart}
                    onMouseMove={onDragMove}
                    onMouseUp={onDragEnd}
                    onMouseLeave={onDragEnd}
                >
                    <div className="sports-list">
                        {displayData.map((item) => (
                            <div key={item.id} className="league-item">
                                <div className="img-box">
                                    <img src={item.img} alt={item.nameKr} />
                                    {/* ⭐ 라이브 표시(live-dot) 제거됨 */}
                                </div>
                                <div className="text-box">
                                    <strong>{item.nameKr}</strong>
                                    <span>{item.nameEn}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default League;
