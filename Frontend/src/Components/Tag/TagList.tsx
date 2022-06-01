import { Link } from 'react-router-dom';

import { SingleTag } from '../../Types';

import randomColor from '../../Utils/randomColor';

export interface TagListProps {
    tagsArray: Array<SingleTag>;
}

const TagList = ({ tagsArray }: TagListProps) => {
    return (
        <>
            {tagsArray?.length > 0 && (
                <div className="post-tag-wrapper">
                    {tagsArray.map((tag: SingleTag) => {
                        const color = randomColor();

                        return (
                            <Link
                                to={`/tag/${tag?.name}`}
                                className={`post-tag`}
                                style={{
                                    // @ts-ignore
                                    '--hover-color': `rgba(${color}, 0.9)`,
                                }}
                                key={tag?._id}
                            >
                                <span
                                    className="post-tag-hashtag"
                                    style={{
                                        // @ts-ignore
                                        '--tag-color': `rgba(${color}, 0.95)`,
                                    }}
                                    key={tag?._id}
                                >
                                    #
                                </span>
                                {tag?.name}
                            </Link>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default TagList;
