import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

import { getAllTags, SingleTagBox } from '../../index';

import { AllTagProps } from '../../../Types';
import Loader from '../../../Components/Loader/LoaderMain';

const Tags = () => {
    const { tags, getTagStatus } = useAppSelector((state) => state.tags);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const controller = new AbortController();
        let unMounted = false;

        dispatch(getAllTags({ controller, unMounted }));

        return () => {
            controller.abort();
            unMounted = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (getTagStatus === 'PENDING') {
        return <Loader />;
    } else if (getTagStatus === 'REJECTED') {
        return (
            <main className="component component-center component-justify">
                <div className="not-found-header">
                    <span className="text-primary">Not Tag</span>Found
                </div>
                <Link
                    to={'/'}
                    className="button-primary profile-button not-found-button"
                >
                    Return To Home
                </Link>
            </main>
        );
    } else {
        return (
            <div className="component component-no-p-m  component-pt-5">
                <div className="container-layout">
                    <div className="tags-grid-container">
                        {tags.map((tag: AllTagProps) => {
                            return (
                                <SingleTagBox
                                    name={tag.name}
                                    numberOfPost={tag.posts.length}
                                    tag_id={tag.tag_id}
                                    followers={tag.followers}
                                    key={tag.tag_id}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
};

export default Tags;
