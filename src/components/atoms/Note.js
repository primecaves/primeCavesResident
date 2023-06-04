import React from 'react';
import { Text } from 'galio-framework';
import argonTheme from '../../constants/Theme';
import { EMPTY_STRING } from '../../constants';

const Note = ({ message = EMPTY_STRING }) => {
  {
    return (
      <Text
        size={11}
        style={{
          color: argonTheme.COLORS.PRIMARY,
          fontFamily: 'open-sans-regular',
          padding: 8,
        }}
      >{`NOTE:${message}`}</Text>
    );
  }
};

export default Note;
