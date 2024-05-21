import * as React from 'react';
import {HomeScreen} from '../../screens/Home';
import {ClinicMap} from '../../screens/ClinicMap';
import {ApiCall as AC} from '../../screens/ApiCall'
import { BottomNavigation } from 'react-native-paper';
import theme from '../../theme';  // Importe o tema personalizado
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const HomeRoute = () => <HomeScreen />;
const MapRoute = () => <ClinicMap />;
const ApiCall = () => <AC />;

const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    map: MapRoute,
    data: ApiCall
  });

const MainTabs = () => {

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'map', title: 'Map', icon: 'map' },
    { key: 'data', title: 'Data', icon: 'cable-data' },

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
