import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native'
import {Entypo} from '@expo/vector-icons'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import {SERVER_URL} from '@env';
import {useNavigation} from '@react-navigation/native';

import logoImg from '../../assets/logo-nlw-esports.png';
import { styles } from './styles';
import { GameParams } from '../../@types/navigation';
import { THEME } from '../../theme';
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';

export function Game() {
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');

  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  function handleGoBack(){
    navigation.goBack();
  }
  async function getDiscordUser(adsId: string){
    fetch(`${SERVER_URL}/ads/${adsId}/discord`)
    .then(response => response.json())
    .then(data => setDiscordDuoSelected(data.discord))
  }
  useEffect(()=>{
    fetch(`${SERVER_URL}/games/${game.id}/ads`)
    .then(response => response.json())
    .then(data => setDuos(data))
  },[])

  return (
   <Background>
     <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Entypo name="chevron-thin-left" color={THEME.COLORS.CAPTION_300} size={20}/>
        </TouchableOpacity>
          <Image source={logoImg} style={styles.logo} resizeMode="cover"/>
          <View style={styles.right}/>
      </View>
      <Image source={{uri: game.bannerUrl}} style={styles.cover} resizeMode="cover"/>
      <Heading title={game.title} subtitle="Conecte-se e comece a jogar!"/>
      
      <FlatList 
        data={duos} 
        keyExtractor={item => item.id} 
        renderItem={({item})=>(
          <DuoCard data={item} onConnect={()=>getDiscordUser(item.id)}/>
        )}
        horizontal
        style={styles.containerList}
        contentContainerStyle={[ duos.length > 0 ? styles.contentList : styles.emptyListContent ]}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={()=>(
          <Text style={styles.emptyListText}>Não há anúncios publicados para este jogo ainda.</Text>
        )}
      />
      <DuoMatch 
        visible={discordDuoSelected.length > 0 ? true : false} 
        discord={discordDuoSelected} 
        onClose={()=>setDiscordDuoSelected('')}
      />
    </SafeAreaView>
   </Background>
  );
}
