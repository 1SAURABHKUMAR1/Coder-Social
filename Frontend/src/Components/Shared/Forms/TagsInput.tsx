import React from 'react';

//@ts-ignore
import { v4 as uuidv4 } from 'uuid';

import { GrFormClose } from 'react-icons/gr';

import { SingleTag, TagInputProp } from '../../../Types';

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
            event.code === 'Enter' ||
            (event.key === 'Enter' && singleTagValue !== '')
        ) {
            setTags((oldTag) => [
                ...oldTag,
                { id: uuidv4(), text: singleTagValue },
            ]);
            (event.target as HTMLButtonElement).value = '';
        }
    };

    const removeTag = (tagId: string) => {
        setTags(tags.filter((tag) => tag.id !== tagId));
    };

    return (
        <div className="input-component">
            <label htmlFor={htmlFor} className="input-label">
                {labelTitle}
            </label>

            <div className="tags-input-wrapper">
                {tags.length > 1 ? (
                    <ul className="tags-list">
                        {tags.map((tag: SingleTag, index: Number) =>
                            index === 0 ? (
                                <></>
                            ) : (
                                <li className="tag-input-item" key={tag.id}>
                                    <span>#{tag.text}</span>
                                    <i>
                                        <GrFormClose
                                            onClick={() => removeTag(tag.id)}
                                        />
                                    </i>
                                </li>
                            ),
                        )}
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
