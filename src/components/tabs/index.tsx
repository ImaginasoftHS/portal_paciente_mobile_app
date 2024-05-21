import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {HomeScreen} from '../../screens/Home';
import {ClinicMap} from '../../screens/ClinicMap';
import { BottomNavigation } from 'react-native-paper';
import theme from '../../theme';  // Importe o tema personalizado
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeRoute = () => <HomeScreen />;
const MapRoute = () => <ClinicMap />;

const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    map: MapRoute,
  });

const MainTabs = () => {

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'map', title: 'Map', icon: 'map' },
  ]);  



  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      renderIcon={({ route, color }) => (
        <Icon name={route.key} size={24} color={color} />
      )}
      barStyle={{ backgroundColor: theme.colors.primary }}
    />
    
  );
};

export default MainTabs;
