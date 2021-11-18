import React from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';
import { FONTS, COLORS, SIZES, images, icons } from '../constants';
import { ChartComponent } from '../components';

export default class ChartScreen extends React.Component {
  render() {
    return(
      <View
        style={{
          backgroundColor: '#292929',
          paddingTop: SIZES.padding * 2,
          paddingBottom: SIZES.padding * 2,
        }}
      >
      <ScrollView
        ScrollEnable={true}
      >
        <ChartComponent
          chartName='Temperature'
          chartStyle= 'line'
        />
        <ChartComponent
          chartName='Humidity'
          chartStyle='line'
        />
        <ChartComponent
          chartName='Light'
          chartStyle='bar'
        />
      </ScrollView>
      </View>
    );
  }
}