const TabMenu = ({ activeTab, setActiveTab }) => {
    return (
        <div className="tab-menu">
            <button
                onClick={() => setActiveTab('player')}
                className={activeTab === 'player' ? 'active' : ''}
            >
                선수소개
            </button>

            <button
                onClick={() => setActiveTab('team')}
                className={activeTab === 'team' ? 'active' : ''}
            >
                팀소개
            </button>

            <button
                onClick={() => setActiveTab('chat')}
                className={activeTab === 'chat' ? 'active' : ''}
            >
                경기상황
            </button>
        </div>
    );
};

export default TabMenu;
