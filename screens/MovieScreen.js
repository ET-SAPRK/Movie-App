import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { ArrowLeftIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon} from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../api/moviedb';
import { styles, theme } from '../theme';
import Loading from '../components/loading';

var {width, height} = Dimensions.get('window');
const MovieScreen = () => {
  const {params: item} = useRoute();
  const navigation = useNavigation();
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([1,2,3,4,5])
  const [similarMovies, setSimilarMovies] = useState([1,2,3,4,5])
  const [isFavourite, toggleFavourite] = useState(false);
  const [loading, setLoading] = useState(false);

  let moviename="Ant-Man"
  return (
    <ScrollView 
    contentContainerStyle={{paddingBottom: 20}} 
        className="flex-1  bg-neutral-900">
         <View className="w-full">
         <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4 ">
            <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={()=> navigation.goBack()}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)}>
                <HeartIcon size="35" color={isFavourite? theme.background: 'white'} />
            </TouchableOpacity>
         </SafeAreaView>
         {
            loading? (
                <Loading />
            ) : (
                <View>  
                    <Image 
                        source={{uri: image500(movie.poster_path) || fallbackMoviePoster}}
                        style={{width, height: height*0.55}} 
                    />
                    <LinearGradient 
                        colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']} 
                        style={{width, height: height*0.40}}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className="absolute bottom-0"
                    />
                </View>
            )
         }        
        </View>
        <View style={{marginTop: -(height*0.09)}} className="space-y-3">
          <Text className="text-white text-center text-3xl font-bold tracking-widest">
              {moviename}
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
              Released • 2020 • 170 min
          </Text>
        <View className="flex-row justify-center mx-4 space-x-2">
          <Text className="text-neutral-400 font-semibold text-base text-center">
              Action •
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
              Trill •
          </Text>
          <Text className="text-neutral-400 font-semibold text-base text-center">
              Comedy
          </Text>
        </View>
        <Text className="text-neutral-400 mx-4 tracking-wide">
        Hank Pym (Michael Douglas) recruits the talents of Scott Lang (Paul Rudd), a master thief just released from prison. Lang becomes Ant-Man, trained by Pym and armed with a suit that allows him to shrink in size, possess superhuman strength and control an army of ants.
        </Text>
        </View>
        <Cast cast={cast} navigation={navigation} />
        <MovieList title={'Similar Movies'} hideSeeAll={true} data={similarMovies} />
    </ScrollView>
  )
}

export default MovieScreen