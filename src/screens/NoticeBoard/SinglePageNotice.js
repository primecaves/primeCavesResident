import React from 'react';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Animated,
  Platform,
  Modal,
} from 'react-native';
import { Block, Text, Button, theme } from 'galio-framework';
import { Icon, SkeletionLoader } from '../../components';
import {
  argonTheme,
  EMPTY_ARRAY,
  EMPTY_OBJECT,
  EMPTY_STRING,
} from '../../constants';
import { iPhoneX, HeaderHeight } from '../../constants/utils';
import RNPoll from 'react-native-poll';
import moment from 'moment';
import _get from 'lodash/get';
import _uniqBy from 'lodash/uniqBy';
import _cloneDeep from 'lodash/cloneDeep';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import _upperCase from 'lodash/upperCase';
import _startCase from 'lodash/startCase';
import { fetchSingleNotice } from './noticeBoard.services';
const { width } = Dimensions.get('window');

export default class SinglePageNotice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      selectedChoice: EMPTY_OBJECT,
      notice: EMPTY_ARRAY,
      choices: EMPTY_ARRAY,
      isLoading: true,
    };
  }

  handleResetPoll = () => {
    const { initialChoices } = this.state;
    this.setState({ choices: initialChoices });
  };

  handlePollSelected = selectedChoice => {
    const { choices } = this.state;
    this.setState({
      choices: _uniqBy(
        [...choices, { ...selectedChoice, votes: selectedChoice.votes + 1 }],
        'id',
      ),
    });
    //Yet to build API
    // this.setState({ isLoading: true })
    // fetchMenuDetailService().then(response => {
    //     if (response) {
    //         const { data } = response;
    //         this.setState({
    //             isLoading: false,
    //             menu: _get(data, 'data', []),
    //         })
    //     }
    // }).catch(() => {
    //     this.setState({ isLoading: false })
    // });
  };

  renderModal = () => {
    const { isModalVisible, notice, choices } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={this.toggleModal}
      >
        <Block
          style={{
            padding: 20,
            backgroundColor: argonTheme.COLORS.WHITE,
          }}
        >
          <Block right>
            <Icon
              family="FontAwesome"
              size={20}
              name="close"
              onPress={this.toggleModal}
            />
          </Block>

          <Text
            italic
            style={{ fontFamily: 'open-sans-regular' }}
            size={14}
            color={argonTheme.COLORS.TEXT}
            center
          >
            {_get(notice, 'poll_question', EMPTY_STRING)}
          </Text>
          <Block right>
            <Icon
              family="FontAwesome"
              size={20}
              name="refresh"
              style={{ top: 30 }}
              onPress={this.toggleModal}
            />
          </Block>
          <ScrollView vertical={true}>
            <RNPoll
              disableBuiltInIncreaseVote={true}
              appearFrom="left"
              animationDuration={750}
              totalVotes={30}
              fillBackgroundColor={argonTheme.COLORS.PRIMARY}
              choiceTextStyle={{
                fontFamily: 'open-sans-regular',
                fontSize: 10,
              }}
              hasBeenVote={true}
              choices={_map(choices, item => ({ ...item, choice: _startCase(item.choice) }))}
              borderColor={argonTheme.COLORS.BLACK}
              onChoicePress={this.handlePollSelected}
            />
          </ScrollView>
        </Block>
      </Modal>
    );
  };

  renderSkeletonLoader = () => {
    return (
      <Block>
        <SkeletionLoader />
        <SkeletionLoader />
        <SkeletionLoader />
      </Block>
    );
  };

  fetchNotice = () => {
    const { route } = this.props;
    const id = _get(route, 'params.product._id');
    this.setState({ isLoading: true });
    fetchSingleNotice(id)
      .then(response => {
        if (response) {
          const { data: { data } } = response;
          this.setState({
            isLoading: false,
            notice: data,
            initialChoices: _cloneDeep(data),
            choices: _get(data, 'poll_options', []),
          });
        }
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };

  componentDidMount() {
    this.fetchNotice();
  }

  scrollX = new Animated.Value(0);

  renderGallery = () => {
    const { navigation } = this.props;
    const { notice } = this.state;

    const productImages = [_get(notice, 'image', '')];

    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        decelerationRate={0}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: this.scrollX } } }],
          { useNativeDriver: false },
        )}
      >
        {productImages.map((image, index) => (
          <TouchableWithoutFeedback
            key={`notice-image-${index}`}
            onPress={() =>
              navigation.navigate('Gallery', { images: productImages, index })
            }
          >
            <Image
              resizeMode="cover"
              source={{ uri: image }}
              style={{ width, height: iPhoneX ? width + 32 : width }}
            />
          </TouchableWithoutFeedback>
        ))}
      </ScrollView>
    );
  };

  toggleModal = () => {
    const { isModalVisible } = this.state;
    this.setState({ isModalVisible: !isModalVisible });
  };

  render() {
    const { isModalVisible, notice, isLoading } = this.state;
    if (isLoading) {
      return this.renderSkeletonLoader();
    }
    return (
      <Block flex style={styles.notice}>
        <Block flex style={{ position: 'relative' }}>
          {!_isEmpty(_get(notice, 'image')) && this.renderGallery()}
        </Block>
        <Block />
        <Block flex style={styles.options}>
          <Block
            style={{
              paddingHorizontal: theme.SIZES.BASE,
              paddingTop: theme.SIZES.BASE * 2,
            }}
          >
            <Block row space="between">
              <Block row>
                <Icon
                  family="AntDesign"
                  size={10}
                  name="clockcircle"
                  color={argonTheme.COLORS.PRIMARY}
                />
                <Text
                  style={{
                    fontFamily: 'open-sans-regular',
                    bottom: 2,
                    left: 4,
                  }}
                  size={10}
                  color={argonTheme.COLORS.TEXT}
                >
                  {moment
                    .unix(_get(notice, 'last_updated_date', new Date() / 1000))
                    .format('MMM DD, YYYY')}
                </Text>
              </Block>
              {isModalVisible && this.renderModal()}
              <Block style={styles.pro} center>
                <Text
                  style={{ fontFamily: 'open-sans-bold' }}
                  size={6}
                  color="white"
                >
                  {_upperCase(_get(notice, 'tag'))}
                </Text>
              </Block>
            </Block>

            <Text
              bold
              size={15}
              style={{ fontFamily: 'open-sans-regular' }}
              color={argonTheme.COLORS.TEXT}
            >
              {_upperCase(notice.title)}
            </Text>
            <Button
              shadowless
              style={styles.addToArticle}
              color={argonTheme.COLORS.PRIMARY}
              onPress={this.toggleModal}
            >
              <Text
                onPress={this.toggleModal}
                style={{ fontFamily: 'open-sans-bold' }}
                color={argonTheme.COLORS.WHITE}
              >
                SHOW POLL
              </Text>
            </Button>
            <ScrollView vertical={true}>
              <Text
                muted
                size={12}
                style={{ paddingBottom: 24, fontFamily: 'open-sans-regular' }}
                color={argonTheme.COLORS.TEXT}
              >
                {notice.body}
              </Text>
            </ScrollView>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  notice: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  options: {
    position: 'relative',
    marginHorizontal: theme.SIZES.BASE,
    marginTop: -theme.SIZES.BASE * 2,
    marginBottom: 0,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
  },
  addToArticle: {
    width: width - theme.SIZES.BASE * 4,
    right: 10,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 1,
  },
  pro: {
    backgroundColor: argonTheme.COLORS.INFO,
    padding: 4,
    borderRadius: 4,
    minWidth: 40,
    bottom: 3,
  },
});
