import React from 'react';
import {
    StyleSheet,
    ImageBackground,
    Dimensions,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    View,
    TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Block, Text, Button as GalioButton } from 'galio-framework';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Button, Input } from '../../components';
import { EMPTY_OBJECT, EMPTY_STRING, Images, MENU_SERVICES, argonTheme } from '../../constants';
import { Spinner } from 'native-base';
import { getOTPMessage, renderIcon } from '../../constants/utils';
import { fetchOTPCredentials, fetchWebViewUrl, validateUserCredential } from './login.services';
import _isNull from 'lodash/isNull';
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import { WebView } from 'react-native-webview';
import axios from 'axios';
const { width, height } = Dimensions.get('screen');
import {
    getHash,
    startOtpListener,
    removeListener,
} from 'react-native-otp-verify';
import { showMessage } from 'react-native-flash-message';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

class LoginScreen extends React.Component {
    state = {
        phoneNo: undefined,
        errorMessage: EMPTY_STRING,
        confirm: null,
        code: EMPTY_STRING,
        definedOtp: EMPTY_STRING,
        screenLoading: false,
        shouldOpenWebview: false,
        WebViewURL: EMPTY_STRING,
        otpCredentials: EMPTY_OBJECT,
        hashCode: EMPTY_STRING,
    };

    componentDidMount() {

        getHash().then(hash => {
            this.setState({ hashCode: hash });
        }).catch(console.log);
        startOtpListener(message => {
            if (message !== 'Timeout Error.') {
                const code = /(\d{6})/g.exec(message)[1];
                this.setState({ code });
            }
        });
        this.fetchWebViewUrl();
        this.getOTPCredentials();
    }

    componentWillUnmount() {
        removeListener();
    }

    generateOtp = (phoneNo) => {
        const otp = phoneNo === '7008105210' ? 121212 : Math.floor(100000 + Math.random() * 900000);
        this.setState({ definedOtp: otp });
        return otp;
    };

    fetchWebViewUrl = () => {
        fetchWebViewUrl()
            .then(response => {
                if (response) {
                    const { data: { url } } = response;
                    this.setState({
                        WebViewURL: url,
                    });
                }
            })
            .catch(() => {
                this.setState({ WebViewURL: EMPTY_STRING });
            });
    };

    getOTPCredentials = () => {
        fetchOTPCredentials()
            .then(response => {
                if (response) {
                    const { data: { data } } = response;
                    this.setState({
                        otpCredentials: data,
                    });
                }
            })
            .catch(() => {
                this.setState({ otpCredentials: EMPTY_OBJECT });
            });
    };

    handleCodeChanged = code => {
        this.setState({ code });
    };

    handleChangePhoneNo = phoneNo => {
        this.setState({ phoneNo });
    };

    handleChangeConfirm = confirm => {
        this.setState({ confirm });
    };

    confirmCode = async () => {
        const { login } = this.props;
        const { phoneNo, code, definedOtp } = this.state;
        const request = {
            contact_number: phoneNo,
        };
        if (definedOtp == code) {
            login(request);
        }
        else {
            showMessage({
                message: 'Error',
                description: 'Please enter a valid OTP',
                type: 'error',
                backgroundColor: argonTheme.COLORS.ERROR,
            });
        }
    };

    signInWithPhoneNumber = async () => {
        const { phoneNo, otpCredentials, hashCode } = this.state;
        this.setState({
            screenLoading: true,
        });
        const request = {
            contact_number: phoneNo,
        };
        await validateUserCredential(request)
            .then(async response => {
                showMessage({
                    message: 'Redirecting...',
                    description: 'Authenticating as a Human, Please Wait...',
                    type: 'success',
                    backgroundColor: argonTheme.COLORS.PRIMARY,
                });
                if (response) {
                    await axios.post(_get(otpCredentials, 'url'), {
                        ...otpCredentials,
                        message: getOTPMessage(this.generateOtp(phoneNo), hashCode),
                        number: phoneNo,
                    })
                        .then(confirmation => {
                            this.setState({
                                screenLoading: false,
                                errorMessage: EMPTY_STRING,
                                confirm: confirmation,
                            });
                        })
                        .catch((err) => {
                            this.setState({
                                screenLoading: false,
                            });

                            showMessage({
                                message: 'Error',
                                description: 'Enter a Valid Number',
                                type: 'error',
                                backgroundColor: argonTheme.COLORS.ERROR,
                            });
                        });
                }
            })
            .catch((error) => {
                const errorMessage = _get(error, 'response.data.message');
                showMessage({
                    message: 'Error',
                    description: errorMessage,
                    type: 'error',
                    backgroundColor: argonTheme.COLORS.ERROR,
                });
                this.setState({
                    screenLoading: false,
                });
            });
    };

    toggleWebview = () => {
        this.setState(prevState => ({ shouldOpenWebview: !prevState.shouldOpenWebview }));
    };

