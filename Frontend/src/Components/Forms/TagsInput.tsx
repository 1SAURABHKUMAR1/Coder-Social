import React from 'react';

//@ts-ignore
import { v4 as uuidv4 } from 'uuid';

import { GrFormClose } from 'react-icons/gr';

import { SingleTag, TagInputProp } from '../../Types';

const TagsInput = ({
    htmlFor,
    labelTitle,
    inputPlaceHolder,
    inputId,
    tags,
    setTags,
}: TagInputProp) => {
    const addTag = (event: React.KeyboardEvent) => {
        const singleTagValue = (event.target as HTMLButtonElement).value;

        if (
            (event.code === 'Enter' || event.key === 'Enter') &&
            singleTagValue !== ''
        ) {
            setTags((oldTag) => [
                ...oldTag,
                { _id: uuidv4(), name: singleTagValue },
            ]);
            (event.target as HTMLButtonElement).value = '';
        }
    };

    const removeTag = (tagId: string) => {
        setTags(tags.filter((tag) => tag._id !== tagId));
    };

    return (
        <div className="input-component">
            <label htmlFor={htmlFor} className="input-label">
                {labelTitle}
            </label>

            <div className="tags-input-wrapper">
                {tags.length > 0 ? (
                    <ul className="tags-list">
                        {tags.map((tag: SingleTag) => (
                            <li className="tag-input-item" key={tag._id}>
                                <span key={tag._id}>#{tag.name}</span>
                                <i>
                                    <GrFormClose
                                        key={tag._id}
                                        onClick={() => removeTag(tag._id)}
                                    />
                                </i>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <></>
                )}

                <input
                    type="text"
                    placeholder={inputPlaceHolder}
                    id={inputId}
                    onKeyUp={addTag}
                    className="input-text-tags"
                />
            </div>
        </div>
    );
};

export default TagsInput;
