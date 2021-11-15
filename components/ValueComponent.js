import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FONTS, COLORS, SIZES, images, icons } from '../constants';

export default class ValueComponent extends React.Component {
	render() {
		const { index, name, time, value, unit, icon } = this.props;
		return(
			<View
				    style={{
				      backgroundColor: '#ffffff30',
				      borderWidth: 2,
				      borderColor: '#ffffff50',
				      borderRadius: SIZES.radius,
				      width: 160,
				      paddingVertical: SIZES.padding,
				      paddingHorizontal: SIZES.padding,
				      marginLeft: index === 0 ? 0 : SIZES.base
				    }}
				  >
				    <View
				      style={{
				        flexDirection: 'row',
				        alignItems: 'center'
				      }}
				    >
				      <Image
				        source={icon}
				        resizeMode='contain'
				        style={{
				          height: 18,
				          width: 18,
				          tintColor: 'white'
				        }}
				      /> 
				      <View
				        style={{
				          marginLeft: SIZES.base
				        }}
				      >
				        <Text style={{...FONTS.h3, color: '#fff'}}>{name}</Text>
				        <Text style={{...FONTS.h4, color: '#fff'}}>{time.split(' ')[3]}</Text>
				      </View>
				    </View>
				    <View style={{}}>
				      <Text style={{...FONTS.h3, color: '#fff'}}>{value}{unit}</Text>
				    </View>
				  </View>
		);
	}
}

const Style = StyleSheet.create({
	container: {
		height: 150,
		width: 150,
		borderRadius: 20,
		backgroundColor: 'blue',
		opacity: 1,
		overflow: 'hidden'
	},
	header: {
		height: '30%',
		width: 150,
		backgroundColor: 'blue'
	},
	content: {
		height: '70%',
		width: 150,
		backgroundColor: 'yellow'
	},
	title: {
		fontSize: 10,
		fontWeight: 'bold'
	},
	text: {
		fontSize: 20,
		fontWeight: '200'
	}
})
