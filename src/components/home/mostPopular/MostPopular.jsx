import { Link } from 'react-router-dom';
import useDragScroll from '../../../store/useDragScroll';
import './style.scss';

const MostPopular = ({ popularVideos }) => {
    const { scrollRef, onDragStart, onDragEnd, onDragMove } = useDragScroll();
    return (
        <section className="popular-section">
            <div className="popular-title">
                <h4>인기영상 TOP5</h4>
                <span className="more">
                    더보기
                    <img src="/images/arrow.svg" alt="more" />
                </span>
            </div>

            <div
                className="popular-container"
                ref={scrollRef}
                onMouseDown={onDragStart}
                onMouseMove={onDragMove}
                onMouseUp={onDragEnd}
                onMouseLeave={onDragEnd}
            >
                {popularVideos &&
                    popularVideos.map((video, index) => (
                        <Link
                            to={`/detail/${video.id}`}
                            key={`${video.id}_${index}`}
                            className={`popular-card ${index === 0 ? 'rank-1' : ''}`}
                        >
                            <div className="thumb">
                                <div className="rank-box">
                                    <span className="rank">{index + 1}</span>
                                </div>

                                <div className="img-box">
                                    <img src={video.img} alt={video.title} />
                                    {/* 시간 표시 */}
                                    <div className="time">
                                        <img
                                            className="playIcon"
                                            src="/images/playIcon.svg"
                                            alt="play"
                                        />
                                        {video.time}
                                    </div>
                                    {/* 텍스트 정보 */}
                                    <div className="popular-text">
                                        <span className="popular-date">{video.date}</span>
                                        <strong>{video.title}</strong>
                                        <strong> {video.subTitle}</strong>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </section>
    );
};

export default MostPopular;
