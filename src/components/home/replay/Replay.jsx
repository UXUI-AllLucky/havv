import { Link } from 'react-router-dom';
import useDragScroll from '../../../store/useDragScroll';
import './style.scss';

const Replay = ({ replayVideos }) => {
    const { scrollRef, onDragStart, onDragEnd, onDragMove } = useDragScroll();

    return (
        <section className="repaly-section">
            <div className="repaly-title">
                <h4>다시보기</h4>
                <span className="more">
                    더보기
                    <img src="/images/arrow.svg" alt="more" />
                </span>
            </div>

            <div
                className="repaly-container"
                ref={scrollRef}
                onMouseDown={onDragStart}
                onMouseMove={onDragMove}
                onMouseUp={onDragEnd}
                onMouseLeave={onDragEnd}
            >
                {/* highlightVideos가 존재할 때만 렌더링하도록 안전장치 추가(권장) */}
                {replayVideos &&
                    replayVideos.map((video, index) => (
                        <Link to={`/detail/${video.id}`} key={`${video.id}_${index}`} className="repaly-card">
                            <div className="thumb">
                                <div className="img-box">
                                    <img src={video.img} alt={video.title} />
                                    <div className="time">
                                        <img
                                            className="playIcon"
                                            src="/images/playIcon.svg"
                                            alt="time"
                                        />
                                        {video.time}
                                    </div>
                                </div>

                                <div className="repaly-text">
                                    <strong>{video.title}</strong>
                                    <span className="repaly-date">{video.date}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </section>
    );
};

export default Replay;
