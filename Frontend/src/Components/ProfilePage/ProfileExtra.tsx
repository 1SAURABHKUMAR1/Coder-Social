import { UserInfoProps } from '../../Types';

const ProfileExtra = ({ education, work }: UserInfoProps) => {
    return (
        <>
            {education && work && (
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
                </div>
            )}
        </>
    );
};

export default ProfileExtra;
