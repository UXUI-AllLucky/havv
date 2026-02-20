import React from 'react';
import './style.css';
import { FaUser, FaRegCommentDots, FaRegSmile, FaRegPaperPlane } from "react-icons/fa";

const Chat = () => {
    // 임시 데이터 (반복해서 보여주기 위함)
    const messages = Array(10).fill({
        user: '왕티즈',
        text: '대한민국 화이팅',
        image: '/images/dog.png'
        
    });

    return (
        <div className="chat-container">
            {/* 헤더 */}
            <div className="chat-header">
                <div className="left">
                    <FaUser />
                    <span>6.5천</span>
                </div>
                <div className="title">실시간 채팅</div>
                <div className="icon">
                    <FaRegCommentDots />
                </div>
            </div>

            {/* 채팅 리스트 */}
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message-item">
                        <img src={msg.image} alt="profile" className="profile-img" />
                        <div className="message-content">
                            <span className="user-name">{msg.user}</span>
                            <span className="text">{msg.text}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* 입력창 */}
            <div className="chat-input-area">
                <div className="my-profile">
                    {/* 내 프로필 이미지 (임시) */}
                    <img src="/images/dog.png" alt="my-profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                </div>
                <div className="input-box">
                    <input type="text" placeholder="응원의 메시지를 남겨보세요." />
                    <FaRegSmile className="smiley-icon" />
                </div>
                <button className="send-btn">
                    <FaRegPaperPlane />
                </button>
            </div>
        </div>
    );
};

export default Chat;
