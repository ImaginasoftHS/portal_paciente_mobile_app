import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, Button, Dimensions } from 'react-native';
import MapView, { Marker, Callout,PROVIDER_GOOGLE, Region  } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from './styles';
export function ClinicMap(){
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [markers, setMarkers] = useState<any[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState<any>(null);
    const [region, setRegion] = useState<Region | null>(null);
    const [heading, setHeading] = useState<number | null>(null);


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);

      // Atualiza a direção (heading) do dispositivo
      Location.watchHeadingAsync((headingData) => {
        //console.log(headingData)
        setHeading(headingData.trueHeading);
      });
    
      // Monitora a posição e a direção do dispositivo
      Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
        distanceInterval: 1,
      }, (loc) => {
        setLocation(loc);
      });
      // Adiciona alguns pinos próximos à localização atual (exemplo)
      const exampleMarkers = [
        {
          latitude: loc.coords.latitude + 0.001,
          longitude: loc.coords.longitude + 0.001,
          title: "Pino 1",
          description: "Descrição 1"
        },
        {
          latitude: loc.coords.latitude - 0.001,
          longitude: loc.coords.longitude - 0.001,
          title: "Pino 2",
          description: "Descrição 2"
        }
      ];

      setMarkers(exampleMarkers);
    })();
  }, []);

  const handleMarkerPress = (marker: any) => {
    setSelectedMarker(marker);
    setModalVisible(true);
  };

  if (errorMsg) {
    return <View><Text>{errorMsg}</Text></View>;
  }

  if (!location) {
    return <View><Text>Obtendo localização...</Text></View>;
  }
  const handleRegionChangeComplete = (region: Region) => {
    setRegion(region);
    //console.log('Região visível:', region);
  };

  return (
    
    <View style={styles.container}>
        <Text>Coordenadas: {location.coords.altitude} | {location.coords.longitude}</Text> 
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        onRegionChangeComplete={handleRegionChangeComplete}
        showsUserLocation={true}

        followsUserLocation={true}
        showsMyLocationButton={true}
        userInterfaceStyle="light" // Altere conforme necessário
        userLocationPriority="high"
        userLocationUpdateInterval={500} // Intervalo de atualização
        userLocationFastestInterval={500} // Intervalo mais rápido de atualização
        showsCompass={true} // Mostra a bússola no mapa
        
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {markers.map((marker, index) => (
          <Marker

          key={index}
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          title={marker.title}
          description={marker.description}
          >
            <Callout onPress={() => handleMarkerPress(marker)}>
              <View>
                <Text>{marker.title}</Text>
                <Text>{marker.description}</Text>
              </View>
            </Callout>
            </Marker>
        ))}
        
        
        
      </MapView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Detalhes do Pino</Text>
          {selectedMarker && (
            <>
              <Text>{selectedMarker.title}</Text>
              <Text>{selectedMarker.description}</Text>
            </>
          )}
          <Button
            title="Fechar"
            onPress={() => setModalVisible(!modalVisible)}
          />
        </View>
      </Modal>
    </View>
  );
}