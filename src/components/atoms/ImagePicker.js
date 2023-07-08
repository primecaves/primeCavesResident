import { Block, Button } from 'galio-framework';
import React from 'react';
import {
  StyleSheet,
  Image,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Modal from '../molecules/Modal';
import { EMPTY_ARRAY, argonTheme } from '../../constants';
import _get from 'lodash/get';
import _map from 'lodash/map';

export default class ImagePickerPC extends React.Component {
  constructor(props) {
    super(props);
    const exisitingImages = _map(_get(props, 'value', EMPTY_ARRAY), item => { return { uri: item }; });
    this.state = {
      resourcePath: {},
      selectedFiles: exisitingImages,
      showModal: false,
    };
  }
  componentDidMount() {
    this.requestCameraPermission();
    this.requestReadWritePermission();
  }
  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  requestReadWritePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App  Permission',
          message:
            'App needs access to your Write External Storage ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Write External Storage');
      } else {
        console.log('Write External Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  cameraLaunch = () => {
    const { onValueChange } = this.props;
    let options = {
      selectionLimit: 5,
      includeBase64: false,
      saveToPhotos: true,
    };
    launchCamera(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        this.setState({
          selectedFiles: _get(res, 'assets', EMPTY_ARRAY),
          showModal: false,
        });
        onValueChange(_map(_get(res, 'assets', EMPTY_ARRAY), item => { return { uri: item.uri }; }));
      }
    });
  };
  imageGalleryLaunch = () => {
    const { onValueChange } = this.props;
    let options = {
      selectionLimit: 5,
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, res => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        this.setState({
          selectedFiles: _get(res, 'assets', EMPTY_ARRAY),
          showModal: false,
        });
        onValueChange(_map(_get(res, 'assets', EMPTY_ARRAY), item => { return { uri: item.uri }; }));

      }
    });
  };
  renderContent = () => (
    <ScrollView
      // horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      <Button
        style={styles.button}
        onPress={this.cameraLaunch}
        iconFamily="Entypo"
        onlyIcon
        icon="camera"
        iconSize={50}
      />
      <Button
        style={styles.button}
        onPress={this.imageGalleryLaunch}
        iconFamily="FontAwesome"
        onlyIcon
        icon="photo"
        iconSize={50}
      />
      <Button
        style={styles.button}
        onPress={this.toggleModal}
      >
        Close
      </Button>
    </ScrollView>
  );
  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));

  };
  render() {
    const {
      showModal,
      selectedFiles,
    } = this.state;
    return (
      <>
        {/* <ActionSheet
          visible={true}
          content={this.renderContent}
          onClose={this.toggleModal}
        /> */}
        {showModal && (
          <Modal
            visible={showModal}
            content={this.renderContent}
          />)}
        <ScrollView horizontal={true}>
          {_map(selectedFiles, (item, index) => (
            item.uri ? (<Image
              style={styles.image}
              key={index}
              source={{
                uri: item.uri,
                width: 100,
                height: 100,
              }}
            />) : null
          ))}
        </ScrollView>
        <Block center>
          <Button
            onPress={this.toggleModal}
            onlyIcon
            icon="folder-images"
            iconFamily="Entypo"
            iconSize={50}
            color={argonTheme.COLORS.PRIMARY}
            iconColor="#fff"
            style={{ width: 70, height: 70 }}
          />
        </Block>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: argonTheme.COLORS.PRIMARY,
  },
  image: {
    borderColor: argonTheme.COLORS.WHITE,
    borderWidth: 2,
  },
});
