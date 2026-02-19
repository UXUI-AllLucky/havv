import { Link } from 'react-router-dom';
import useDragScroll from '../../../store/useDragScroll';
import './style.scss';

const Highlight = ({ highlightVideos, style, className }) => {
    const { scrollRef, onDragStart, onDragEnd, onDragMove } = useDragScroll();

    return (
        <section className={`highlight-section ${className || ''}`} style={style}>
            <div className="highlight-title">
                <h4>최신 하이라이트</h4>
                <span className="more">
                    더보기
                    <img src="/images/arrow.svg" alt="more" />
                </span>
            </div>

            <div
                className="highlight-container"
                ref={scrollRef}
                onMouseDown={onDragStart}
                onMouseMove={onDragMove}
                onMouseUp={onDragEnd}
                onMouseLeave={onDragEnd}
            >
                {/* highlightVideos가 존재할 때만 렌더링하도록 안전장치 추가(권장) */}
                {highlightVideos &&
                    highlightVideos.map((video, index) => (
                        <Link to={`/detail/${video.id}`} key={`${video.id}_${index}`} className="hightlight-card">
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

                                <div className="highlight-text">
                                    <strong>{video.title}</strong>
                                    <p>{video.desc}</p>
                                    <span className="highlight_date">{video.date}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </section>
    );
};

export default Highlight;
