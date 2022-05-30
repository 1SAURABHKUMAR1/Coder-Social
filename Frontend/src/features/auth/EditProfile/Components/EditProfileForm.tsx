import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../store/hooks';

import EditProfileButton from './EditProfileButton';
import TextField from '../../../../Components/InputField/TextField';
import SetAvatar from '../../../../Components/InputField/SetAvatar/SetAvatar';

const EditProfileForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');
    const [bio, setBio] = useState('');
    const [portfolioLink, setPortfolioLink] = useState('');
    const [work, setWork] = useState('');
    const [skills, setSkills] = useState('');
    const [education, setEducation] = useState('');
    const [location, setLocation] = useState('');
    const [githubUrl, setGithubUrl] = useState('');
    const [twitterUrl, setTwitterUrl] = useState('');

    const userAuth = useAppSelector((state) => state.user);

    useEffect(() => {
        setName(userAuth.name);
        setEmail(userAuth.email);
        setUsername(userAuth.username);
        setProfilePhoto(userAuth.profile_photo);
        setBio(userAuth.bio);
        setPortfolioLink(userAuth.portfolio_link);
        setWork(userAuth.work);
        setSkills(userAuth.skills);
        setEducation(userAuth.education);
        setLocation(userAuth.location);
        setGithubUrl(userAuth.githubUrl);
        setTwitterUrl(userAuth.twitterUrl);
    }, [userAuth]);

    return (
        <>
            <section className="profile-sub-component">
                <div className="auth-form-fields">
                    <TextField
                        htmlFor="name"
                        labelTitle="Name"
                        inputPlaceHolder="Coder Social"
                        inputId="name"
                        value={name}
                        required={false}
                        setValue={setName}
                        key="name"
                    />
                    <TextField
                        htmlFor="email"
                        labelTitle="Email"
                        inputPlaceHolder="coder@social.dev"
                        inputId="email"
                        value={email}
                        required={false}
                        setValue={setEmail}
                        key="email"
                    />
                    <TextField
                        htmlFor="username"
                        labelTitle="Username"
                        inputPlaceHolder="codersocial"
                        inputId="username"
                        value={username}
                        required={false}
                        setValue={setUsername}
                        key="username"
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
                        value={bio}
                        required={false}
                        setValue={setBio}
                        key="bio"
                    />
                    <TextField
                        htmlFor="portfolio_link"
                        labelTitle="Portfolio Link"
                        inputPlaceHolder="https://coder-social.vercel.app"
                        inputId="portfolio_link"
                        value={portfolioLink}
                        required={false}
                        setValue={setPortfolioLink}
                        key="portfolio_link"
                    />
                    <TextField
                        htmlFor="work"
                        labelTitle="Work"
                        inputPlaceHolder="Student"
                        inputId="work"
                        value={work}
                        required={false}
                        setValue={setWork}
                        key="work"
                    />
                    <TextField
                        htmlFor="skills"
                        labelTitle="Skills"
                        inputPlaceHolder="React JS ,Typescript , Node JS  , Express JS"
                        inputId="skills"
                        value={skills}
                        required={false}
                        setValue={setSkills}
                        key="skills"
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
                        value={education}
                        required={false}
                        setValue={setEducation}
                        key="education"
                    />
                    <TextField
                        htmlFor="location"
                        labelTitle="Location"
                        inputPlaceHolder="Ranchi ,Jharkhand ,India"
                        inputId="location"
                        value={location}
                        required={false}
                        setValue={setLocation}
                        key="location"
                    />
                    <TextField
                        htmlFor="githubUrl"
                        labelTitle="Github Profile Url"
                        inputPlaceHolder="https://coder-social.vercel.app"
                        inputId="githubUrl"
                        value={githubUrl}
                        required={false}
                        setValue={setGithubUrl}
                        key="githubUrl"
                    />
                    <TextField
                        htmlFor="twitterUrl"
                        labelTitle="Twitter Profile Url"
                        inputPlaceHolder="https://coder-social.vercel.app"
                        inputId="twitterUrl"
                        value={twitterUrl}
                        required={false}
                        setValue={setTwitterUrl}
                        key="twitterUrl"
                    />
                </div>
            </section>
            <EditProfileButton
                bio={bio}
                education={education}
                email={email}
                githubUrl={githubUrl}
                location={location}
                name={name}
                photo={profilePhoto}
                portfolio_link={portfolioLink}
                skills={skills}
                twitterUrl={twitterUrl}
                user_ID={''}
                username={username}
                work={work}
            />
        </>
    );
};

export default EditProfileForm;
