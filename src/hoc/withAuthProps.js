import React from 'react';
import { AuthProvider } from '../context/authContext';

export default (WrappedComponent) => {
    const hocComponent = ({ ...props }) =>
    (
        <AuthProvider>
            <WrappedComponent {...props} />
        </AuthProvider>
    );
    return hocComponent;
};
