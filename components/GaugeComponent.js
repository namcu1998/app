import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import LoadingAnimation from './LoadingAnimation';
import { images, icons } from '../constants';
import { 
      VictoryPie, 
      VictoryAnimation, 
      VictoryLabel } from 'victory-native';

export default class GaugeComponent extends React.Component {
  
  render() {
    const WIDTH = 300;
    const HEIGHT = 300;
    const { value, totalValue, unit } = this.props;
    const data = [
                { x: 1, y: totalValue - value },
                { x: 2, y: value }
              ]
    return (
        <View style={{ width: WIDTH, height: HEIGHT }} >
        <LoadingAnimation
				    image={images.image_transparent2}
				    x='40%'
				    y='67%'
				    size={60}
				    delay={100}
        />
          <Svg width='100%' height='100%' >
            <VictoryPie 
              animate={{
                 duration: 2000
              }}    
              cornerRadius={15}
              standalone={false}
              startAngle={130}
              endAngle={-130}
              height={HEIGHT}
              width={WIDTH}
              padAngle={1}
              innerRadius={WIDTH / 2 - 30}
              data={data}
              labels={({ datum }) => null}
              style={{
                data: {
                  fill: ({datum}) => {
                    return datum.x===1?'blue':'yellow'
                  }
                }
              }}
            />
            <VictoryAnimation 
              duration={1000}
              data={{ data: data[1].y }}
            >
              {
                (props) => {
                  return (
                    <React.Fragment>
                      <VictoryLabel
                        textAnchor='middle'
                        verticalAnchor='middle'
                        style={{
                          fontSize: 30,
                          fill: 'black'
                        }}
                        //backgroundStyle={{ fill: "pink" }}
                        text={() => `${props.data}`}
                        x={WIDTH /2 }
                        y={WIDTH / 2 + 10}
                      />
                      <Line 
                        x1={WIDTH / 2 - 40}
                        x2={WIDTH / 2 + 40}
                        y1={WIDTH / 2 + 25}
                        y2={WIDTH / 2 + 25}
                        stroke='#00000080'
                        strokeWidth={1}
                        strokeWidth={1}
                      />
                      <VictoryLabel
                        textAnchor='middle'
                        verticalAnchor='middle'
                        style={{
                          fontSize: 30,
                          fill: props.data > 30 ? 'red' : 'blue'
                        }}
                        //backgroundStyle={{ fill: "pink" }}
                        text={totalValue}
                        x={WIDTH /2 }
                        y={WIDTH / 2 + 40}
                      />
                      
                    </React.Fragment>
                  );
                }
              }
            </VictoryAnimation>
          </Svg>
        </View>
      );
  }
}