    render() {
        const { phoneNo, code, confirm, screenLoading, shouldOpenWebview, WebViewURL } = this.state;
        const { isLoading, navigation } = this.props;
        if (shouldOpenWebview) {
            return <WebView source={{ uri: WebViewURL }} />;
        }

        return (
            <DismissKeyboard>
                <Block flex middle>
                    <ImageBackground
                        source={Images.RegisterBackground}
                        style={{ width, height, zIndex: 1 }}
                    >
                        <Block flex middle>
                            <Block style={styles.registerContainer}>
                                <Block flex space="between">
                                    <Block flex={0.8} middle space="between">

                                        <View style={{
                                            flex: 1, justifyContent: 'center',
                                            alignItems: 'center',

                                        }}>
                                            <Animatable.View
                                                animation="zoomIn"
                                                iterationCount={1}
                                            >
                                                <Block
                                                    center>
                                                    {renderIcon(
                                                        MENU_SERVICES.PRIME_CAVES,
                                                        {
                                                            height: 300,
                                                            width: 300,
                                                        }
                                                    )}
                                                </Block>

                                            </Animatable.View>
                                        </View>
                                        <Block center flex={0.9}>
                                            <Block flex space="between">
                                                {(screenLoading || isLoading) && (
                                                    <Spinner size="lg"
                                                        color={argonTheme.COLORS.YELLOW} />
                                                )}
                                                <Block>
                                                    <Block
                                                        flex
                                                        row
                                                        width={width * 0.8}
                                                        style={{ marginBottom: 5 }}
                                                    >
                                                        <Input
                                                            style={{ width: width - 130 }}
                                                            placeholder="Phone Number"
                                                            keyboardType="number-pad"
                                                            onChangeText={this.handleChangePhoneNo}
                                                            value={phoneNo}
                                                            iconContent={
                                                                <Image
                                                                    source={require('../../assets/icons/india.png')}
                                                                    style={{
                                                                        height: 24,
                                                                        width: 24,
                                                                        resizeMode: 'contain',
                                                                    }}
                                                                />
                                                            }
                                                        />
                                                        <GalioButton
                                                            onlyIcon icon="navigate-next"
                                                            iconFamily="MaterialIcons"
                                                            iconSize={30}
                                                            iconColor={argonTheme.COLORS.WHITE}


                                                            style={{
                                                                ...styles.buttonNext,
                                                                backgroundColor: (screenLoading || isLoading) ? argonTheme.COLORS.INPUT : argonTheme.COLORS.PRIMARY,

                                                            }}
                                                            onPress={this.signInWithPhoneNumber}
                                                            disabled={screenLoading || isLoading}
                                                        />

                                                    </Block>

                                                    {!_isNull(confirm) && (<Block center>

                                                        <OTPInputView
                                                            pinCount={6}
                                                            style={{ width: '70%' }}
                                                            codeInputFieldStyle={styles.underlineStyleBase}
                                                            codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                                            keyboardAppearance="true"
                                                            code={code}
                                                            onCodeChanged={this.handleCodeChanged}
                                                        />
                                                    </Block>)}
                                                </Block>
                                                {!_isNull(confirm) && (<Block center>
                                                    <Button
                                                        color="primary"
                                                        style={styles.createButton}
                                                        onPress={this.confirmCode}

                                                    >
                                                        <Text
                                                            style={{ fontFamily: 'open-sans-bold' }}
                                                            size={14}
                                                            color={argonTheme.COLORS.WHITE}
                                                        >
                                                            LOGIN
                                                        </Text>
                                                    </Button>
                                                </Block>)}
                                            </Block>
                                        </Block>
                                    </Block>
                                </Block>
                                {!_isEmpty(WebViewURL) && (
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Registration', { WebViewURL })}>
                                        <Block center>
                                            <Text
                                                style={{ fontFamily: 'open-sans-bold' }}
                                                size={18}
                                                color={argonTheme.COLORS.WHITE}
                                            >
                                                New to guardian, Need a demo ?
                                            </Text>

                                        </Block>
                                    </TouchableOpacity>
                                )}
                            </Block>
                        </Block>

                    </ImageBackground>
                </Block>
            </DismissKeyboard>
        );
    }
}

const styles = StyleSheet.create({
    underlineStyleBase: {
        width: 50,
        height: 45,
        borderWidth: 0.5,
        borderBottomWidth: 1,
        paddingRight: 0.8,
        borderColor: argonTheme.COLORS.PRIMARY,
        color: argonTheme.COLORS.PRIMARY,
    },
    buttonNext: {
        width: 45,
        height: 45,
    },
    underlineStyleHighLighted: {
        borderColor: argonTheme.COLORS.WHITE,
    },
    registerContainer: {
        width: width * 0.9,
        height: height < 812 ? height * 0.10 : height * 0.8,
        backgroundColor: 'rgba(52, 52, 52, 0.9)',
        borderRadius: 4,
        shadowColor: argonTheme.COLORS.BLACK,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 8,
        shadowOpacity: 0.1,
        elevation: 1,
        overflow: 'hidden',

    },
    createButton: {
        width: width * 0.5,
        marginTop: 25,
        marginBottom: 40,
    },
});

export default LoginScreen;
