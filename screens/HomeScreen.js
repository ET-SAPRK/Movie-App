import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { StatusBar } from 'expo-status-bar';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { styles } from '../theme';

const HomeScreen = () => {
  const [trending, setTrending] = useState([1,2,3]);
  const [upcoming, setUpcoming] = useState([1,2,3]);
  const [topRated, setTopRated] = useState([1,2,3]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  useEffect(()=>{
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  },[]);

  const getTrendingMovies = async ()=>{
    const data = await fetchTrendingMovies();
    if(data && data.results) setTrending(data.results);
    setLoading(false)
  }
  const getUpcomingMovies = async ()=>{
    const data = await fetchUpcomingMovies();
    if(data && data.results) setUpcoming(data.results);
  }
  const getTopRatedMovies = async ()=>{
    const data = await fetchTopRatedMovies();
    if(data && data.results) setTopRated(data.results);
  }
  return (
    <View className='flex-1 bg-neutral-800'>
      <SafeAreaView className='-mb-2'>
        <StatusBar style='light' />
        <View className="flex-row justify-between items-center mx-4">
        <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
        <Text 
            className="text-white text-3xl font-bold">
              <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {
        loading ? (
          <Loading />
        ) : (
          <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{paddingBottom: 10}}>
        { trending.length>0 && <TrendingMovies data={trending} /> }
        { upcoming.length>0 && <MovieList title="Upcoming" data={upcoming} /> }
        { topRated.length>0 && <MovieList title="Top Rated" data={topRated} /> }
      </ScrollView>
        )
      }
    </View>
  )
}

export default HomeScreen