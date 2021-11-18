import React from 'react';
import { Text, View, ScrollView, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getDatabase, ref, set, onValue } from '../Firebase';
import { FONTS, COLORS, SIZES, images, icons } from '../constants';
import {ValueComponent} from '../components';

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sensor_data: {},
			is_loading: true
		}
	} 

	componentDidMount() {
		const db = getDatabase();
		const reference = ref(db, 'espData/espData/espSensorData');
		onValue(reference, (snapshot) => {
			const data = snapshot.val();
			let obj = {...this.state};
			obj.sensor_data = {...data};
			obj.is_loading = false;
			this.setState(obj);
		})
	}

	render () {
	  
	  const { sensor_data, is_loading } = this.state;
	  //console.log(sensor_data.espInformation)
	  
    const { espConnectStatus, 
          espInformation,
          sensorData,
          sensorStatus } = sensor_data;
	  
	  const renderHeader = () => {
	    let arrContent = [];
	    
	    for (let p in sensorStatus) {
	      if (sensorStatus[p] === 1) {
	        arrContent.push(p);
	      }
	    }
	    
	    return (
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row'
          }}
        >
          <TouchableOpacity
            style={{
            flexDirection: 'row',
            alignItems: 'center'
            }}
            onPress={() => {this.props.navigation.navigate('Information', {
              data: espInformation
            })}}
          >
          <Text 
            style={{...FONTS.h3, color: '#fff'}}>ESP: {espConnectStatus ? 'Connected' : 'Disconnected'}</Text>
          <Image
            source={icons.right_arrow}
            resizeMode="contain"
            style={{
              width: 13,
              height: 13,
              tintColor: '#ffffff80',
              marginLeft: SIZES.base
            }}
          />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {this.props.navigation.navigate('Notification', {
              data: arrContent
            })}}
          >
          <Image 
            source={icons.bell}
            resizeMode='contain'
            style={{
              height: 30,
              width: 30,
              tintColor: arrContent.length === 0 ? COLORS.white : 'red'
            }}
          />
          </TouchableOpacity>
        </View>
	      );
	  }
	  
	  const renderDataSensor = () => {
	    const { humidityInDoorData,
	            humidityOutDoorData,
	            temparetureInDoorData,
	            temparetureOutDoorData,
	            lightData,
	            mq135Data } = sensorData;
	    
	    return (
	        <View style={{marginTop: SIZES.base}}>
            <Text style={{color: 'white', ...FONTS.h1}}>Sensor</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <ValueComponent 
                index={0}
                name="Temperature"
                value={temparetureInDoorData.data}
                icon={icons.temperature}
                unit="°C"
                time={temparetureInDoorData.time}
              />
              <ValueComponent
                index={1}
                name="Humidity"
                value={humidityInDoorData.data}
                icon={icons.humidity}
                unit="%"
                time={humidityInDoorData.time}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: SIZES.base, justifyContent: 'space-between'}}>
              <ValueComponent 
                index={0}
                name="Temperature"
                value={temparetureOutDoorData.data}
                icon={icons.temperature}
                unit="°C"
                time={temparetureOutDoorData.time}
              />
              <ValueComponent
                index={1}
                name="Humidity"
                value={humidityOutDoorData.data}
                icon={icons.humidity}
                unit="%"
                time={humidityOutDoorData.time}
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: SIZES.base}}>
                <ValueComponent 
                  index={0}
                  name="light"
                  value={lightData.data}
                  icon={icons.cloudy}
                  unit="L"
                  time={lightData.time}
                />
                 <ValueComponent 
                  index={1}
                  name="Air quality"
                  value={mq135Data.data}
                  icon={icons.cloudy}
                  unit=""
                  time={mq135Data.time}
                />
            </View>
          </View>
	      );
	  }
	  
	  const renderTitle = () => {
	    return (
	        <View>
	          <Text>error</Text>
	        </View>
	      );
	  }
	  
		return (
			<View style={{flex: 1}}>
				<ImageBackground
					source={images.image1} 
					resizeMode="cover"
					style={{
						flex: 1,
						paddingTop: SIZES.padding * 2,
						paddingHorizontal: SIZES.padding
					}}
				>
			  <ScrollView>
			    { is_loading === false ? renderHeader() : renderTitle()}
			    { is_loading === false ? renderDataSensor() : renderTitle()}
				</ScrollView>
				</ImageBackground>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	shadow: {
		shadowColor: '#000',
		shadowOffset: {
			width: 2,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 3
	}
})
