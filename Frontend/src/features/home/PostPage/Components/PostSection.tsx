import { useAppSelector } from '../../../../store/hooks';

import Markdown from 'markdown-to-jsx';

import 'github-markdown-css';

import PostAuthor from '../../../../Components/Posts/PostAuthor';
import PostEditDelete from './PostEditDelete';
import TagList from '../../../../Components/Tag/TagList';
import Code from '../../../../Components/Code/Code';

import ConvertDate from '../../../../Utils/ConvertDate';

import { PostSectionProps } from '../../../../Types';

const PostSection = ({
    image,
    heading,
    authorImage,
    authorName,
    authorUsername,
    authorUserId,
    postDate,
    postId,
    postDescription,
    tagsArray,
    children,
}: PostSectionProps) => {
    const [dateOnPosted] = ConvertDate(postDate, 'DD MMM');

    const { login, userId } = useAppSelector((state) => state.authenticate);

    return (
        <main className="post-section">
            <li className="post-single border-desktop">
                {image && (
                    <div
                        className="post-image padding-42"
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                        data-testid="post-image"
                    ></div>
                )}
                <div className="post-description post-single-padding">
                    <div className="post-author margin-small-profile justify-between row-m-col-d">
                        <PostAuthor
                            authorImage={authorImage}
                            authorName={authorName}
                            postDate={dateOnPosted}
                            authorUsername={authorUsername}
                        />
                        {login && userId === authorUserId && (
                            <PostEditDelete postId={postId} />
                        )}
                    </div>
                    <div className="post-about margin-small-profile">
                        <div className="post-title" data-testid="post-heading">
                            {heading}
                        </div>

                        <TagList tagsArray={tagsArray} />
                    </div>
                    <div
                        data-testid="post-content"
                        className="margin-small-profile post-description-single markdown-body"
                    >
                        <Markdown
                            options={{
                                overrides: {
                                    code: {
                                        component: Code,
                                        props: {
                                            className: '',
                                        },
                                    },
                                },
                            }}
                        >
                            {postDescription}
                        </Markdown>
                    </div>
                </div>
                <div
                    id="paddding-top-3"
                    className="post-single-padding border-top"
                >
                    {children}
                </div>
            </li>
        </main>
    );
};

export default PostSection;
