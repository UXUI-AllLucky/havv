import './style.scss';

const Visual = () => {
    return (
        <div>
            <div className="main-banner">
                <img className="pc-banner" src="/images/main-banner.jpg" alt="main-banner" />
                <button>
                    <p>바로가기</p>
                </button>
                <img
                    className="mobile-banner"
                    src="/images/mobile_banner.jpg"
                    alt="Mobile Banner"
                />
            </div>
        </div>
    );
};

export default Visual;
