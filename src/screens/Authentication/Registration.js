import { ActivityIndicator, Dimensions } from 'react-native';
import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { EMPTY_STRING, argonTheme } from '../../constants';
import _get from 'lodash/get';
const { width, height } = Dimensions.get('screen');

const ACTIVITY_INDICATOR_STYLES = {
    position: 'absolute',
    top: height / 2,
    left: width / 2,
};

class Registration extends Component {
    state = { isLoading: true };
    hideSpinner() {
        this.setState({ isLoading: false });
    }
    render() {
        const { route } = this.props;
        const { isLoading } = this.state;
        const uri = _get(route, 'params.WebViewURL', EMPTY_STRING);
        return (
            <>
                <WebView source={{ uri }} onLoad={() => this.hideSpinner()} />
                {isLoading &&
                    <ActivityIndicator
                        style={ACTIVITY_INDICATOR_STYLES}
                        color={argonTheme.COLORS.PRIMARY}
                        size="large"
                    />}

            </>
        );
    }
}

export default Registration;
