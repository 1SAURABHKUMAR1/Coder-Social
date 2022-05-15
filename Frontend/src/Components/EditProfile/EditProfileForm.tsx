import React, { useEffect, useState } from 'react';

import EditProfileButton from './EditProfileButton';
import TextField from '../Shared/InputField/TextField';
import SetAvatar from '../SignupPage/SetAvatar/SetAvatar';

import { EditProfileInitalData } from '../../Types';

const EditProfileForm = ({ userIntialData }: EditProfileInitalData) => {
    const [profileValue, setProfileValue] = useState(userIntialData);
    const [profilePhoto, setProfilePhoto] = useState('');

    // Just to satisfy props
    const [value, setValue] = useState('');

    // Handle Change
    const handleChange = (name: string, event: React.FormEvent) => {
        setProfileValue((oldValues) => {
            return {
                ...oldValues,
                [name]: (event.target as HTMLButtonElement).value,
            };
        });
    };

    useEffect(() => {
        setProfileValue(userIntialData);

        setProfilePhoto(userIntialData.photo);
    }, [userIntialData]);

    // update profile photo
    useEffect(() => {
        setProfileValue((oldValues) => {
            return {
                ...oldValues,
                photo: profilePhoto,
            };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [profilePhoto]);

    return (
        <>
            <section className="profile-sub-component">
                <div className="auth-form-fields">
                    <TextField
                        htmlFor="name"
                        labelTitle="Name"
                        inputPlaceHolder="Coder Social"
                        inputId="name"
                        value={profileValue.name}
                        setValue={setValue}
                        required={false}
                        handleFunction={handleChange}
                    />
                    <TextField
                        htmlFor="email"
                        labelTitle="Email"
                        inputPlaceHolder="coder@social.dev"
                        inputId="email"
                        value={profileValue.email}
                        setValue={setValue}
                        required={false}
                        handleFunction={handleChange}
                    />
                    <TextField
                        htmlFor="username"
                        labelTitle="Username"
                        inputPlaceHolder="codersocial"
                        inputId="username"
                        value={profileValue.username}
                        setValue={setValue}
                        required={false}
                        handleFunction={handleChange}
                    />

                    <SetAvatar
                        image={profilePhoto}
                        setImage={setProfilePhoto}
                        extraClass="profile-avatar"
                    />
                </div>
            </section>
            <section className="profile-sub-component">
                <div className="auth-form-fields">
                    <TextField
                        htmlFor="bio"
                        labelTitle="Bio"
                        inputPlaceHolder="full stack developer"
                        inputId="bio"
                        value={profileValue.bio}
                        setValue={setValue}
                        required={false}
                        handleFunction={handleChange}
                    />
                    <TextField
                        htmlFor="portfolio_link"
                        labelTitle="Portfolio Link"
                        inputPlaceHolder="https://coder-social.vercel.app"
                        inputId="portfolio_link"
                        value={profileValue.portfolio_link}
                        setValue={setValue}
                        required={false}
                        handleFunction={handleChange}
                    />
                    <TextField
                        htmlFor="work"
                        labelTitle="Work"
                        inputPlaceHolder="Student"
                        inputId="work"
                        value={profileValue.work}
                        setValue={setValue}
                        required={false}
                        handleFunction={handleChange}
                    />
                    <TextField
                        htmlFor="skills"
                        labelTitle="Skills"
                        inputPlaceHolder="React JS ,Typescript , Node JS  , Express JS"
                        inputId="skills"
                        value={profileValue.skills}
                        setValue={setValue}
                        required={false}
                        handleFunction={handleChange}
                    />
                </div>
            </section>

            <section className="profile-sub-component">
                <div className="auth-form-fields">
                    <TextField
                        htmlFor="education"
                        labelTitle="Education"
                        inputPlaceHolder="Bsc. IT"
                        inputId="education"
                        value={profileValue.education}
                        setValue={setValue}
                        required={false}
                        handleFunction={handleChange}
                    />
                    <TextField
                        htmlFor="location"
                        labelTitle="Location"
                        inputPlaceHolder="Ranchi ,Jharkhand ,India"
                        inputId="location"
                        value={profileValue.location}
                        setValue={setValue}
                        required={false}
                        handleFunction={handleChange}
                    />
                    <TextField
                        htmlFor="githubUrl"
                        labelTitle="Github Profile Url"
                        inputPlaceHolder="https://coder-social.vercel.app"
                        inputId="githubUrl"
                        value={profileValue.githubUrl}
                        setValue={setValue}
                        required={false}
                        handleFunction={handleChange}
                    />
                    <TextField
                        htmlFor="twitterUrl"
                        labelTitle="Twitter Profile Url"
                        inputPlaceHolder="https://coder-social.vercel.app"
                        inputId="twitterUrl"
                        value={profileValue.twitterUrl}
                        setValue={setValue}
                        required={false}
                        handleFunction={handleChange}
                    />
                </div>
            </section>
            <EditProfileButton
                userIntialData={profileValue}
                profilePhoto={userIntialData.photo}
            />
        </>
    );
};

export default EditProfileForm;
