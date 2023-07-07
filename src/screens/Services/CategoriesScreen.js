import {
  StyleSheet,
  Image,
  View,
  StatusBar,
  Text,
  FlatList,
  RefreshControl,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import emptyBox from '../../assets/image/emptybox.png';
import { COLORS, NETWORK, argonTheme } from '../../constants';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreaters from '../../states/actionCreaters/actionCreaters';
import { Icon, Input, ProductCard, CustomIconButton, Button } from '../../components';
import _map from 'lodash/map';
import _get from 'lodash/get';
import { Block } from 'galio-framework';
import { theme } from 'galio-framework';


const DEFAULT_CATEGORY = {
  id: '1',
  _id: '1',
  title: 'All',
  image: require('../../assets/icons/garments.png'),
};
const CategoriesScreen = (props) => {
  console.log('UserInfo (from service):', props);
  const { navigation, route, serviceToken, userInfo, loginServices, registerServices } = props;
  const isMainLoading = _get(props, 'isLoading', false);
  // const { categoryID } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [onboardingLoading, setOnboardingLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [refeshing, setRefreshing] = useState(false);
  const [label, setLabel] = useState('Loading...');
  const [error, setError] = useState('');
  const [foundItems, setFoundItems] = useState([]);
  const [filterItem, setFilterItem] = useState('');
  const [isloading, setIsloading] = useState(false);
  const [category, setCategory] = useState('');
  //get the dimenssions of active window
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width
  );

  //initialize the cartproduct with redux data
  const dispatch = useDispatch();

  const { addCartItem } = bindActionCreators(actionCreaters, dispatch);

  //method to navigate to product detail screen of specific product
  const handleProductPress = (product) => {
    navigation.navigate('productdetail', { product: product });
  };

  //method to add the product to cart (redux)
  const handleAddToCat = (product) => {
    addCartItem(product);
  };

  //method call on pull refresh
  const handleOnRefresh = () => {
    setRefreshing(true);
    fetchProduct();
    setRefreshing(false);
  };


  const [selectedTab, setSelectedTab] = useState(category[0]);

  //method to fetch the product from server using API call
  const fetchProduct = () => {
    var headerOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    fetch(`${NETWORK.serverip}/products`, headerOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setProducts(result.data);
          setFoundItems(result.data);
          setError('');
        } else {
          setError(result.message);
        }
      })
      .catch((error) => {
        setError(error.message);
        console.log('error', error);
      });
  };
  const fetchCategories = () => {
    var headerOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    setIsloading(true);
    fetch(`${NETWORK.serverip}/categories`, headerOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          const categories = _map(result.categories,
            item => ({
              id: item._id,
              _id: item._id,
              title: item.title,
              image: require('../../assets/icons/garments.png'),
            }));
          setCategory([DEFAULT_CATEGORY, ...categories]);
          setError('');
        } else {
          setError(result.message);
        }
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
        setError(error.message);
      });
  };
  //listener call on tab focus and initlize categoryID
  navigation.addListener('focus', () => {
    // if (categoryID) {
    //   setSelectedTab(categoryID);
    // }
    setSelectedTab('1');
  });

  //method to filter the product according to user search in selected category
  const filter = () => {
    const keyword = filterItem;
    if (keyword !== '') {
      const results = products.filter((product) => {
        return product?.title.toLowerCase().includes(keyword.toLowerCase());
      });

      setFoundItems(results);
    } else {
      setFoundItems(products);
    }
  };

  //render whenever the value of filterItem change
  useEffect(() => {
    if (serviceToken) {
      filter();
    }

  }, [filterItem]);

  
  // setting initial tab value as category[0]. cause : due to multiple renders value is not persisting.
  // TODO: comment this when above is fixed and try the general solution
  useEffect(() => {
    setSelectedTab(category[0]);
  }, [category]);

  //fetch the product on initial render
  useEffect(() => {
    if (serviceToken) {
      fetchCategories();
      fetchProduct();
    }
    else {
      if (!_get(userInfo, 'service_enrolled', true)) {
        registerServices();
      } else {
        loginServices();
      }
    }
  }, []);

  const renderProducts = () => {
    if (selectedTab?._id === '1') {
      return <FlatList
        data={foundItems}
        refreshControl={
          <RefreshControl
            refreshing={refeshing}
            onRefresh={handleOnRefresh}
          />
        }
        keyExtractor={(index, item) => `${index}-${item}`}
        contentContainerStyle={{ margin: 10 }}
        numColumns={2}
        renderItem={({ item: product }) => (
          <View
            style={[
              styles.productCartContainer,
              { width: (windowWidth - windowWidth * 0.1) / 2 },
            ]}
          >
            <ProductCard
              cardSize={'large'}
              name={product.title}
              // image={`${NETWORK.serverip}/uploads/${product.image}`}
              image={product.image}
              price={product.price}
              quantity={product.quantity}
              onPress={() => handleProductPress(product)}
              onPressSecondary={() => handleAddToCat(product)}
            />
            <View style={styles.emptyView} />
          </View>
        )}
      />;
    }
    return foundItems.filter(
      (product) => product?.category?._id === selectedTab?._id
    ).length === 0 ? (
      <View style={styles.noItemContainer}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.white,
            height: 150,
            width: 150,
            borderRadius: 10,
          }}
        >
          <Image
            source={emptyBox}
            style={{ height: 80, width: 80, resizeMode: 'contain' }}
          />
          <Text style={styles.emptyBoxText}>
            There no categories selected
          </Text>
        </View>
      </View>
    ) : (
      <FlatList
        data={foundItems.filter(
          (product) => product?.category?._id === selectedTab?._id
        )}
        refreshControl={
          <RefreshControl
            refreshing={refeshing}
            onRefresh={handleOnRefresh}
          />
        }
        keyExtractor={(index, item) => `${index}-${item}`}
        contentContainerStyle={{ margin: 10 }}
        numColumns={2}
        renderItem={({ item: product }) => (
          <View
            style={[
              styles.productCartContainer,
              { width: (windowWidth - windowWidth * 0.1) / 2 },
            ]}
          >
            <ProductCard
              cardSize={'large'}
              name={product.title}
              // image={`${NETWORK.serverip}/uploads/${product.image}`}
              image={product.image}
              price={product.price}
              quantity={product.quantity}
              onPress={() => handleProductPress(product)}
              onPressSecondary={() => handleAddToCat(product)}
            />
            <View style={styles.emptyView} />
          </View>
        )}
      />
    );
  };
  if (isMainLoading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.topBarContainer} >
        <Block flex row space="between">
          <View style={styles.inputContainer} >
            <Input
              right
              color="black"
              //style={styles.search}
              placeholder="What are you looking for?"
              placeholderTextColor={'#8898AA'}
              iconContent={
                <Icon
                  size={16}
                  color={argonTheme.COLORS.MUTED}
                  name="search"
                  family="ant-design"
                />
              }
            />
          </View>
          <Block style={styles.chatContainer}>
            <Button
              radius={28}
              opacity={0.9}
              style={styles.chat}
              onPress={() => navigation.navigate('myorder')}
            >
              <Icon
                size={25}
                family="Entypo"
                name="shopping-bag"
                color={argonTheme.COLORS.WHITE}
              />
            </Button>
          </Block>
        </Block>
      </View>
      <View style={styles.bodyContainer}>
        <FlatList
          data={category}
          keyExtractor={(index, item) => `${index}-${item}`}
          horizontal
          style={{ flexGrow: 0 }}
          contentContainerStyle={{ padding: 10 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item: tab }) => (
            <CustomIconButton
              key={tab}
              text={tab.title}
              showImage={false}
              image={tab.image}
              active={selectedTab?.title === tab.title ? true : false}
              onPress={() => {
                setSelectedTab(tab);
              }}
            />
          )}
        />
        {/* <Tabs
          data={category || []}
        // initialIndex={tabIndex || defaultTab}
        // onChange={onChangeTab}
        /> */}
        {renderProducts()}
      </View>
    </View>
  );
};

export default CategoriesScreen;

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

  },
  toBarText: {
    fontSize: 15,
    fontWeight: '600',
  },
  inputContainer: {
    paddingLeft: 15,
    paddingRight: 20,
    width: '90%',
  },
  bodyContainer: {
    flex: 1,
    width: '100%',
    flexDirecion: 'row',
    backgroundColor: COLORS.light,
    justifyContent: 'flex-start',
  },
  cartIconContainer: {
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
  productCartContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 5,
    padding: 5,
    paddingBottom: 0,
    paddingTop: 0,
    marginBottom: 0,
  },
  noItemContainer: {
    width: '100%',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  emptyBoxText: {
    fontSize: 11,
    color: COLORS.muted,
    textAlign: 'center',
  },
  emptyView: {
    height: 20,
  },
  search: {
    height: 48,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER,
  },
  chatContainer: {
    right: theme.SIZES.BASE - 10,
    position: 'absolute',
  },
  chat: {
    width: 40,
    height: 44,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 1,
    backgroundColor: argonTheme.COLORS.PRIMARY,
  },
});
