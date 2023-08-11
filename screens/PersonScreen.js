import { View, Text, Image, TouchableOpacity, Platform, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/movieList';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image185, image342, image500 } from '../api/moviedb';
import Loading from '../components/loading';
import { styles } from '../theme';

var {width, height} = Dimensions.get('window');
const PersonScreen = () => {
  const {params: item} = useRoute();
    const [isFavourite, toggleFavourite] = useState(false);
    const navigation = useNavigation();
    const [person, setPerson] = useState({});
    const [personMovies, setPersonMovies] = useState([]);
    const [loading, setLoading] = useState(false);
  return (
    <ScrollView 
        className="flex-1 bg-neutral-900" 
        contentContainerStyle={{paddingBottom: 20}}>
           <SafeAreaView className="z-20 w-full flex-row justify-between items-center px-4 ">
            <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={()=> navigation.goBack()}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)}>
                <HeartIcon size="35" color={isFavourite? theme.background: 'white'} />
            </TouchableOpacity>
         </SafeAreaView>
         <View>
            <View 
              className="flex-row justify-center"
              style={{
              shadowColor: 'gray',
              shadowRadius: 5,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 0.8,
              elevation: 5,
            }}>
               <View 
                className="items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2">
                    <Image 
                        source={require('../assets/images/castImage2.png')} 
                       // source={{uri: image342(person?.profile_path) || fallbackPersonImage}}
                        style={{height: height*0.60, width: width*0.80}}
                    />
                </View>
            </View>
            <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
                Keanu Reeves
                {/* {person?.name} */}
            </Text>
            <Text className="text-neutral-500 text-base text-center">
                {/* {person?.place_of_birth} */}
                Beirut, Lebanon
            </Text>
            </View>
            <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full ">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold ">Gender</Text>
              <Text className="text-neutral-300 text-sm">Male</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold ">Birthday</Text>
              <Text className="text-neutral-300 text-sm">1964-09-02</Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold ">known for</Text>
              <Text className="text-neutral-300 text-sm">Acting</Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white font-semibold ">Popularity</Text>
              <Text className="text-neutral-300 text-sm">84.23 %</Text>
            </View>
            </View>
         </View>
        </ScrollView>
  )
}

export default PersonScreen