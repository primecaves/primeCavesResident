import React from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { Block, theme } from 'galio-framework';
import { NoticeCard, Filter, SkeletionLoader } from '../../components';
import _map from 'lodash/map';
import _uniq from 'lodash/uniq';
import _cloneDeep from 'lodash/cloneDeep';

import { fetchAllNotices } from './noticeBoard.services';

class NoticeBoard extends React.Component {
  state = {
    isLoading: true,
    notices: [],
    initialCards: [],
  };

  componentDidMount() {
    this.fetchNotice();
  }

  fetchNotice = () => {
    this.setState({ isLoading: true });
    fetchAllNotices()
      .then(response => {
        if (response) {
          const {
            data: { data },
          } = response;
          this.setState({
            isLoading: false,
            notices: data,
            initialCards: _cloneDeep(data),
          });
        }
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };

  renderSkeletonLoader = () => {
    return (
      <Block>
        <SkeletionLoader noticeCard />
        <SkeletionLoader noticeCard />
        <SkeletionLoader noticeCard />
      </Block>
    );
  };

  renderCards = () => {
    const { notices, initialCards, isLoading } = this.state;
    return (
      <Block flex style={styles.group}>
        {/* <Block style={styles.filterContainer}>
          <Filter
            title="Notice Board"
            filterParams={_uniq(_map(notices, item => item.tag))}
            initialFilterParams={_uniq(_map(notices, item => item.tag))}
            filterKey="tag"
            initialCards={initialCards}
          />
        </Block> */}
        <Block flex>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            {_map(notices, item => (
              <NoticeCard isLoading={isLoading} item={item} horizontal />
            ))}
          </Block>
        </Block>
      </Block>
    );
  };

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return this.renderSkeletonLoader();
    }
    return (
      <Block flex>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={this.fetchNotice}
            />
          }
        >
          {this.renderCards()}
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  group: {
    paddingTop: theme.SIZES.BASE,
  },
  filterContainer: {
    paddingLeft: 18,
    paddingRight: 18,
  },
});

export default NoticeBoard;
