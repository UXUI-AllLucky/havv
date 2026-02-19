import { Link } from 'react-router-dom';
import useDragScroll from '../../../store/useDragScroll';

import './style.scss';

const Live = ({ videos }) => {
    const { scrollRef, onDragStart, onDragEnd, onDragMove } = useDragScroll();
    return (
        <section className="live-section">
            <div className="live-title">
                <h4>
                    <img src="/images/live/live_icon.svg" alt="live" />
                    LIVE 스트리밍
                </h4>
                <span className="more">
                    더보기
                    <img src="/images/arrow.svg" alt="more" />
                </span>
            </div>

            <div
                className="live-container"
                ref={scrollRef} /* 3. 연결 */
                onMouseDown={onDragStart} /* 4. 이벤트 연결 */
                onMouseMove={onDragMove}
                onMouseUp={onDragEnd}
                onMouseLeave={onDragEnd}
            >
                {videos.map((video, index) => (
                    <Link to={`/detail/${video.id}`} key={`${video.id}_${index}`} className="live-card">
                        <div className="thumb-box">
                            {/* 썸네일 이미지는 공통 */}
                            <img src={video.customThumbnail} alt={video.displayTitle} />

                            {/* --- 라이브일 때만 보이는 요소들 --- */}
                            {video.isLive && (
                                <div>
                                    <div className="live-badge">
                                        <p>LIVE</p>
                                        <span className="view-count">
                                            <img src="/images/live/view-icon.svg" alt="views" />
                                            2,311명 시청
                                        </span>
                                    </div>
                                    <div className="live-text">
                                        <h3>{video.displayTitle}</h3>
                                        <p>{video.desc}</p>
                                    </div>
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: '30%' }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            {/* --- 공통 텍스트 레이어 (덮어씌우기) --- */}
                            {!video.isLive && (
                                <div className="expected">
                                    {/* 썸네일 이미지 */}
                                    <img src={video.customThumbnail} alt={video.displayTitle} />
                                    <div className="overlay-text">
                                        {/* 중계 예정(false)일 때만 날짜/시간 표시 */}
                                        <h3>{video.desc}</h3>
                                        <p>{video.displayTitle}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default Live;
