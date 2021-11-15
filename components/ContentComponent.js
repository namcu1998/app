import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FONTS, COLORS, SIZES, images, icons } from '../constants';

export default class ContentComponent extends React.Component {
	render() {
	  const { name, unit, value, icon } = this.props;
	  
	  return (
	      <View style={{paddingTop: SIZES.padding}}>
          <Image
            source={icon}
            resizeMode='contain'
            style={{
              width: 25,
              height: 25,
            }}
          />
          <Text style={{color: '#00000080'}}>{name}</Text>
          <Text style={{...FONTS.h2}}>{value}{unit}</Text>
         </View>
      );
    }
}