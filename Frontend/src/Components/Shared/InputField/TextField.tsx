import React from 'react';
import { TextFieldProps } from '../../../Types';

const TextField = ({
    htmlFor,
    labelTitle,
    inputPlaceHolder,
    inputId,
    value,
    setValue,
}: TextFieldProps) => {
    const handleChange = (event: React.FormEvent) => {
        setValue((event.target as HTMLButtonElement).value);
    };

    return (
        <div className="input-component">
            <label htmlFor={htmlFor} className="input-label">
                {labelTitle}
            </label>
            <input
                type="text"
                placeholder={inputPlaceHolder}
                id={inputId}
                value={value}
                onChange={handleChange}
                required
                aria-required
                className="input-text"
            />
        </div>
    );
};
export default TextField;
