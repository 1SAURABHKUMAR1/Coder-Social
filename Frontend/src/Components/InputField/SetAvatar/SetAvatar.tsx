import React from 'react';

import { AvatarProps } from '../../../Types';

import './Avatar.css';

const SetAvatar = ({
    image,
    setImage,
    handleFunction,
    extraClass,
}: AvatarProps) => {
    const captureImage = (event: React.FormEvent<EventTarget>) => {
        const file = (event.target as HTMLFormElement).files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            handleFunction
                ? handleFunction(
                      'AVATAR_INPUT',
                      //   @ts-ignore
                      reader.result,
                  )
                : //   @ts-ignore
                  setImage(reader.result);
        };
    };

    return (
        <>
            <div className="avatar-wrapper" style={{ fontSize: '1rem' }}>
                <div className={`avatar-photo-wrapper ${extraClass}`}>
                    <img
                        className="avatar-image"
                        src={image}
                        alt=""
                        width="128"
                        height="128"
                    />
                </div>
                <div>
                    <input
                        id="avatar-input"
                        onChange={captureImage}
                        type="file"
                        required
                        aria-required
                        className="avatar-input"
                        accept="image/png ,image/jpg, image/jpeg, image/gif, image/webp , image/svg"
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
