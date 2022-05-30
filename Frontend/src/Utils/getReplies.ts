import { CommentBody } from '../Types';

export const getReplies = (comments: CommentBody[], commentId: string) => {
    return (
        comments &&
        comments.filter(
            (comment) => comment && comment.parent_comment === commentId,
        )
    );
};
