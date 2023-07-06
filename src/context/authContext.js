import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, updateResident } from '../screens/Authentication/login.services';
import { EMPTY_OBJECT, EMPTY_STRING } from '../constants';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
export const AuthContext = createContext();
import axios from 'axios';
export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(EMPTY_OBJECT);
    const [token, setToken] = useState();
    const [serviceToken, setServiceToken] = useState(EMPTY_STRING);
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
                            maintenance_reminder: { daysRemaining: 5, due_date: '23 Mar,2023', amount: 1200 },
                            // maintenance_reminder:{}
                        };
                        setUserInfo(mockData);
                        setIsLoading(false);
                        await AsyncStorage.setItem(
                            'accessToken',
                            accessToken,
                        );
                        console.log('mockData', mockData);
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

    const updateResidentDetails = async () => {
        const request = {
            id: _get(userInfo, '_id'),
            service_enrolled: true,
        };
        setIsLoading(true);
        try {
            updateResident(request).
                then(async response => {
                    if (response) {
                        const data = {
                            ...userInfo,
                            due_amount: 1200,
                            maintenance_reminder: { daysRemaining: 5, due_date: '23 Mar,2023', amount: 1200 },
                            service_enrolled: true,
                        };
                        setUserInfo(data);
                        setIsLoading(false);
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



    const registerServices = async () => {
        const request = {
            'email': _get(userInfo, 'email_address'),
            'password': _get(userInfo, 'contact_number'),
            'name': _get(userInfo, 'name'),
            'userType': 'USER',
        };
        setIsLoading(true);
        try {
            await axios.post(`${process.env.SERVICE_URL}/register`, request).
                then(async response => {
                    if (response) {
                        const data = {
                            ...userInfo,
                            service_enrolled: true,
                        };
                        setUserInfo(data);
                        setIsLoading(false);
                        updateResidentDetails();
                        loginServices();

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

    const loginServices = async () => {
        const request = {
            'email': _get(userInfo, 'email_address'),
            'password': _get(userInfo, 'contact_number'),
        };
        setIsLoading(true);
        try {
            await axios.post(`${process.env.SERVICE_URL}/login`, request).
                then(async response => {
                    if (response) {
                        const serviceToken = _get(response, 'data.data.token');
                        const data = {
                            ...userInfo,
                            serviceToken,
                        };
                        setUserInfo(data);
                        setIsLoading(false);
                        setServiceToken(serviceToken);
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
                serviceToken,
                registerServices,
                loginServices,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
