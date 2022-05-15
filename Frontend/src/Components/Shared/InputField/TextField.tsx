import React from 'react';
import { TextFieldProps } from '../../../Types';

const TextField = ({
    htmlFor,
    labelTitle,
    inputPlaceHolder,
    inputId,
    value,
    setValue,
    required,
    handleFunction,
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
                value={value ?? ''}
                onChange={
                    handleFunction
                        ? (event) => handleFunction(htmlFor, event)
                        : handleChange
                }
                className="input-text"
                required={required}
                aria-required={required}
            />
        </div>
    );
};
export default TextField;
