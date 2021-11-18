import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { FONTS, COLORS, SIZES, images, icons } from '../constants';

export default class ChartComponent extends React.Component {
  render() {
    const { chartName, labels, data, chartStyle } = this.props;
    
    const chartConfig = {
          backgroundColor: "#292929",
          backgroundGradientFrom: "#292929",
          backgroundGradientTo: "#292929",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }
        
    const render_line_chart = () => {
      return (
          <View>
          <Text style={{color: COLORS.white, ...FONTS.h1}}> {chartName} </Text>
          <ScrollView>
            <LineChart
              data={{
                labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                {
                  data: [
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100,
                    Math.random() * 100
                  ]
                }
              ]
              }}
              width={Dimensions.get("window").width} // from react-native
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={chartConfig}
              bezier
              style={{
                marginTop: 8,
                borderRadius: 16
              }}
            />
          </ScrollView>
        </View>
        );
    }
    
    const render_bar_chart = () => {
      return (
        <View>
            <Text style={{color: COLORS.white, ...FONTS.h1}}> {chartName} </Text>
            <ScrollView>
              <BarChart
                data={{
                  labels: ["January", "February", "March", "April", "May", "June"],
                  datasets: [
                  {
                    data: [
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100,
                      Math.random() * 100
                    ]
                  }
                ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfig}
                bezier
                style={{
                  marginTop: 8,
                  borderRadius: 16
                }}
              />
            </ScrollView>
          </View>
        );
    }
    
    return chartStyle === 'line' ? render_line_chart() : render_bar_chart();
  }
}