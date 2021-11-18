import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  SIZES,
  COLORS, 
  FONTS, 
  icons, 
  images
} from '../constants'
import { ContentComponent } from '../components';

export default class InformationScreen extends React.Component {
  render() {
    const { navigation, route } = this.props;
    const { ramUsed, 
            IPAddress, 
            cpuSpeed, 
            wifiStrength,
            upTime
    } = route.params.data;
    
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
    
    const renderItem = () => {
      return (
           <View 
            style={{
              flexDirection: 'row', 
              paddingHorizontal: SIZES.padding * 2,
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}
           >
              <ContentComponent
                name='Ram used'
                icon={icons.ram}
                value={ramUsed}
                unit='KB'
              />
              <ContentComponent
                name='Cpu clock'
                icon={icons.cpu}
                value={cpuSpeed}
                unit='mHz'
              />
              <ContentComponent
                name='IP address'
                icon={icons.ip}
                value={IPAddress}
                unit=''
              />
              <ContentComponent
                name='WiFi strength'
                icon={icons.signal}
                value={wifiStrength}
                unit='mHz'
              />
              <ContentComponent
                name='Up time'
                icon={icons.working_time}
                value={upTime}
                unit=''
              />
            </View>
        );
    }
    return(
      <View 
        style={{
          flex: 1,
          paddingTop: SIZES.padding * 2
        }}
      >
        {renderHeader()}
        {renderItem()}
      </View>
      );
  }
}