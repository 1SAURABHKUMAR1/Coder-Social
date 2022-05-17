import { UserInfoProps } from '../../Types';

const ProfileExtra = ({
    education,
    work,
    followers,
    following,
}: UserInfoProps) => {
    return (
        <>
            <div className="user-info-education-work">
                {education && (
                    <div className="user-info-education-item">
                        <strong>Education</strong>
                        <p>{education}</p>
                    </div>
                )}
                {work && (
                    <div className="user-info-education-item">
                        <strong>Work</strong>
                        <p>Student</p>
                    </div>
                )}
                <div className="user-info-education-item">
                    <strong>Followers</strong>
                    <p>{followers}</p>
                </div>
                <div className="user-info-education-item">
                    <strong>Following</strong>
                    <p>{following}</p>
                </div>
            </div>
        </>
    );
};

export default ProfileExtra;
