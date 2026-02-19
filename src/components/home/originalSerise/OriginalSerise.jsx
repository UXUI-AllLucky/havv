import useDragScroll from '../../../store/useDragScroll';
import './style.scss';

const OriginalSerise = () => {
    const { scrollRef, onDragStart, onDragEnd, onDragMove } = useDragScroll();
    return (
        <div className="original">
            <div className="original-title">
                <h4>오리지널 시리즈</h4>
                <span className="more">
                    더보기
                    <img src="/images/arrow.svg" alt="more" />
                </span>
            </div>

            <ul
                ref={scrollRef}
                onMouseDown={onDragStart}
                onMouseMove={onDragMove}
                onMouseUp={onDragEnd}
                onMouseLeave={onDragEnd}
            >
                {/* li 아이템들... */}
                <li>
                    <img src="/images/original/originalSerise1.jpg" alt="1" />
                </li>
                <li>
                    <img src="/images/original/originalSerise2.jpg" alt="2" />
                </li>
                <li>
                    <img src="/images/original/originalSerise3.jpg" alt="3" />
                </li>
                <li>
                    <img src="/images/original/originalSerise4.jpg" alt="4" />
                </li>
                <li>
                    <img src="/images/original/originalSerise5.jpg" alt="5" />
                </li>
            </ul>
        </div>
    );
};

export default OriginalSerise;
