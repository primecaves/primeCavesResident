import React from 'react';
import {
    StyleSheet,
    ImageBackground,
    Dimensions,

    TouchableWithoutFeedback,
    Keyboard,
    Image,
    View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Block, Text } from 'galio-framework';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { Button as GalioButton } from 'galio-framework';
import { Button, Input } from '../../components';
import { EMPTY_STRING, Images, MENU_SERVICES, argonTheme } from '../../constants';
import { Spinner } from 'native-base';
import { renderIcon } from '../../constants/utils';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { validateUserCredential } from './login.services';
import auth from '@react-native-firebase/auth';
import _isNull from 'lodash/isNull';

const { width, height } = Dimensions.get('screen');
const COUNTRY_CODE = '+91';
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
        screenLoading: false,
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
        const { phoneNo, code, confirm } = this.state;
        const request = {
            contact_number: `+91${phoneNo}`,
        };
        try {
            await confirm.confirm(code).then(res => {
                if (res) {
                    login(request);
                }
                else {
                    Toast.show({
                        type: 'error',
                        position: 'bottom',
                        text2: 'Please enter a valid OTP',
                    });
                }
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text2: 'Please enter a valid OTP',
            });
        }
    };

    signInWithPhoneNumber = async () => {
        const { phoneNo } = this.state;
        this.setState({
            screenLoading: true,
            errorMessage: EMPTY_STRING,
            phoneNo,
        });
        const request = {
            contact_number: phoneNo,
        };
        await validateUserCredential(request)
            .then(response => {
                if (response) {
                    auth()
                        .signInWithPhoneNumber(COUNTRY_CODE + phoneNo)
                        .then(confirmation => {
                            this.setState({
                                screenLoading: false,
                                errorMessage: EMPTY_STRING,
                                confirm: confirmation,
                            });
                        })
                        .catch(() => {
                            this.setState({
                                screenLoading: false,
                                errorMessage: 'Otp send failed',
                            });
                        });
                } else {
                    this.setState({
                        screenLoading: false,
                        errorMessage: 'Enter a Valid Number',
                    });
                }
            })
            .catch(() => {
                this.setState({
                    screenLoading: false,
                    errorMessage: 'Number Invalid',
                });
            });
    };


    render() {
        const { phoneNo, code, confirm, screenLoading } = this.state;
        const { isLoading } = this.props;
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
                                                            height: 150,
                                                            width: 150,
                                                        }
                                                    )}
                                                </Block>
                                                <Text
                                                    style={{
                                                        fontSize: 26,
                                                        color: argonTheme.COLORS.PRIMARY,
                                                        fontFamily: 'open-sans-bold',
                                                    }}>
                                                    PRIME CAVES
                                                </Text>
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
