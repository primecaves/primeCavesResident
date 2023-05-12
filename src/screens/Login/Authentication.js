import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Brand } from '../../components';
import { setDefaultTheme } from '../../store/theme';
import { Text, Input, Button, Block } from 'galio-framework';
import ActionSheet from '../../components/molecules/ActionSheet';

const Authentication = ({ navigation }) => {
  const { Layout } = useTheme();
  const content = () => {
    return (
      <Block>
        <Text>Sign in</Text>
        <Input placeholder="Enter your number" />
        <Button>Enter</Button>
      </Block>
    );
  };
  return (
    <View style={[Layout.fill, Layout.colCenter]}>
      <Brand />
      <ActionSheet content={content} />;
    </View>
  );
};
export default Authentication;
