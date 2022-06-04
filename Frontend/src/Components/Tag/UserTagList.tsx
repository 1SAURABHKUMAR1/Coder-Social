import { memo } from 'react';
import { Link } from 'react-router-dom';

import { SingleTagDescription } from '../../Types';

import randomColor from '../../Utils/randomColor';

export interface UserTagListProps {
    tagsArray: Array<SingleTagDescription>;
    tagsState: string;
}

const UserTagList = ({ tagsArray, tagsState }: UserTagListProps) => {
    return (
        <>
            {tagsState === 'FULFILLED' && (
                <ul className="home-sidebar-tags mobile-side-drawer-list">
                    {tagsArray.map((tag: SingleTagDescription) => {
                        const color = randomColor();
                        return (
                            <li
                                className="list-item hover-list-home"
                                key={tag.tag_id}
                            >
                                <Link
                                    to={`/tag/${tag.name}`}
                                    className="flex gap-2"
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
                                    <h1 className="single-tag-name">
                                        {tag.name}
                                    </h1>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
};

export default memo(UserTagList);
