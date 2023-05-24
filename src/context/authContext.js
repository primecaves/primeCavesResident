import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../screens/Authentication/login.services';
import { EMPTY_STRING } from '../constants';
import _get from 'lodash/get';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);
    const [error, setError] = useState(EMPTY_STRING);

    const login = async (email, password, contact_number) => {
        setIsLoading(true);
        try {
            loginUser({ email, password, contact_number }).
                then(async response => {
                    if (response) {
                        const { accessToken, data } = response.data;
                        setUserInfo(data);
                        setIsLoading(false);
                        await AsyncStorage.setItem(
                            'accessToken',
                            accessToken,
                        );
                        await AsyncStorage.setItem(
                            'userId',
                            _get(data, '_id'),
                        );
                        await AsyncStorage.setItem('userInfo', JSON.stringify(data));
                    }
                    else {
                        // setError(data.message);
                        setIsLoading(false);
                    }
                }
                );

        }
        catch (err) {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setIsLoading(true);
        AsyncStorage.removeItem(
            'accessToken',
        );
        AsyncStorage.removeItem(
            'userId',
        );
        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
        setError(null);
    };

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserInfo(userInfo);
            }

            setSplashLoading(false);
        } catch (e) {
            setSplashLoading(false);
            console.log(`is logged in error ${e}`);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                userInfo,
                splashLoading,
                error,
                login,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
