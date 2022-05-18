import React, { useEffect, useState } from 'react';

import TextField from '../Shared/InputField/TextField';
import TagsInput from '../Shared/Forms/TagsInput';
import PostAvatar from '../Shared/InputField/PostAvatar';

import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import { CreatePostFieldProp, TagProp } from '../../Types';

const CreatePostFields = ({
    title,
    setTitle,
    setTagArray,
    picture,
    setPicture,
    content,
    setContent,
}: CreatePostFieldProp) => {
    const [tags, setTags] = useState<TagProp>([{ id: '', text: '' }]);

    useEffect(() => {
        let tag = tags.map((tag) => tag.text).slice(1);
        setTagArray(tag);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tags]);

    const handle = (name: string) => {
        setContent(name);
    };

    return (
        <>
            <div className="flex-gap-5">
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
                    tags={tags}
                    setTags={setTags}
                />

                <PostAvatar image={picture} setImage={setPicture} />
                <SimpleMDE value={content} onChange={handle} />
            </div>
        </>
    );
};

export default CreatePostFields;
