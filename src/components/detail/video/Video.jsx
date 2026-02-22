import React, { useState } from 'react';
import YouTube from 'react-youtube';

const Video = ({ videoId, startTime }) => {
    const opts = {
        width: '100%',
        height: '100%',
        playerVars: {
            autoplay: 1, // 자동재생 (선택사항)
            start: startTime, // 시작 시간 (초 단위)
            rel: 0, // 추천 영상을 현재 채널의 영상으로 제한
            modestbranding: 1, // 유튜브 로고 숨기기 (컨트롤 바)
            mute: 1, // 자동 재생을 위해 음소거 필수
        },
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div
                className="video-container"
                style={{
                    width: '100%',
                    height: '100%', // 16:9 비율은 부모에서 제어하거나 여기서 100%로 채움
                    borderRadius: '12px',
                    overflow: 'hidden',
                }}
            >
                <YouTube
                    videoId={videoId}
                    opts={opts}
                    style={{ width: '100%', height: '100%', display: 'block' }}
                />
            </div>
        </div>
    );
};

export default Video;
