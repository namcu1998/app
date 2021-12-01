import React from 'react';
import { Text, View, ScrollView, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getDatabase, ref, off, onValue } from '../Firebase';
import { FONTS, COLORS, SIZES, images, icons, lottiefiles } from '../constants';
import { ValueComponent, LoadingAnimation, SwitchToggle } from '../components';
import LottieView from 'lottie-react-native';
import io from 'socket.io-client';

const db = getDatabase();
const reference = ref(db, 'espData/espData/espSensorData');
const socket = io('https://rauthuycanh.herokuapp.com/webapp');

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sensor_data: {},
			device_data:{},
			is_loading_sensor: true,
			is_loading_device: true,
			isClick: false
		};
		this._isMounted = false;
	} 

	componentDidMount() {
	  this._isMounted = true;
		onValue(reference, (snapshot) => {
			const data = snapshot.val();
			let obj = {...this.state};
			obj.sensor_data = {...data};
			obj.is_loading_sensor = false;
			this._isMounted && this.setState(obj);
		})
		
		onValue(ref(db, 'clientData/statusDevice'), (snapshot) => {
			const data = snapshot.val();
			let obj = {...this.state};
			obj.device_data = {...data};
			obj.is_loading_device = false;
			this._isMounted && this.setState(obj);
		})
		
		const unsubscribe = this.props.navigation.addListener('focus', () => {
      this._isMounted = true;
    });
	}
	
	componentWillUnmount() {
	  this._isMounted = false;
	}
	
	handleEventClick(key, value) {
    console.log([key, value===1?0:1])
	  socket.emit('activeDevice', [key, value===1?0:1])
	}

	render () {
	  const { sensor_data, is_loading_sensor, device_data, is_loading_device } = this.state;
	  
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
          { arrContent.length !== 0 &&
            <View 
              style={{
                position: 'absolute',
                top: 0,
                right: 2,
                height: 15,
                width: 15,
                borderRadius: 7.5,
                borderWidth: 0,
                backgroundColor: 'white',
                zIndex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text style={{lineHeight: 16}}>{arrContent.length}</Text>
            </View>
          }
          <Image 
            source={icons.bell}
            resizeMode='contain'
            style={{
              height: 30,
              width: 30,
              tintColor: arrContent.length === 0 ? COLORS.white : 'white'
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
	        <View style={{marginTop: SIZES.base, zIndex: 1}}>
            <Text style={{color: 'white', ...FONTS.h1}}>Sensor</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <ValueComponent 
                index={0}
                name="Temperature"
                value={temparetureInDoorData.data}
                icon={icons.temperature}
                valueState={temparetureInDoorData.isValueUp}
                unit="°C"
                time={temparetureInDoorData.time}
                surplusValue={temparetureInDoorData.surplusValue}
              />
              <ValueComponent
                index={1}
                name="Humidity"
                value={humidityInDoorData.data}
                icon={icons.humidity}
                valueState={humidityInDoorData.isValueUp}
                unit="%"
                time={humidityInDoorData.time}
                surplusValue={humidityInDoorData.surplusValue}
              />
            </View>
            <View style={{flexDirection: 'row', marginTop: SIZES.base, justifyContent: 'space-between'}}>
              <ValueComponent 
                index={0}
                name="Temperature"
                value={temparetureOutDoorData.data}
                icon={icons.temperature}
                valueState={temparetureOutDoorData.isValueUp}
                unit="°C"
                time={temparetureOutDoorData.time}
                surplusValue={temparetureOutDoorData.surplusValue}
              />
              <ValueComponent
                index={1}
                name="Humidity"
                value={humidityOutDoorData.data}
                icon={icons.humidity}
                valueState={humidityOutDoorData.isValueUp}
                unit="%"
                time={humidityOutDoorData.time}
                surplusValue={humidityOutDoorData.surplusValue}
              />
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: SIZES.base}}>
                <ValueComponent 
                  index={0}
                  name="light"
                  value={lightData.data}
                  icon={icons.cloudy}
                  valueState={lightData.isValueUp}
                  unit="L"
                  time={lightData.time}
                  surplusValue={lightData.surplusValue}
                />
                 <ValueComponent 
                  index={1}
                  name="Air quality"
                  value={mq135Data.data}
                  icon={icons.cloudy}
                  valueState={mq135Data.isValueUp}
                  unit="PPM"
                  time={mq135Data.time}
                  surplusValue={mq135Data.surplusValue}
                />
            </View>
          </View>
	      );
	  }
	  
	  const renderSwitchTable = () => {
	    return (
	      <View style={{marginTop: SIZES.padding}}>
	        <Text style={{color: COLORS.white, ...FONTS.h1}}>Control</Text>
	        <View
            style={{
              backgroundColor: '#ffffff50',
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding
            }}
          >
          {
	          Object.entries(device_data).map(item => {
	            return (
  	          <View
                key={item[0].toString()}
  	            style={{
  	              flexDirection: 'row', 
  	              justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: SIZES.base
                }}
              >
  	            <Text style={{color: COLORS.white, ...FONTS.h3}}>{item[0]}</Text>
  	            <SwitchToggle 
  	              isActive={item[1]===1?true:false}
  	              onPress={() => this.handleEventClick(item[0], item[1])}
	              />
  	          </View>
  	          );
	          })
          }
	        </View>
        </View>
	      );
	  }
	  
	  const renderTitle = () => {
	    return (
	        <LottieView
	            source={lottiefiles.loading_animation}
	            autoPlay
              loop
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 500,
                height: 500
              }}
            />
	      );
	  }
	  
	  const renderMain = () => {
	    return (
	      <View style={{width: '100%'}}>
	        {renderSwitchTable()}
	        {renderDataSensor()}
        </View>
	      )
	  }
	  
	  //console.log('iclick', this.state.isClick)
		return (
			<View style={{flex: 1}}>
				<ImageBackground
					source={images.image1} 
					resizeMode="cover"
					blurRadius={is_loading_sensor === true ? 10 : 20}
					style={{
						flex: 1,
						paddingTop: SIZES.padding * 2,
				    paddingHorizontal: SIZES.padding,
				    paddingBottom: SIZES.padding * 2.5,
						zIndex: -2
					}}
				>
		        {renderHeader()}
    		     <ScrollView
             showsVerticalScrollIndicator={false}
              style={{
                  width: '100%'
              }}
            >
  			    {is_loading_sensor ? renderTitle() : renderMain()}
  			    </ScrollView>
  				  <LoadingAnimation
  				    image={images.image_transparent}
  				    x='90%'
  				    y='112%'
  				    size={100}
  				    delay={500}
  			    />
  				  <LoadingAnimation
  				    image={images.image_transparent1}
  				    x='90%'
  				    y='20%'
  				    size={100}
  				    delay={1000}
  			    />
				</ImageBackground>
			</View>
		);
	}
}
