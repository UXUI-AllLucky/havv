import Visual from '../components/home/visual/Visual';
import MySports from '../components/home/mySports/MySports';
import Live from '../components/home/live/Live';
import { sportsVideos } from '../store/videoData'; // 1. 데이터 불러오기
import { highlightData } from '../store/highlightData';
import { popularData } from '../store/popularData';
import { replayData } from '../store/replayData';
import Banner from '../components/home/banner/Banner';
import Highlight from '../components/home/highlight/Highlight';
import MostPopular from '../components/home/mostPopular/MostPopular';
import OriginalSerise from '../components/home/originalSerise/OriginalSerise';
import Replay from '../components/home/replay/Replay';
import League from '../components/home/league/League';

const Home = () => {
    return (
        <div>
            <Visual />
            <section id="mySport">
                <MySports />
            </section>

            <Live videos={sportsVideos} />
            <Banner />
            <Highlight highlightVideos={highlightData} />
            <MostPopular popularVideos={popularData} />
            <OriginalSerise />
            <Replay replayVideos={replayData} />
            <League />
        </div>
    );
};

export default Home;
