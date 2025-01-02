import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ProfileContext } from '../context/ProfilContex';
import round from 'lodash/round';

const ProfileScreen = () => {
    const { profilData, loading, error } = useContext(ProfileContext);
    const { name, image_url, followers_count, public_playlists } = profilData;

    const formatFollowers = count => {
        if (count >= 1000000) {
            return `${round(count / 1000000, 1)}M`;
        }
        if (count >= 1000) {
            return `${round(count / 1000, 1)}K`;
        }
        return count;
    };

    return (
        <LinearGradient colors={['#040306', '#131624']} style={{ flex: 1 }}>
            <ScrollView style={{ marginTop: 50 }}>
                <View style={{ padding: 15 }}>
                    <View style={styles.profileContainer}>
                        <Image source={{ uri: image_url }} style={styles.profilImage} />
                        <View>
                            <Text style={styles.profilName}>{name}</Text>
                            <Text style={styles.profilFollowers}>
                                {formatFollowers(followers_count)}
                            </Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.sectionTitle}>Your Playlist</Text>
                <View style={styles.playlistContainer}>
                    {public_playlists.map((playlist, index) => (
                        <View key={playlist.uri}>
                            <View
                                style={{
                                    marginVertical: 10,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: 10, // Görseller ve metin arasında boşluk
                                    flex: 1,
                                }}
                            >
                                <Image
                                    source={{ uri: 'https://picsum.photos/200/300' }}
                                    style={styles.playlistImage}
                                />
                                <View style={{ flex: 1 }}>
                                    <Text 
                                        style={styles.playlistName} 
                                        numberOfLines={2} // Yazıyı 2 satırda göstermek için
                                        ellipsizeMode="tail"
                                    >
                                        {playlist.name}
                                    </Text>
                                    <Text style={styles.playlistFollowers}>
                                        {formatFollowers(playlist.followers_count)}
                                    </Text>
                                </View>
                            </View>
                            {/* Separator */}
                            {index !== public_playlists.length - 1 && (
                                <View style={styles.separator} />
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    profilImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        resizeMode: 'cover',
    },
    profilName: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    profilFollowers: {
        color: 'gray',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sectionTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        marginHorizontal: 12,
    },
    playlistContainer: {
        padding: 10,
    },
    playlistImage: {
        width: 66,
        height: 60,
        borderRadius: 5,
    },
    playlistName: {
        color: 'white',
        fontSize: 14, // Daha küçük font boyutu
        flexShrink: 1, // Sığmayan yazıyı sıkıştırır
        lineHeight: 16, // Satırlar arasında boşluk
    },
    playlistFollowers: {
        color: 'white',
        marginTop: 7,
    },
    separator: {
        marginTop:5,
        height: 1, // Çizgi kalınlığı
        backgroundColor: 'gray', // Çizgi rengi
        marginHorizontal: 10, // Sağ-sol boşluk
    },
});
