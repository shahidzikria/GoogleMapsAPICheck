import React, { Component } from 'react';
import { View, Text, StyleSheet } from "react-native";

// Permisions 
import { check, PERMISSIONS, RESULTS, request, openSettings } from 'react-native-permissions';

// MapView
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Test from "./Test"

export default class App extends Component {

  state = {
    havingPemission: false,

    mapType: "satellite",

    islongPress: false,
    longPress: {
      latitude: 0,
      longitude: 0,
    },
    region: {
      latitude: 28.2421,
      longitude: 70.1828,
    },

    markerLocation: {
      latitude: 28.2421,
      longitude: 70.1828,
    },

    currentLocation: {
      latitude: 28.2421,
      longitude: 70.1828,
    }
  }

  permissionCheck(permission) {
    check(permission)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            request(permission).then((result) => {
              if (result == "granted") {
                this.setState({ havingPemission: true })
              }
            })
            console.log('The permission has not been requested / is denied but requestable');
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            this.setState({ havingPemission: true })
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            openSettings();
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        // …
      });
  }

  componentDidMount() {
    // this.permissionCheck(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  }

  render() {
    return (
      <View
        style={{ flex: 1 }}
      >
        <Test />
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          userLocationCalloutEnabled={false}
          showsMyLocationButton={true}
          // onUserLocationChange={(location) => { JSON.stringify(location) }}
          initialRegion={{
            latitude: 28.2421,
            longitude: 70.1828,
            latitudeDelta: 1,
            longitudeDelta: 1
          }}

          onLongPress={(val) => {
            this.setState({
              longPress: {
                latitude: val.nativeEvent.coordinate.latitude, longitude: val.nativeEvent.coordinate.longitude
              },
              islongPress: true
            })
          }}
          region={{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,

            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          // showsUserLocation={true}
          userInterfaceStyle={"light"}
          //showsTraffic={true}
          showsCompass={true}
        >



          <GooglePlacesAutocomplete
            styles={{
              container: { flex: 0, width: "100%" },
              listView: { backgroundColor: "white" }
            }}
            GooglePlacesSearchQuery={{
              rankby: "distance"
            }}
            onFail={(val) => { console.log("search error ==> " + val) }}
            placeholder='Search'
            fetchDetails={true}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: 'AIzaSyCpeZ-7s39VErA82ND6giypDZNaQZ4ZWak',
              language: 'en',
            }}
          />

          {/* {
            this.state.islongPress ? (
              <Marker

                coordinate={{
                  latitude: this.state.longPress.latitude, longitude: this.state.longPress.longitude,

                  latitudeDelta: 1,
                  longitudeDelta: 1,
                }}
              />
            ) : null
          } */}


        </MapView>

      </View>
    )
  }
}

class MarkerComponent extends Component {
  render() {
    return (
      <Marker
        coordinate={{
          latitude: this.props.lat_lng.latitude, longitude: this.props.lat_lng.longitude,

          latitudeDelta: 1,
          longitudeDelta: 1,
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  map: {
    position: "absolute",
    top: 0, bottom: 0, right: 0, left: 0
  }
})



// this.state.havingPemission ? (
//   <View>
//     <Text>Good</Text>
//   </View>
// ) : (
//   <View>
//     {this.permissionCheck(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)}
//   </View>

// )