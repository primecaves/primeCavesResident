import { Block, Button } from 'galio-framework';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  showImagePicker,
} from 'react-native-image-picker';
import Modal from '../molecules/Modal';
import { EMPTY_ARRAY } from '../../constants';
import _map from 'lodash/map';
export default class ImagePickerPC extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourcePath: {},
      showModal: false,
    };
  }
  componentDidMount() {
    this.requestCameraPermission();
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

  // selectFile = () => {
  //   var options = {
  //     title: 'Select Image',
  //     customButtons: [
  //       {
  //         name: 'customOptionKey',
  //         title: 'Choose file from Custom Option',
  //       },
  //     ],
  //     storageOptions: {
  //       skipBackup: true,
  //       path: 'images',
  //     },
  //   };
  //   (options, res => {
  //     console.log('Response = ', res);
  //     if (res.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (res.error) {
  //       console.log('ImagePicker Error: ', res.error);
  //     } else if (res.customButton) {
  //       console.log('User tapped custom button: ', res.customButton);
  //       alert(res.customButton);
  //     } else {
  //       let source = res;
  //       this.setState({
  //         resourcePath: source,
  //       });
  //     }
  //   });
  // };
  // Launch Camera
  cameraLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.uri };
        console.log('response', JSON.stringify(res));
        this.setState({
          filePath: res,
          fileData: res.data,
          fileUri: res.uri,
        });
      }
    });
  };
  imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      selectionLimit: 0,
    };
    launchImageLibrary(options, res => {
      console.log('Response = ', res);
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.uri };
        console.log('response', JSON.stringify(res));
        this.setState({
          filePath: res,
          fileData: res.data,
          fileUri: res.uri,
        });
      }
    });
  };
  renderModal = () => (
    <View style={styles.container}>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'data:image/jpeg;base64,' + this.state.resourcePath.data,
          }}
          style={{ width: 100, height: 100 }}
        />
        <Image
          source={{ uri: this.state.resourcePath.uri }}
          style={{ width: 200, height: 200 }}
        />
        <Text style={{ alignItems: 'center' }}>
          {this.state.resourcePath.uri}
        </Text>
        {/* <TouchableOpacity onPress={this.selectFile} style={styles.button}>
      <Text style={styles.buttonText}>Select File</Text>
    </TouchableOpacity> */}
        <TouchableOpacity onPress={this.cameraLaunch} style={styles.button}>
          <Text style={styles.buttonText}>Launch Camera Directly</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.imageGalleryLaunch}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Launch Image Gallery Directly</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  handleModal = () => {
    this.setState({ showModal: true });
  };
  render() {
    const {
      showModal,
      // resourcePath: {
      //   filePath: { assets = EMPTY_ARRAY },
      // },
      filePath,
    } = this.state;
    console.log(this.state);
    // console.log('Asserts', filePath.assets[0].uri);
    return (
      <Block>
        {showModal && <Modal visibe={showModal} content={this.renderModal} />}

        {/* {_map(filePath.assets, item => (
          <Image
            source={{
              uri: item.uri,
              width: 50,
              height: 50,
            }}
          />
        ))} */}
        <Button
          onPress={this.handleModal}
          onlyIcon
          icon="tags"
          iconFamily="antdesign"
          iconSize={30}
          color="warning"
          iconColor="#fff"
          style={{ width: 40, height: 40 }}
        />
      </Block>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#3740ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    marginBottom: 12,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#fff',
  },
});

// filePath = {
//   assets: [{ filename: '', uri: '' }],
// };
