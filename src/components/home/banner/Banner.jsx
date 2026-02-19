import './style.scss';
const Banner = () => {
    return (
        <div className="bannerBox">
            <img className='pc_banner' src="/images/banner.png" alt="banner" />
            <img className='mobile_banner' src="/images/mobile-banner.svg" alt="mobile_banner" />
        </div>
    );
};

export default Banner;
