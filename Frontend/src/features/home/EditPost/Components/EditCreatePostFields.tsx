import TextField from '../../../../Components/InputField/TextField';
import TagsInput from '../../../../Components/Forms/TagsInput';
import PostAvatar from '../../../../Components/InputField/PostAvatar';

import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import { EditPostFieldProps } from '../../../../Types';

const EditCreatePostFields = ({
    title,
    setTitle,
    tagArray,
    setTagArray,
    picture,
    setPicture,
    content,
    setContent,
}: EditPostFieldProps) => {
    const handle = (name: string) => {
        setContent(name);
    };

    return (
        <>
            <div className="flex-gap-5" data-testid="edit-post-form">
                <TextField
                    htmlFor="title"
                    inputId="title"
                    labelTitle="Title"
                    inputPlaceHolder="Enter post title..."
                    value={title}
                    setValue={setTitle}
                    required={true}
                    key={'title'}
                />
                <TagsInput
                    htmlFor="tag"
                    labelTitle="Tags"
                    inputId="tag"
                    inputPlaceHolder="Enter tags for posts...."
                    tags={tagArray}
                    setTags={setTagArray}
                />

                <PostAvatar image={picture} setImage={setPicture} />
                <SimpleMDE
                    value={content}
                    onChange={handle}
                    data-testid="post-content"
                />
            </div>
        </>
    );
};

export default EditCreatePostFields;
