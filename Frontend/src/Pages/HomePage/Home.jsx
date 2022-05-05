import LeftSideBar from '../../Components/HomePage/LeftSideBar/LeftSideBar';
import RightSideBar from '../../Components/HomePage/RightSideBar/RightSideBar';
import PostContainer from '../../Components/Shared/PostsContainer/PostContainer';

const Home = () => {
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
