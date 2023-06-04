import React from 'react';
import { AuthProvider } from '../context/authContext';

export default (WrappedComponent) => {
    const HocComponent = ({ ...props }) =>
    (
        <AuthProvider>
            <WrappedComponent {...props} />
        </AuthProvider>
    );
    return HocComponent;
};
