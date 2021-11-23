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
              borderBottomColor: '#b97eff', 
              borderBottomWidth: 1,
              paddingTop: index === 0 ? 0 : 5
            }}
          >
            <View 
              style={{
                
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            > 
              <View>
                <Text style={{color: COLORS.white, ...FONTS.h2}}>{item.thoigian.split(' ')[3]}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: COLORS.white, ...FONTS.h3}}>TI: {item.nhietdo}°C</Text>
                <Text style={{color: COLORS.white, ...FONTS.h3, marginLeft: SIZES.base}}>HI: {item.doam}°C</Text>
              </View>
            </View>
            <View 
              style={{
                flexDirection: 'row', 
                justifyContent: 'space-between',
                marginTop: SIZES.base
              }}
            >
              <Text style={{color: COLORS.white, ...FONTS.h3}}>TO: {item.nhietdo1}%</Text>
              <Text style={{color: COLORS.white, ...FONTS.h3}}>HO: {item.doam1}%</Text>
              <Text style={{color: COLORS.white, ...FONTS.h3}}>L: {item.anhsang}lux</Text>
            </View>
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