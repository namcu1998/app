import React from "react";
import {
  Text,
  View,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { getDatabase, ref, onValue } from "../Firebase";
import { FONTS, COLORS, SIZES, images, icons, lottiefiles } from "../constants";
import {
  ValueComponent,
  LoadingAnimation,
  SwitchToggle,
  GaugeComponent,
} from "../components";
import LottieView from "lottie-react-native";
import io from "socket.io-client";
import Fire from "../services/Devices.service";

const socket = io("https://rauthuycanh.herokuapp.com/webapp");

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensor_data: {},
      device_data: [],
      is_loading_sensor: true,
      is_loading_device: true,
      isClick: false,
    };
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    this.db = getDatabase();

    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      this._isMounted = true;
    });
    this.getDataFromDatabase();
  }

  componentWillUnmount() {
    this._isMounted = false;
    this.unsubscribe();
  }

  handleEventClick(key, value) {
    console.log(key, value);
    socket.emit("activeDevice", {
      id: key,
      state: !value,
    });
  }

  getDataFromDatabase() {
    onValue(ref(this.db, "espData/espData/espSensorData"), (snapshot) => {
      const data = snapshot.val();
      let obj = { ...this.state };
      obj.sensor_data = { ...data };
      obj.is_loading_sensor = false;
      this._isMounted && this.setState(obj);
    });

    onValue(ref(this.db, "clientData/statusDevice"), (snapshot) => {
      const data = snapshot.val();
      let obj = { ...this.state };
      obj.device_data = [...data];
      obj.is_loading_device = false;
      this._isMounted && this.setState(obj);
    });
  }

  render() {
    const { sensor_data, is_loading_sensor, device_data, is_loading_device } =
      this.state;

    const { espConnectStatus, espInformation, sensorData, sensorStatus } =
      sensor_data;

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
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {
              this.props.navigation.navigate("Information", {
                data: espInformation,
              });
            }}
          >
            <Text style={{ ...FONTS.h3, color: "#fff" }}>
              ESP: {espConnectStatus ? "Connected" : "Disconnected"}
            </Text>
            <Image
              source={icons.right_arrow}
              resizeMode="contain"
              style={{
                width: 13,
                height: 13,
                tintColor: "#ffffff80",
                marginLeft: SIZES.base,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Notification", {
                data: arrContent,
              });
            }}
          >
            {arrContent.length !== 0 && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  right: 2,
                  height: 15,
                  width: 15,
                  borderRadius: 7.5,
                  borderWidth: 0,
                  backgroundColor: "white",
                  zIndex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ lineHeight: 16 }}>{arrContent.length}</Text>
              </View>
            )}
            <Image
              source={icons.bell}
              resizeMode="contain"
              style={{
                height: 30,
                width: 30,
                tintColor: arrContent.length === 0 ? COLORS.white : "white",
              }}
            />
          </TouchableOpacity>
        </View>
      );
    };

    const renderDataSensor = () => {
      const renderItem = (item) => {
        return (
          <ValueComponent
            navigation={this.props.navigation}
            key={item.id}
            name={item.name}
            value={item.value}
            icon={icons[item.icon]}
            valueState={item.isValueUp}
            totalValue={item.totalValue}
            unit={item.unit}
            time={item.time}
            surplusValue={item.surplusValue}
          />
        );
      };

      return (
        <View style={{ marginTop: SIZES.base, zIndex: 1 }}>
          <Text style={{ color: "white", ...FONTS.h1 }}>Sensor</Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              width: "100%",
              justifyContent: "center",
            }}
          >
            {sensorData.map((item) => renderItem(item))}
          </View>
        </View>
      );
    };

    const renderSwitchTable = () => {
      return (
        <View style={{ marginTop: SIZES.padding }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h1 }}>Control</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Add");
              }}
            >
              <Image
                source={icons.add_icon}
                resizeMode="contain"
                style={{ width: 30, height: 30, tintColor: "#ffffff" }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#ffffff50",
              borderRadius: SIZES.radius,
              paddingHorizontal: SIZES.padding,
            }}
          >
            {device_data.map((item) => {
              return (
                <View
                  key={item.id.toString()}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: SIZES.base,
                  }}
                >
                  <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                    {item.name}
                  </Text>
                  <SwitchToggle
                    isActive={item.isActived}
                    onPress={() =>
                      this.handleEventClick(item.id, item.isActived)
                    }
                  />
                </View>
              );
            })}
          </View>
        </View>
      );
    };

    const renderTitle = () => {
      return (
        <LottieView
          source={lottiefiles.loading_animation}
          autoPlay
          loop
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 500,
            height: 500,
          }}
        />
      );
    };

    const renderMain = () => {
      return (
        <View style={{ width: "100%" }}>
          {renderSwitchTable()}
          {renderDataSensor()}
        </View>
      );
    };

    //console.log('iclick', this.state.isClick)
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={images.image1}
          resizeMode="cover"
          blurRadius={is_loading_sensor === true ? 10 : 0}
          style={{
            flex: 1,
            paddingTop: SIZES.padding * 2,
            paddingHorizontal: SIZES.padding,
            paddingBottom: SIZES.padding * 2.5,
            zIndex: -2,
          }}
        >
          {renderHeader()}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              width: "100%",
            }}
          >
            {is_loading_sensor ? renderTitle() : renderMain()}
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
