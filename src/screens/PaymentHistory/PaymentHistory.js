import React from 'react';
import { ScrollView, Alert, ActivityIndicator, View, StyleSheet } from 'react-native';
import { Block } from 'galio-framework';
import { Notification } from '../../components';
import { EMPTY_ARRAY, EMPTY_OBJECT, EMPTY_STRING, argonTheme } from '../../constants';
import { getServiceDetailsByResidentId } from './paymentHistory.services';
import _map from 'lodash/map';
import _get from 'lodash/get';
import _filter from 'lodash/filter';
import { generateInvoiceData } from '../../utils/generateInvoiceData';
import { PermissionsAndroid } from 'react-native';

export default class PaymentHistory extends React.Component {
    state = {
        isLoading: false,
        serviceData: EMPTY_ARRAY,
        downloadingInvoice: false,
        invoiceData: EMPTY_OBJECT,
    };
    fetchPaymentHistory = () => {
        const { userInfo } = this.props;
        this.setState({ isLoading: true });
        const request = {
            service: 'maintenance',
        };
        getServiceDetailsByResidentId(userInfo._id, request)
            .then(response => {
                if (response) {
                    const {
                        data: { data },
                    } = response;
                    const updatedData = _filter(data, item => item.status === 'PAID');
                    this.setState({
                        isLoading: false,
                        serviceData: updatedData,
                    });
                }
            })
            .catch((err) => {
                console.log('yahaann', err);
            });
    };
    componentDidMount() {
        this.requestFileStoragePermission();
        this.fetchPaymentHistory();
    }

    async requestFileStoragePermission() {
        try {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ]);

            if (granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
                granted['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('File storage permissions granted.');
                // Proceed with accessing the file storage
            } else {
                console.log('File storage permissions denied.');
                // Handle permission denial
            }
        } catch (error) {
            console.error('Error while requesting file storage permissions:', error);
        }
    }

    DownloadInvoiceCallback = () => {
        this.setState({ downloadingInvoice: false });
    };

    handleDownloadInvoice = (item) => {
        const { userInfo } = this.props;
        // const { invoiceData } = this.state;
        this.setState({ downloadingInvoice: true });
        let userData = {
            name: _get(userInfo, 'name', 'NA'),
            email: _get(userInfo, 'email_address', 'NA'),
            contact: _get(userInfo, 'contact_number', 'NA'),
            flat: _get(userInfo, 'flat_number', 'NA'),
            block: _get(userInfo, 'block', 'NA'),
            apartment_name: _get(userInfo, 'name', 'Utkal Heights'),
        };
        generateInvoiceData({
            userInfo: userData,
            maintenanceData: item,
            DownloadInvoiceCallback: this.DownloadInvoiceCallback,
        });
    };
    render() {
        const { serviceData, isLoading } = this.state;
        if (isLoading) {
            return (
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color={argonTheme.COLORS.PRIMARY} />
                </View>
            );
        }
        return (
            <Block middle flex>
                <Block flex style={{ width: '90%' }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            _map(serviceData, item => (
                                <Notification
                                    body={`${_get(item, 'title', 'Charges')} paid for ${_get(item, 'period', EMPTY_STRING)} through ${_get(item, 'payment_mode', EMPTY_STRING)} mode.`}
                                    iconName="ship"
                                    iconFamily="font-awesome"
                                    style={{ marginTop: 15 }}
                                    period={_get(item, 'period', EMPTY_STRING)}
                                    onPress={() => {
                                        Alert.alert(
                                            'Invoice',
                                            'Do you want to download the invoice?',
                                            [
                                                {
                                                    text: 'Close',
                                                    style: 'cancel',
                                                },
                                                {
                                                    text: 'Download',
                                                    onPress: () => this.handleDownloadInvoice(item),
                                                },
                                            ]);
                                    }}

                                />))
                        }
                        <Block style={{ marginBottom: 20 }} />
                    </ScrollView>
                </Block>
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});

