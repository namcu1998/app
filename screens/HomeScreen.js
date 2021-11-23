import React from 'react';
import { Text, View, ScrollView, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getDatabase, ref, off, onValue } from '../Firebase';
import { FONTS, COLORS, SIZES, images, icons, lottiefiles } from '../constants';
import { ValueComponent, LoadingAnimation } from '../components';
import LottieView from 'lottie-react-native';

const db = getDatabase();
const reference = ref(db, 'espData/espData/espSensorData');

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sensor_data: {},
			is_loading: true
		};
		this._isMounted = false;
	} 

	componentDidMount() {
	  this._isMounted = true;
		onValue(reference, (snapshot) => {
			const data = snapshot.val();
			let obj = {...this.state};
			obj.sensor_data = {...data};
			obj.is_loading = false;
			this._isMounted && this.setState(obj);
		})
		
		const unsubscribe = this.props.navigation.addListener('focus', () => {
      this._isMounted = true;
    });
	}
	
	componentWillUnmount() {
	  this._isMounted = false;
	}

	render () {
	  const { sensor_data, is_loading } = this.state;
	  
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
	        {is_loading === false ? renderMain() : renderTitle()}
	        {renderDataSensor()}
        </View>
	      )
	  }
	  
		return (
			<View style={{flex: 1}}>
				<ImageBackground
					source={images.image1} 
					resizeMode="cover"
					blurRadius={is_loading === true ? 10 : 20}
					style={{
						flex: 1,
						paddingTop: SIZES.padding * 2,
						paddingHorizontal: SIZES.padding,
						alignItems: 'center',
						zIndex: -2
					}}
				>
			    {renderHeader()}
			    {is_loading ? renderTitle() : renderDataSensor()}
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
