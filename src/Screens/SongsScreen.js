import {Image,FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View, ActivityIndicator,TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';

const SongsScreen = () => {
    const navigation = useNavigation();
    const progress = useProgress();

    const [searchText, setSearchText] = useState('Türkiye de popüler müzikler');
    const [searchedTracks, setSearchTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleSearch = async () => {
        const options = {
            method: 'GET',
            url: 'https://shazam.p.rapidapi.com/search',
            params: {
                term: searchText,
                locale: 'tr-TR',
                offset: '0',
                limit: '5'
            },
            headers: {
                'x-rapidapi-key': '756d0c1442msh153e7d65fc912a8p1d303ajsn3ab32182bfe9',
                'x-rapidapi-host': 'shazam.p.rapidapi.com'
            }
        };
        try {
            const response = await axios.request(options);
            setSearchTracks(response.data.tracks.hits);
            setLoading(false);
          } catch (error) {
            setError(error);
            setLoading(false);
        };
    };
      
      const setupPlayer = async () => {
        try {
            await TrackPlayer.setupPlayer();
            TrackPlayer.updateOptions({
                capabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE,
                    TrackPlayer.CAPABILITY_STOP,
                    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                    TrackPlayer.CAPABILITY_SEEK_TO,
                ],
            });
        } catch (error) {
            console.log('Error setting up player:', error);
        }
    };

    const handlePlay = async track => {
        const trackData = {
            id: track.track.key,
            url: track.track.hub.actions.find(action => action.type === 'uri').uri,
            title: track.track.title,
            artist: track.track.subtitle,
            artwork: track.track.images.coverart,
        };
    
        try {
            await TrackPlayer.reset();
            await TrackPlayer.add(trackData);
            await TrackPlayer.play();
            setSelectedTrack(track.track);
            setModalVisible(true);
            setIsPlaying(true);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleSearch();
        setupPlayer();
    }, []);

    const formatTime = seconds => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ' '}${secs}`;
  };

    const togglePlayback = async () => {
        if (isPlaying) {  
          await TrackPlayer.pause();
        } else {
          await TrackPlayer.play();
        }
        setIsPlaying(!isPlaying);
    };
    // müziği 10 sn geri aldk
    const seekBackward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position - 10);
  };
  const seekForward = async () => {
    const position = await TrackPlayer.getPosition();
    await TrackPlayer.seekTo(position + 10);
};
    

    return (
        <>
        <LinearGradient colors={['#4e2e3b', '#131624']} style={{ flex: 1 }}>
    <FlatList
        data={searchedTracks}
            keyExtractor={item => item.track.key}
            
        renderItem={({ item }) => (
            <Pressable onPress={() => handlePlay(item)}>
                <View style={styles.trackContainer}>
                    <Image
                        source={{ uri: item.track.images.coverart }}
                        style={styles.albumCover}
                    />
                    <View style={styles.trackInfo}>
                        <Text style={styles.trackName}>{item.track.title}</Text>
                        <Text style={styles.artistName}>{item.track.subtitle}</Text>
                    </View>
                    <Entypo name="controller-play" size={24} color="white" />
                </View>
            </Pressable>
        )}
        contentContainerStyle={{ paddingBottom: 20 }} // Alt boşluk ekliyoruz
        ListHeaderComponent={
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50 }}>
                    <Pressable onPress={() => navigation.goBack()} style={{ marginHorizontal: 10 }}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 10,
                            height: 45,
                            backgroundColor: '#758694',
                            borderRadius: 9,
                            padding: 8,
                            flex: 1,
                            margin: 20,
                        }}>
                        <AntDesign name="search1" size={24} color="white" />
                        <TextInput
                            placeholderTextColor={'white'}
                            placeholder="Find in search songs"
                            style={{
                                fontWeight: '500',
                                width: '85%',
                                color: 'white',
                                marginLeft: 10,
                                
                            }}
                            value={searchText}
                            onChangeText={setSearchText}
                            onSubmitEditing={handleSearch}
                        />
                    </View>
                </View>
                <View style={{ margin: 10 }}>
                    <Text style={{ margin: 10,fontSize: 18, color: 'white', fontWeight: 'bold' }}>Search Songs</Text>
                </View>
            </View>
        }
        ListEmptyComponent={
            loading ? (
                <ActivityIndicator size={'large'} color={'gray'} />
            ) : (
                <Text style={{ textAlign: 'center', color: 'white', marginTop: 20 }}>No results found</Text>
            )
        }
    />
</LinearGradient>

        
        <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}swipeDirection="down"
        onSwipeComplete={() => setModalVisible(false)}style={{margin: 0}}>
        <View
          style={{ backgroundColor: '#4e2e3b',width: '100%',height: '100%',paddingTop: 60,paddingHorizontal: 10,
          }}>
          <View
            style={{flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <AntDesign name="down" size={24} color="white" />
            </TouchableOpacity>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
              songs
            </Text>

            <Entypo name="dots-three-vertical" size={24} color="white" />
          </View>

          <View style={{padding: 10, marginTop: 20}}>
            <Image
              source={{uri: selectedTrack?.images.coverart}}
              style={{width: '100%', height: 330, borderRadius: 4}}
            />
            <View
              style={{flexDirection: 'row',justifyContent: 'space-between', marginTop: 20,
              }}>
              <View>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                  {' '}
                  {selectedTrack?.title}{' '}
                </Text>
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
                  {' '}
                  {selectedTrack?.subtitle}{' '}
                </Text>
              </View>

              <AntDesign name="heart" size={24} color="#1AD35E" />
            </View>

            <View style={{marginTop: 10}}>
              <View
                style={{width: '100%',marginTop: 10,height: 3,backgroundColor: 'gray',borderRadius: 5,
                }}>
                <View
                  style={[
                    styles.progressbar,
                    {
                      width: `${
                        (progress.position / progress.duration) * 100
                      }%`,
                    },
                  ]}
                />
                <View
                  style={{ position: 'absolute', top: -5, width: 10, height: 10, backgroundColor: 'white',borderRadius: 5,
                    left: `${(progress.position / progress.duration) * 100}%`,
                  }}
                />
              </View>

              <View
                style={{marginTop: 12,flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontSize: 15}}>
                  {' '}
                  {formatTime(progress.position)}{' '}
                </Text>
                <Text style={{color: 'white', fontSize: 15}}>
                  {' '}
                  {formatTime(progress.duration)}{' '}
                </Text>
              </View>

              <View
                style={{flexDirection: 'row',justifyContent: 'space-between',marginTop: 18,alignItems: 'center',
                }}>
                <Pressable onPress={seekBackward}>
                  <Entypo name="controller-fast-backward" size={30}color="white"/>
                </Pressable>

                <Pressable>
                  <Ionicons name="play-skip-back" size={30} color="white" />
                </Pressable>

                <Pressable onPress={togglePlayback}>
                  {isPlaying ? (
                    <AntDesign name="pausecircle" size={60} color="white" />
                  ) : (
                    <Entypo name="controller-play" size={60} color="white" />
                  )}
                </Pressable>

                <Pressable>
                  <Ionicons name="play-skip-forward" size={30} color="white" />
                </Pressable>

                <Pressable onPress={seekForward}>
                  <Entypo name="controller-fast-forward" size={30} color="white"/>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
      
  );
};
export default SongsScreen;

const styles = StyleSheet.create({
  progressbar: {
        height: '100%',
        backgroundColor: 'white',
      },
  trackContainer: {
    padding: '20',
    marginHorizontal: 20,
    marginVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    },
    albumCover: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    trackInfo: {
        flex: 1,
        marginLeft: 10,
    },
  trackName: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        marginHorizontal: 5,
        marginVertical: 5,
    },
  artistName: {
        fontSize: '14',
        color: '#ccc',
    },
    progressbar: {
        height: '100%',
        backgroundColor: 'white'
    },
});