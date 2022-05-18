import LeftSideBar from '../../Components/HomePage/LeftSideBar/LeftSideBar';
import RightSideBar from '../../Components/HomePage/RightSideBar/RightSideBar';
import PostContainer from '../../Components/HomePage/PostsContainer/PostContainer';

import useScrollToTop from '../../Hooks/useScrollToTop';

const Home = () => {
    useScrollToTop();

    return (
        <div className="component">
            <div className="container-layout">
                <div className="container-sidebar">
                    <LeftSideBar />
                </div>
                <PostContainer />
                <RightSideBar />
            </div>
        </div>
    );
};

export default Home;
