import {
  StyleSheet,
  Image,
  View,
  StatusBar,
  Text,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { COLORS, NETWORK } from '../../constants';
import { CustomButton, CustomAlert } from '../../components/';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreaters from '../../states/actionCreaters/actionCreaters';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = ({ navigation, route, serviceToken }) => {
  const { product } = route.params;
  const dispatch = useDispatch();

  const { addCartItem } = bindActionCreators(actionCreaters, dispatch);

  //method to add item to cart(redux)
  const handleAddToCat = (item) => {
    addCartItem(item);
    navigation.navigate('checkout');
  };

  //remove the authUser from async storage and navigate to login
  const logout = async () => {
    await AsyncStorage.removeItem('authUser');
    navigation.replace('login');
  };

  const [onWishlist, setOnWishlist] = useState(false);
  const [avaiableQuantity, setAvaiableQuantity] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [productImage, SetProductImage] = useState(' ');
  const [wishlistItems, setWishlistItems] = useState([]);
  const [error, setError] = useState('');
  const [isDisable, setIsDisbale] = useState(true);
  const [alertType, setAlertType] = useState('error');

  //method to fetch wishlist from server using API call
  const fetchWishlist = async () => {
    var myHeaders = new Headers();
    myHeaders.append('x-auth-token', serviceToken);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(`${NETWORK.serverip}/wishlist`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result?.err === 'jwt expired') {
          logout();
        }
        if (result.success) {
          setWishlistItems(result.data[0].wishlist);
          setIsDisbale(false);

          //check if the current active product is already in wishlish or not
          result.data[0].wishlist.map((item) => {
            if (item?.productId?._id === product?._id) {
              setOnWishlist(true);
            }
          });

          setError('');
        }
      })
      .catch((error) => {
        setError(error.message);
        console.log('error', error);
      });
  };

  //method to increase the product quantity
  const handleIncreaseButton = (quantity) => {
    if (avaiableQuantity > quantity) {
      setQuantity(quantity + 1);
    }
  };

  //method to decrease the product quantity
  const handleDecreaseButton = (quantity) => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  //method to add or remove item from wishlist
  const handleWishlistBtn = async () => {
    setIsDisbale(true);
    const value = await AsyncStorage.getItem('authUser');
    let user = JSON.parse(value);

    if (onWishlist) {
      var myHeaders = new Headers();
      myHeaders.append('x-auth-token', serviceToken);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      //API call to remove a item in wishlish
      fetch(
        `${NETWORK.serverip}/remove-from-wishlist?id=${product?._id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            setError(result.message);
            setAlertType('success');
            setOnWishlist(false);
          } else {
            setError(result.message);
            setAlertType('error');
          }
          setOnWishlist(!onWishlist);
        })
        .catch((error) => {
          setError(result.message);
          setAlertType('error');
          console.log('error', error);
        });
      setIsDisbale(false);
    } else {
      var myHeaders2 = new Headers();
      myHeaders2.append('x-auth-token', serviceToken);
      myHeaders2.append('Content-Type', 'application/json');

      var raw2 = JSON.stringify({
        productId: product?._id,
        quantity: 1,
      });

      var addrequestOptions = {
        method: 'POST',
        headers: myHeaders2,
        body: raw2,
        redirect: 'follow',
      };

      console.log(addrequestOptions);

      //API call to add a item in wishlish
      fetch(`${NETWORK.serverip}/add-to-wishlist`, addrequestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.success) {
            setError(result.message);
            setAlertType('success');
            setOnWishlist(true);
          } else {
            setError(result.message);
            setAlertType('error');
          }
          setOnWishlist(!onWishlist);
        })
        .catch((error) => {
          setError(result.message);
          setAlertType('error');
          console.log('error', error);
        });
      setIsDisbale(false);
    }
  };

  //set quantity, avaiableQuantity, product image and fetch wishlist on initial render
  useEffect(() => {
    setQuantity(1);
    setAvaiableQuantity(product.quantity);
    //SetProductImage(`${NETWORK.serverip}/uploads/${product?.image}`);
    SetProductImage(product?.image);

    fetchWishlist();
  }, []);

  //render whenever the value of wishlistItems change
  useEffect(() => { }, [wishlistItems]);

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.bodyContainer}>
        <View style={styles.productImageContainer}>
          <Image source={{ uri: productImage }} style={styles.productImage} />
        </View>
        <CustomAlert message={error} type={alertType} />
        <View style={styles.productInfoContainer}>
          <View style={styles.productInfoTopContainer}>
            <View style={styles.productNameContaier}>
              <Text style={styles.productNameText}>{product?.title}</Text>
            </View>
            <View style={styles.productDetailContainer}>
              <View style={styles.productSizeOptionContainer}>
                {/* <Text style={styles.secondaryTextSm}>Size:</Text> */}
              </View>
              <View style={styles.productPriceContainer}>
                <Text style={styles.secondaryTextSm}>Price:</Text>
                <Text style={styles.primaryTextSm}>₹{product?.price}</Text>
              </View>
            </View>
            <View style={styles.productDescriptionContainer}>
              <Text style={styles.secondaryTextSm}>Description:</Text>
              <Text>{product?.description}</Text>
            </View>
          </View>
          <View style={styles.productInfoBottomContainer}>
            <View style={styles.productButtonContainer}>
              {avaiableQuantity > 0 ? (
                <CustomButton
                  text={'Book Now'}
                  onPress={() => {
                    handleAddToCat(product);
                  }}
                />
              ) : (
                <CustomButton text={'Out of Stock'} disabled={true} />
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirecion: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  topBarContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  toBarText: {
    fontSize: 15,
    fontWeight: '600',
  },
  bodyContainer: {
    width: '100%',
    flexDirecion: 'row',
    backgroundColor: COLORS.light,
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  productImageContainer: {
    width: '100%',
    flex: 2,
    backgroundColor: COLORS.light,
    flexDirecion: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 0,
  },
  productInfoContainer: {
    width: '100%',
    flex: 3,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    elevation: 25,
  },
  productImage: {
    height: 300,
    width: 300,
    resizeMode: 'contain',
  },
  productInfoTopContainer: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
    flex: 1,
  },
  productInfoBottomContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: COLORS.light,
    width: '100%',
    height: 140,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  productButtonContainer: {
    padding: 20,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: COLORS.white,
    width: '100%',
    height: 100,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productNameContaier: {
    padding: 5,
    paddingLeft: 20,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  productNameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoButtonContainer: {
    padding: 5,
    paddingRight: 0,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  wishlistButtonContainer: {
    height: 50,
    width: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.light,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  productDetailContainer: {
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
  },
  secondaryTextSm: { fontSize: 15, fontWeight: 'bold' },
  primaryTextSm: { color: COLORS.primary, fontSize: 15, fontWeight: 'bold' },
  productDescriptionContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 20,
  },
  counterContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 50,
  },
  counter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  counterButtonContainer: {
    display: 'flex',
    width: 30,
    height: 30,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.muted,
    borderRadius: 15,
    elevation: 2,
  },
  counterButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  counterCountText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItemCountContainer: {
    position: 'absolute',
    zIndex: 10,
    top: -10,
    left: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 22,
    width: 22,
    backgroundColor: COLORS.danger,
    borderRadius: 11,
  },
  cartItemCountText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 10,
  },
});
