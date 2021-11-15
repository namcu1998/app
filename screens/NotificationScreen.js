import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FONTS, SIZES, COLORS, images, icons } from '../constants';
export default class InformationScreen extends React.Component {
  render() {
    const { navigation, route } = this.props;
    const  { data } = route.params;
    
    const renderHeader = () => {
      return (
          <View>
            <Button
              icon={
                <Icon
                  name="arrow-left"
                  size={15}
                  color="white"
                />
              }
              iconLeft
              onPress={() => {navigation.navigate('Home')}}
            />
          </View>
        )
    }
    const renderContent = () => {
        return data.map((item, index) => {
          return (
            <View key={index} style={{width: '100%', height: 50, backgroundColor: 'red', alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{...FONTS.h1}}>{item}</Text>
            </View>
          );
        })
    }
    return(
      <View
        style={{
          paddingTop: SIZES.padding * 2
        }}
      >
        {renderHeader()}
        {renderContent()}
      </View>
      );
  }
}