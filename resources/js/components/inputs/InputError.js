import React from 'react';
import { ErrorMessage } from 'formik';


export const InputError = ({ field }) => (field ? (<span className="text-danger">
        { field && <ErrorMessage name={ field.name} />}
        </span>) : null);
