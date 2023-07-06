import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS, NETWORK } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import { CustomAlert, BasicProductList, CustomButton } from '../../components';
import ProgressDialog from 'react-native-progress-dialog';
import DropDownPicker from 'react-native-dropdown-picker';

const ViewOrderDetailScreen = ({ navigation, route, serviceToken }) => {
  const { orderDetail } = route.params;
  const [isloading, setIsloading] = useState(false);
  const [label, setLabel] = useState('Loading..');
  const [error, setError] = useState('');
  const [alertType, setAlertType] = useState('error');
  const [totalCost, setTotalCost] = useState(0);
  const [address, setAddress] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [statusDisable, setStatusDisable] = useState(false);
  const [items, setItems] = useState([
    { label: 'Pending', value: 'pending' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Delivered', value: 'delivered' },
  ]);

  //method to convert the time into AM PM format
  function tConvert(time) {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
    if (time.length > 1) {
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join('');
  }

  //method to convert the Data into dd-mm-yyyy format
  const dateFormat = (datex) => {
    let t = new Date(datex);
    const date = ('0' + t.getDate()).slice(-2);
    const month = ('0' + (t.getMonth() + 1)).slice(-2);
    const year = t.getFullYear();
    const hours = ('0' + t.getHours()).slice(-2);
    const minutes = ('0' + t.getMinutes()).slice(-2);
    const seconds = ('0' + t.getSeconds()).slice(-2);
    const time = tConvert(`${hours}:${minutes}:${seconds}`);
    const newDate = `${date}-${month}-${year}, ${time}`;

    return newDate;
  };

  //method to update the status using API call
  const handleUpdateStatus = (id) => {
    setIsloading(true);
    setError('');
    setAlertType('error');
    var myHeaders = new Headers();
    myHeaders.append('x-auth-token', serviceToken);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    console.log(
      `Link:${NETWORK.serverip}/admin/order-status?orderId=${id}&status=${value}`
    );

    fetch(
      `${NETWORK.serverip}/admin/order-status?orderId=${id}&status=${value}`,
      requestOptions
    ) //API call
      .then((response) => response.json())
      .then((result) => {
        if (result.success == true) {
          setError(`Order status is successfully updated to ${value}`);
          setAlertType('success');
          setIsloading(false);
        }
      })
      .catch((error) => {
        setAlertType('error');
        setError(error);
        console.log('error', error);
        setIsloading(false);
      });
  };

  // calculate the total cost and set the all requried variables on initial render
  useEffect(() => {
    setError('');
    setAlertType('error');
    if (orderDetail?.status == 'delivered') {
      setStatusDisable(true);
    } else {
      setStatusDisable(false);
    }
    setValue(orderDetail?.status);
    setAddress(
      orderDetail?.country +
      ', ' +
      orderDetail?.city +
      ', ' +
      orderDetail?.shippingAddress
    );
    setTotalCost(
      orderDetail?.items.reduce((accumulator, object) => {
        return (accumulator + object.price) * object.quantity;
      }, 0) // calculate the total cost
    );
  }, []);
  return (
    <View style={styles.container}>
      <ProgressDialog visible={isloading} label={label} />
      <StatusBar />
      <View style={styles.TopBarContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color={COLORS.muted}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.screenNameContainer}>
        <View>
          <Text style={styles.screenNameText}>Order Details</Text>
        </View>
        <View>
          <Text style={styles.screenNameParagraph}>
            View all detail about order
          </Text>
        </View>
      </View>
      <CustomAlert message={error} type={alertType} />
      <ScrollView
        style={styles.bodyContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerNameContainer}>
          <View>
            <Text style={styles.containerNameText}>Ship & Bill to</Text>
          </View>
        </View>
        <View style={styles.ShipingInfoContainer}>
          <Text style={styles.secondarytextMedian}>
            {orderDetail?.user?.name}
          </Text>
          <Text style={styles.secondarytextMedian}>
            {orderDetail?.user?.email}
          </Text>
          <Text style={styles.secondarytextSm}>{address}</Text>
          <Text style={styles.secondarytextSm}>{orderDetail?.zipcode}</Text>
        </View>
        <View>
          <Text style={styles.containerNameText}>Order Info</Text>
        </View>
        <View style={styles.orderInfoContainer}>
          <Text style={styles.secondarytextMedian}>
            Order # {orderDetail?.orderId}
          </Text>
          <Text style={styles.secondarytextSm}>
            Ordered on {dateFormat(orderDetail?.updatedAt)}
          </Text>
          {orderDetail?.shippedOn && (
            <Text style={styles.secondarytextSm}>
              Shipped on {orderDetail?.shippedOn}
            </Text>
          )}
          {orderDetail?.deliveredOn && (
            <Text style={styles.secondarytextSm}>
              Delivered on {orderDetail?.deliveredOn}
            </Text>
          )}
        </View>
        <View style={styles.containerNameContainer}>
          <View>
            <Text style={styles.containerNameText}>Package Details</Text>
          </View>
        </View>
        <View style={styles.orderItemsContainer}>
          <View style={styles.orderItemContainer}>
            <Text style={styles.orderItemText}>Package</Text>
            <Text>{value}</Text>
          </View>
          <View style={styles.orderItemContainer}>
            <Text style={styles.orderItemText}>
              Order on : {dateFormat(orderDetail?.updatedAt)}
            </Text>
          </View>
          <ScrollView
            style={styles.orderSummaryContainer}
            nestedScrollEnabled={true}
          >
            {orderDetail?.items.map((product, index) => (
              <View key={index}>
                <BasicProductList
                  title={product?.productId?.title}
                  price={product?.price}
                  quantity={product?.quantity}
                />
              </View>
            ))}
          </ScrollView>
          <View style={styles.orderItemContainer}>
            <Text style={styles.orderItemText}>Total</Text>
            <Text>{totalCost}$</Text>
          </View>
        </View>
        <View style={styles.emptyView} />
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View>
          <DropDownPicker
            style={{ width: 200 }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            disabled={statusDisable}
            disabledStyle={{
              backgroundColor: COLORS.light,
              borderColor: COLORS.white,
            }}
            labelStyle={{ color: COLORS.muted }}
          />
        </View>
        <View>
          {statusDisable == false ? (
            <CustomButton
              text={'Update'}
              onPress={() => handleUpdateStatus(orderDetail?._id)}
            />
          ) : (
            <CustomButton text={'Update'} disabled />
          )}
        </View>
      </View>
    </View>
  );
};

export default ViewOrderDetailScreen;

const styles = StyleSheet.create({
  container: {
    flexDirecion: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 0,
    flex: 1,
  },
  TopBarContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  screenNameContainer: {
    marginTop: 10,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  screenNameText: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.muted,
  },
  screenNameParagraph: {
    marginTop: 10,
    fontSize: 15,
  },
  bodyContainer: { flex: 1, width: '100%', padding: 5 },
  ShipingInfoContainer: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    borderColor: COLORS.muted,
    elevation: 5,
    marginBottom: 10,
  },
  containerNameContainer: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  containerNameText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.muted,
  },
  secondarytextSm: {
    color: COLORS.muted,
    fontSize: 13,
  },
  orderItemsContainer: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,

    borderColor: COLORS.muted,
    elevation: 3,
    marginBottom: 10,
  },
  orderItemContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderItemText: {
    fontSize: 13,
    color: COLORS.muted,
  },
  orderSummaryContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    maxHeight: 220,
    width: '100%',
    marginBottom: 5,
  },
  bottomContainer: {
    backgroundColor: COLORS.white,
    width: '110%',
    height: 70,
    borderTopLeftRadius: 10,
    borderTopEndRadius: 10,
    elevation: 5,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingLeft: 10,
    paddingRight: 10,
  },
  orderInfoContainer: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,

    borderColor: COLORS.muted,
    elevation: 1,
    marginBottom: 10,
  },
  primarytextMedian: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: 'bold',
  },
  secondarytextMedian: {
    color: COLORS.muted,
    fontSize: 15,
    fontWeight: 'bold',
  },
  emptyView: {
    height: 20,
  },
});
