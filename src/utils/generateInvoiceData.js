import { generateInvoice } from '../screens/Payments/payment.services';

import { Platform, PermissionsAndroid, Alert } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { argonTheme } from '../constants';

import RNFetchBlob from 'rn-fetch-blob';

export const generateInvoiceData = async ({
  userInfo,
  maintenanceData,
  DownloadInvoiceCallback,
}) => {
  let date = new Date();
  let invoiceData = {
    payment_date: maintenanceData.transaction_details.payment_date,
    name: userInfo.name,
    email: userInfo.email,
    flat: userInfo.flat,
    block: userInfo.block,
    apartment_name: userInfo.apartment_name,
    payment_mode: maintenanceData.payment_mode,
    razorpay_payment_id:
      maintenanceData.transaction_details.razorpay_payment_id,
    period: maintenanceData.period,

    invoiceNumber: maintenanceData.id + date.toISOString().split('T')[0],
  };

  const handleCallback = () => {
    DownloadInvoiceCallback();
  };

  const downloadFile = async () => {
    let response = await generateInvoice(invoiceData);

    let { url, name } = response.data.data;
    let FILE_URL = url;
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.DownloadDir;
    console.log(RootDir);
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path: RootDir + '/file_' + name,
        description: 'Invoice',
        notification: true,
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        showMessage({
          message: 'File Successfully Downloaded',
          type: 'Success',
          backgroundColor: argonTheme.COLORS.SUCCESS,
        });
        handleCallback();
      });
  };
  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          showMessage({
            message: 'Storage Permission Not Granted',
            type: 'Failure',
            backgroundColor: argonTheme.COLORS.WARNING,
          });
          handleCallback();
        }
      } catch (err) {
        // To handle permission related exception
        console.log('Error in Permission: ' + err);
        showMessage({
          message: 'Error Occured',
          type: 'Failure',
          backgroundColor: argonTheme.COLORS.WARNING,
        });
        handleCallback();
      }
    }
  };

  //check permission and download pdf
  checkPermission();
};
