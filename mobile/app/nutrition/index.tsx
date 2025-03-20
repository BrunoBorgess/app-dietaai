import { View, Text, StyleSheet } from 'react-native';

import { useDataStore } from '../../store/data'

export default function Nutrition() {
  const user = useDataStore(state => state.user)
  console.log(user);


  return (
  <View>
    <Text>TESTE PAGE</Text>
  </View>
  );
}


const styles = StyleSheet.create({
    
})