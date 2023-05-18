import firestore from '@react-native-firebase/firestore';
import _size from 'lodash/size';
import _noop from 'lodash/noop';
import { fetchPostFeeds } from '../actions/base.action';

export const fetchUserDetailsServices = async ({
  loading = false,
  setLoading = _noop,
  dispatch = _noop,
}) => {
  try {
    const list = [];
    await firestore()
      .collection('posts')
      .orderBy('postTime', 'desc')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const {
            userId,
            post,
            postImg,
            postTime,
            comments,
            likedUsers,
          } = doc.data();
          list.push({
            id: doc.id,
            userId,
            userName: 'Test Name',
            userImg:
              'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
            postTime: postTime,
            post,
            postImg,
            likedUsers,
            likes: _size(likedUsers),
            comments,
          });
        });
      });
    dispatch(fetchPostFeeds(list));
    if (loading) {
      setLoading(false);
    }
  } catch (e) {
    console.log(e);
  }
};
