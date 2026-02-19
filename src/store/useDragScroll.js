import { useState, useRef } from 'react';

const useDragScroll = () => {
    const scrollRef = useRef(null);
    const [isDrag, setIsDrag] = useState(false);
    const [startX, setStartX] = useState(0);

    const onDragStart = (e) => {
        e.preventDefault();
        setIsDrag(true);
        // 현재 스크롤 위치 + 클릭한 마우스 위치 저장
        setStartX(e.pageX + scrollRef.current.scrollLeft);
    };

    const onDragEnd = () => {
        setIsDrag(false);
    };

    const onDragMove = (e) => {
        if (!isDrag) return;
        // 이동 거리 계산 후 스크롤 위치 업데이트
        scrollRef.current.scrollLeft = startX - e.pageX;
    };

    // 컴포넌트에서 필요한 것들만 내보내기
    return {
        scrollRef,
        onDragStart,
        onDragEnd,
        onDragMove,
        isDrag, // 현재 드래그 상태가 궁금할 때 사용
    };
};

export default useDragScroll;
