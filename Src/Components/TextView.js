import React from 'react';
import { Text } from 'react-native';

export default function TextView(props) {
  const {
    text,
    fontSize = 14,
    fontWeight = 'normal',
    color = '#fff',
    marginBottom = 0,
    marginTop = 0,
    marginLeft = 0,
    marginRight = 0,
    alignSelf = 'auto',
    textAlign = 'left',
    style = {},
  } = props;

  return (
    <Text
    numberOfLines={props.numberOfLines}
      style={{
        fontSize,
        fontWeight,
        color,
        marginBottom,
        marginTop,
        marginLeft,
        marginRight,
        alignSelf,
        textAlign,
        ...style,
      }}
    >
      {text}
    </Text>
  );
}
