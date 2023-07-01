import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../screens/Authentication/login.services';
import { EMPTY_OBJECT, EMPTY_STRING } from '../constants';
import _isEmpty from 'lodash/isEmpty';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(EMPTY_OBJECT);
    const [token, setToken] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);
    const [error, setError] = useState(EMPTY_STRING);

    const login = async (request) => {
        setIsLoading(true);
        try {
            loginUser(request).
                then(async response => {
                    if (response) {
                        const { accessToken, data } = response.data;
                        const mockData = {
                            ...data,
                            due_amount: 1200,
                            maintenance_reminder: {daysRemaining:5,due_date:'23 Mar,2023',amount:1200},
                            // maintenance_reminder:{}
                        };
                        setUserInfo(mockData);
                        setIsLoading(false);
                        await AsyncStorage.setItem(
                            'accessToken',
                            accessToken,
                        );
                        await AsyncStorage.setItem('userInfo', JSON.stringify(mockData));
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

    const logout = async () => {
        setIsLoading(true);
        AsyncStorage.removeItem(
            'accessToken',
        );
        AsyncStorage.removeItem('userInfo');
        setUserInfo(EMPTY_OBJECT);
        setIsLoading(false);
        setError(null);
    };

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let token = await AsyncStorage.getItem('accessToken');
            userInfo = JSON.parse(userInfo);
            if (userInfo && !_isEmpty(token)) {
                setUserInfo(userInfo);
                setToken(token);
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
                token,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
