import React from 'react';
import { View, Text } from 'react-native';
import { SIZES, FONTS, COLORS, images, icons } from '../constants';
import { GaugeComponent } from '../components';

export default class DetailScreen extends React.Component {
  
  render() {
    const { navigation, route } = this.props;
    
    const { value, name, unit, totalValue } = route.params;
    
    return (
        <View 
          style={{
            paddingTop: SIZES.padding * 2,
            paddingBottom: SIZES.padding * 2.5,
            paddingHorizontal: SIZES.padding,
            alignItems: 'center',
            backgroundColor: '#fff',
          }}
        >
          <Text>Detail Screen</Text>
          <GaugeComponent 
            value={value}
            totalValue={totalValue}
            unit={unit}
          />
        </View>
      );
  }
}