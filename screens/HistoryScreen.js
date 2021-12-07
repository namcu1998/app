import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { FONTS, COLORS, SIZES, images, icons, lottiefiles } from '../constants';
import { getDatabase, ref, off, onValue } from '../Firebase';
import LottieView from 'lottie-react-native';

const db = getDatabase();
const reference = ref(db, 'historyData');

export default class HistoryScreen extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			history_data: []
		};
		this._isMounted = false;
	} 

	componentDidMount() {
	  this._isMounted = true;
		onValue(reference, (snapshot) => {
  		const data = snapshot.val();
  		let obj = {...this.state};
  		obj.history_data = [...data];
  		obj.history_data.length = 10;
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
	
  render() {
    const { is_loading, history_data } = this.state;
    
    const renderHistory = () => {
      const renderItem = ({item, index}) => {
        return (
          <View
            style={{
              width: '100%',
              justifyContent: 'space-between',
              flexDirection: 'column',
              marginTop: index === 0 ? 0 : 5,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: SIZES.base
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}> 
              <Text style={{color: COLORS.black, ...FONTS.h2}}>{item.time}</Text>
            </View>
            <ScrollView
              vertical={false}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                marginTop: SIZES.base
              }}
            >
              {
                item.sensorData.map((item, index) => {
                  return (
                    <View key={item.id} style={{flexDirection: 'row',marginLeft: index===0?0:10, justifyContent: 'flex-start', alignItems: 'center'}}>
                      <Text style={{color: '#000000', ...FONTS.h3}}>{item.name.split('')[0]}: </Text>
                      <Text style={{color: '#000000', ...FONTS.h3}}>{item.value}{item.unit}</Text>
                    </View>
                  );
                })
              }
            </ScrollView>
            <ScrollView
              vertical={false}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                marginTop: SIZES.base
              }}
            >
              {
                item.deviceData.map((item, index) => {
                  return (
                    <View key={item.id} style={{flexDirection: 'row', marginHorizontal: index===0?0:10, justifyContent: 'flex-start', alignItems: 'center'}}>
                      <Text style={{color: '#000000', ...FONTS.h3}}>{item.name}: </Text>
                      <Text style={{color: '#000000', ...FONTS.h3}}>{item.isActived ? 'ON' : 'OFF'}</Text>
                    </View>
                  );
                })
              }
            </ScrollView>
          </View>
          );
      }
      return (
        <View 
          style={{
            paddingTop: SIZES.padding * 2, 
            paddingBottom: 60,
            paddingHorizontal: SIZES.base,
            backgroundColor: '#292929',
          }}
        >
          <FlatList
            data={this.state.history_data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `${index}`}
          />
        </View>
        );
    }
    const renderLoadingImage = () => {
      return (
        <LottieView
            source={lottiefiles.loading_animation}
            autoPlay
            loop
          />
        );
    }
    //console.log(this.state)
    return is_loading === false ? renderHistory() : renderLoadingImage();
  }
}