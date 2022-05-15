import React, { useState } from 'react';

import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { PasswordFileProps } from '../../../Types';

const PasswordField = ({
    value,
    setValue,
    required,
    label = '',
    htmlFor = 'password',
    id = 'password',
    autoFill = 'on',
}: PasswordFileProps) => {
    const [passwordHide, setPasswordHide] = useState(true);

    const handleChange = (event: React.FormEvent) => {
        setValue((event.target as HTMLButtonElement).value);
    };

    return (
        <>
            <div className="input-component">
                <label className="input-label" htmlFor={htmlFor}>
                    {label}
                </label>
                <div style={{ position: 'relative' }}>
                    <div className="input-password-icon">
                        <span
                            style={{
                                cursor: 'pointer',
                                padding: '0.5rem',
                                display: 'flex',
                            }}
                            onClick={() => setPasswordHide(!passwordHide)}
                        >
                            {passwordHide ? (
                                <AiOutlineEyeInvisible
                                    style={{
                                        height: '25px',
                                        width: '25px',
                                        color: 'rgb(55,65,81)',
                                    }}
                                />
                            ) : (
                                <AiOutlineEye
                                    style={{
                                        height: '25px',
                                        width: '25px',
                                        color: 'rgb(55,65,81)',
                                    }}
                                />
                            )}
                        </span>
                    </div>
                    <input
                        type={passwordHide ? 'password' : 'text'}
                        id={id}
                        placeholder="12345"
                        value={value}
                        onChange={handleChange}
                        required={required}
                        aria-required={required}
                        className="input-text"
                    />
                </div>
            </div>
        </>
    );
};

export default PasswordField;
