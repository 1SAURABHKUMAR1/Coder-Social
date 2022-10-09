import { memo, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';

import { followUnfollowTag } from '../../../index';

import randomColor from '../../../../Utils/randomColor';
import { SingleTagProps } from '../../../../Types';
import quotes from '../../../../Utils/quotes.json';

const SingleTagBox = ({
    name,
    numberOfPost,
    tag_id,
    followers,
}: SingleTagProps) => {
    const [color] = useState(() => randomColor());
    const [randomQuotesText] = useState(
        () => quotes[Math.floor(Math.random() * quotes.length)].text,
    );

    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { tags, followUnfollowStatus } = useAppSelector(
        (state) => state.tags,
    );
    const { id, login } = useAppSelector((state) => state.authenticate);

    const handleFollow = () => {
        if (!login) {
            navigate('/login', { state: { from: location } });
            return;
        }

        setIsFollowed(!isFollowed);

        dispatch(followUnfollowTag(tag_id));
    };

    useEffect(() => {
        setIsFollowed(followers.includes(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tags, id]);

    return (
        <>
            <div
                className="single-tag"
                style={{
                    // @ts-ignore
                    '--border-top-color': `rgba(${color}, 0.95)`,
                }}
                data-testid="tag-container"
            >
                <h3 className="single-tag-header">
                    <Link
                        className="single-tag-hash"
                        style={{
                            // @ts-ignore
                            '--hover-color': `rgba(${color}, 0.9)`,
                        }}
                        to={`/tag/${name}`}
                    >
                        <span
                            className="single-tag-hash-single"
                            style={{
                                // @ts-ignore
                                '--tag-color': `rgba(${color}, 0.95)`,
                            }}
                        >
                            #
                        </span>
                        <h1 className="single-tag-name">{name}</h1>
                    </Link>
                </h3>
                <p className="single-tag-description">{randomQuotesText}</p>
                <p className="single-tag-number-post">
                    {numberOfPost} posts published
                </p>

                <div className="width-100">
                    <button
                        className="post-save single-tag-save"
                        disabled={followUnfollowStatus === 'PENDING'}
                        onClick={handleFollow}
                    >
                        {isFollowed ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default memo(SingleTagBox);
