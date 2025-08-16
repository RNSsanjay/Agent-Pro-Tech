import React from 'react';
import { motion } from 'framer-motion';
import type { FormInputProps } from '../../types';

const FormInput: React.FC<FormInputProps> = ({
    label,
    type,
    value,
    onChange,
    placeholder,
    required = false,
    error,
}) => {
    return (
        <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required={required}
                className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
            />

            {error && (
                <motion.p
                    className="mt-1 text-sm text-red-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    {error}
                </motion.p>
            )}
        </motion.div>
    );
};

export default FormInput;
