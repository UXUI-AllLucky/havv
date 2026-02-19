import { useState } from 'react';
import { mySportsData, leagueDataList } from '../../../store/mySportsData';
import useDragScroll from '../../../store/useDragScroll';
import './style.scss';

const MySports = () => {
    const [activeTab, setActiveTab] = useState('TEAM');

    const { scrollRef, onDragStart, onDragEnd, onDragMove } = useDragScroll();

    // 1. 현재 탭에 맞는 데이터를 먼저 선택합니다.
    const rawData = activeTab === 'TEAM' ? mySportsData : leagueDataList;

    // 2. 라이브 중인(isLive: true) 항목이 맨 앞으로 오도록 정렬합니다.
    // [...rawData] 처럼 스프레드 연산자를 쓰면 원본 데이터를 건드리지 않고 안전하게 복사본을 정렬할 수 있습니다.
    const sortedData = [...rawData].sort((a, b) => {
        if (a.isLive === b.isLive) return 0; // 둘 다 라이브거나 둘 다 아니면 순서 유지
        return a.isLive ? -1 : 1; // a가 라이브면 앞으로(-1), b가 라이브면 뒤로(1)
    });

    return (
        <section className="my-sports">
            <div className="inner">
                <h4>MY SPORTS</h4>

                <div className="tab-menu">
                    <button
                        className={activeTab === 'TEAM' ? 'active' : ''}
                        onClick={() => setActiveTab('TEAM')}
                    >
                        <p>TEAM</p>
                    </button>
                    <button
                        className={activeTab === 'LEAGUE' ? 'active' : ''}
                        onClick={() => setActiveTab('LEAGUE')}
                    >
                        <p>LEAGUE</p>
                    </button>
                </div>

                <div
                    className="sports-list-container"
                    ref={scrollRef} /* 3. 연결 */
                    onMouseDown={onDragStart} /* 4. 이벤트 연결 */
                    onMouseMove={onDragMove}
                    onMouseUp={onDragEnd}
                    onMouseLeave={onDragEnd}
                >
                    <div className="sports-list">
                        {/* 3. 정렬된 데이터(sortedData)를 사용하여 리스트를 만듭니다. */}
                        {sortedData.map((item) => (
                            <div key={item.id} className="sports-item">
                                <div className="img-box">
                                    <img src={item.img} alt={item.nameKr} />
                                    {item.isLive && <span className="live-dot"></span>}
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

export default MySports;
