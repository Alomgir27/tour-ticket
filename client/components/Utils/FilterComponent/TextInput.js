import React from "react";

const TextInput = ({ label, onApply, name, value, onChange, placeholder, type }) => {
    return (
        <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                {label}
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        onApply();
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === "Escape") {
                        onChange({ target: { value: "" } });
                    }
                    if(e.key === "Enter") {
                        e.preventDefault();
                        onApply();
                    }
                }}
                placeholder={placeholder}
            />
            {value &&
                <button type="button" className="w-full bg-red-600 text-white py-2 px-4 rounded-md mt-2" onClick={onApply}>
                    Apply
                </button>
            }

        </div>
    );
};

export default TextInput;