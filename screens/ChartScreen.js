import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { FONTS, COLORS, SIZES, images, icons, lottiefiles } from "../constants";
import { ChartComponent } from "../components";
import { getDatabase, ref, set, onValue } from "../Firebase";
import LottieView from "lottie-react-native";
import { ButtonGroup } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const db = getDatabase();
const reference = ref(db, "chartData");

export default class ChartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selectedIndex: 0,
    };
    this._isMounted = false;
    this.updateIndex = this.updateIndex.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;
    onValue(reference, (snapshot) => {
      const data = snapshot.val();
      let obj = { ...this.state };
      obj.data = [...data];
      obj.is_loading = false;
      this._isMounted && this.setState(obj);
    });

    const unsubscribe = this.props.navigation.addListener("focus", () => {
      this._isMounted = true;
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async updateIndex(selectedIndex) {
    this.setState({
      ...this.state,
      selectedIndex,
    });
  }

  render() {
    const { data, is_loading, selectedIndex } = this.state;
    //console.log(this.state)

    const renderChart = () => {
      return (
        <View
          style={{
            backgroundColor: "#292929",
            paddingTop: SIZES.padding * 2,
            paddingBottom: SIZES.padding * 3,
          }}
        >
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={["Line", "Bar"]}
            containerStyle={{ height: 20 }}
          />
          <ScrollView ScrollEnable={true}>
            {data.map((item) => {
              const { name, data1, data2, labels, unit } = item;
              return (
                <ChartComponent
                  key={name}
                  chartName={name}
                  chartStyle={selectedIndex === 1 ? "bar" : "line"}
                  data1={data1}
                  data2={data2}
                  labels={labels}
                  unit={unit}
                />
              );
            })}
          </ScrollView>
        </View>
      );
    };

    const renderLoading = () => {
      return (
        <LottieView
          source={lottiefiles.loading_animation}
          autoPlay
          loop
          style={{}}
        />
      );
    };

    return is_loading === false ? renderChart() : renderLoading();
  }
}
