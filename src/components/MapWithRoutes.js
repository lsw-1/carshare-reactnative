import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet
} from "react-native";
import { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import { MapView, Location, Permissions } from "expo";

const MapWithRoutes = ({ routes, locationOfMap, onRegionChange }) => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      customMapStyle={mapStyle}
      style={styles.map}
      region={locationOfMap}
      onRegionChange={onRegionChange}
    >
      {routes &&
        routes.map(route => (
          <View key={route.id || Math.random()}>
            <Marker
              coordinate={{
                latitude: route.fromLatitude || 0,
                longitude: route.fromLongitude || 0
              }}
            />
            <Polyline
              strokeColor="#ffaaaa"
              strokeWidth={2}
              coordinates={[
                {
                  latitude: route.fromLatitude || 0,
                  longitude: route.fromLongitude || 0
                },
                {
                  latitude: route.toLatitude || 0,
                  longitude: route.toLongitude || 0
                }
              ]}
            />
            <Marker
              draggable
              coordinate={{
                latitude: route.toLatitude || 0,
                longitude: route.toLongitude || 0
              }}
            />
          </View>
        ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 }
});
export default MapWithRoutes;

const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#ccaabb"
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#746855"
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#242f3e"
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563"
      }
    ]
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#263c3f"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6b9a76"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#38414e"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#212a37"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9ca5b3"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#746855"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#1f2835"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#f3d19c"
      }
    ]
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#2f3948"
      }
    ]
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#d59563"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#17263c"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#515c6d"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#17263c"
      }
    ]
  }
];
