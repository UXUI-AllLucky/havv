import React, { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import './Video.css';

const Video = ({ videoId, startTime }) => {
    const [player, setPlayer] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(100);
    const [showControls, setShowControls] = useState(true);
    const containerRef = useRef(null);
    const controlsTimeout = useRef(null);

    const opts = {
        width: '100%',
        height: '100%',
        playerVars: {
            autoplay: 1,
            start: startTime,
            rel: 0,
            modestbranding: 1,
            controls: 0, // 기본 컨트롤 숨김
            disablekb: 1, // 키보드 컨트롤도 일단 비활성화 (커스텀 구현 가능)
            mute: 1,
            iv_load_policy: 3,
        },
    };

    // 시간 업데이트
    useEffect(() => {
        let interval;
        if (player && isPlaying) {
            interval = setInterval(() => {
                setCurrentTime(player.getCurrentTime());
            }, 100);
        }
        return () => clearInterval(interval);
    }, [player, isPlaying]);

    const onReady = (event) => {
        const p = event.target;
        setPlayer(p);
        setDuration(p.getDuration());
        setIsPlaying(p.getPlayerState() === 1);
    };

    const onStateChange = (event) => {
        // -1: unstarted, 0: ended, 1: playing, 2: paused, 3: buffering, 5: cued
        setIsPlaying(event.data === 1);
    };

    const togglePlay = () => {
        if (!player) return;
        if (isPlaying) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    };

    const handleSeek = (e) => {
        if (!player) return;
        const seekTo = (e.target.value / 100) * duration;
        player.seekTo(seekTo, true);
        setCurrentTime(seekTo);
    };

    const toggleMute = () => {
        if (!player) return;
        if (isMuted) {
            player.unMute();
            setIsMuted(false);
        } else {
            player.mute();
            setIsMuted(true);
        }
    };

    const handleVolumeChange = (e) => {
        if (!player) return;
        const v = parseInt(e.target.value);
        setVolume(v);
        player.setVolume(v);
        if (v > 0) {
            player.unMute();
            setIsMuted(false);
        } else {
            player.mute();
            setIsMuted(true);
        }
    };

    const toggleFullscreen = () => {
        if (!containerRef.current) return;
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
        controlsTimeout.current = setTimeout(() => {
            if (isPlaying) setShowControls(false);
        }, 3000);
    };

    return (
        <div 
            ref={containerRef}
            className="video-wrapper" 
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            <YouTube
                videoId={videoId}
                opts={opts}
                onReady={onReady}
                onStateChange={onStateChange}
                style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
            />

            {/* Click to play/pause overlay */}
            <div 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 'calc(100% - 60px)', cursor: 'pointer' }}
                onClick={togglePlay}
            />

            <div className={`custom-controls ${showControls ? 'visible' : ''}`}>
                <div className="progress-container">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={duration ? (currentTime / duration) * 100 : 0}
                        onChange={handleSeek}
                        style={{
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            opacity: 0,
                            cursor: 'pointer',
                        }}
                    />
                    <div className="progress-bar" style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}></div>
                </div>

                <div className="controls-main">
                    <div className="controls-left">
                        <button className="control-btn" onClick={togglePlay}>
                            {isPlaying ? (
                                <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                            ) : (
                                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            )}
                        </button>
                        <div className="time-display">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                    </div>

                    <div className="controls-right">
                        <div className="volume-container">
                            <button className="control-btn" onClick={toggleMute}>
                                {isMuted || volume === 0 ? (
                                    <svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM4 9v6h4l5 5V4L8 9H4zM19 12c0 4.28-2.99 7.86-7 8.77v2.06c5.13-.91 9-5.39 9-10.83s-3.87-9.92-9-10.83v2.06c4.01.91 7 4.49 7 8.77z"/></svg>
                                ) : (
                                    <svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L8 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
                                )}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="volume-slider"
                            />
                        </div>

                        <button className="control-btn">
                            <svg viewBox="0 0 24 24"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41l-0.36,2.45c-0.59,0.24-1.13,0.56-1.62,0.94l-2.39-0.96c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.45 c0.04,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.43-0.17,0.47-0.41l0.36-2.45c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.5c-1.93,0-3.5-1.57-3.5-3.5 s1.57-3.5,3.5-3.5s3.5,1.57,3.5,3.5S13.93,15.5,12,15.5z"/></svg>
                        </button>

                        <button className="control-btn" onClick={toggleFullscreen}>
                            <svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Video;
