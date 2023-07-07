import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { theme } from 'galio-framework';
import { MENU_SERVICES } from '.';
import {
    Payment,
    Amenities,
    Clubhouse,
    Complaint,
    NoticeBoard,
    User,
    Services,
    Home,
    PrimeCavesLogo,
    NoData,
    AddExpectedVisitors,
    HomeOutline,
    ServicesOutline,
} from '../assets';

export const StatusHeight = StatusBar.currentHeight;
export const HeaderHeight = (theme.SIZES.BASE * 3.5 + (StatusHeight || 0));

export const componentWithProps = (Component, props) => < Component {...props} />;
export const getOTPMessage = (otp, hash) => `Your OTP- One Time Password is ${otp} to authenticate your login with ${hash} Powered By mTalkz`;

const DEFAULT_ICON_STYLE = {
    height: 100,
    width: 100,
};

export const renderIcon = (requestIcon, styles = DEFAULT_ICON_STYLE) => {
    switch (requestIcon) {
        case MENU_SERVICES.MAINTENANCE:
            return (
                <Payment
                    {...styles}
                />);
        case MENU_SERVICES.AMENITIES:
            return (
                <Amenities
                    {...styles}
                />);

        case MENU_SERVICES.CLUBHOUSE:
            return (
                <Clubhouse
                    {...styles}
                />);

        case MENU_SERVICES.COMPLAIN:
            return (
                <Complaint
                    {...styles}
                />);

        case MENU_SERVICES.NOTICEBOARD:
            return (
                <NoticeBoard
                    {...styles}
                />);

        case MENU_SERVICES.SERVICES:
            return (
                <Services
                    {...styles}
                />);
        case MENU_SERVICES.SERVICES_OUTLINE:
            return (
                <ServicesOutline
                    {...styles}
                />);
        case MENU_SERVICES.HOME:
            return (
                <Home
                    {...styles}
                />);
        case MENU_SERVICES.HOME_OUTLINE:
            return (
                <HomeOutline
                    {...styles}
                />);
        case MENU_SERVICES.ADD_EXPECTED_VISITOR:
            return (
                <AddExpectedVisitors
                    {...styles}
                />);
        case MENU_SERVICES.PRIME_CAVES:
            return (
                <PrimeCavesLogo
                    {...styles}
                />);
        case MENU_SERVICES.NO_DATA:
            return <NoData {...styles} />;
        default:
            return (
                <User
                    {...styles}
                />);
    }
};


// Home,
// HomeOutline,
// Services,
// ServicesOutline,

// export const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812);
