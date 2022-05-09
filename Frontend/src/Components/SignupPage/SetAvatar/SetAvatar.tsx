import React from 'react';

import { AvatarProps } from '../../../Types';

import './Avatar.css';

const SetAvatar = ({ image, setImage }: AvatarProps) => {
    const captureImage = (event: React.FormEvent<EventTarget>) => {
        const file = (event.target as HTMLFormElement).files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    };

    return (
        <>
            <div className="avatar-wrapper">
                <div className="avatar-photo-wrapper">
                    <img className="avatar-image" src={image} alt="" />
                </div>
                <div>
                    <input
                        id="avatar-input"
                        onChange={captureImage}
                        type="file"
                        required
                        aria-required
                        className="avatar-input"
                    />
                    <label
                        className="avatar-label button-secondary"
                        htmlFor="avatar-input"
                    >
                        Choose a different photo
                    </label>
                </div>
            </div>
        </>
    );
};

export default SetAvatar;
