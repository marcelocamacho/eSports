import React, { useEffect,useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import {SERVER_URL} from '@env';
import logoImg from '../../assets/logo-nlw-esports.png'
import { Background } from '../../components/Background';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { styles } from './styles';
 
export function Home() {
const [games, setGames] = useState<GameCardProps[]>([]);
const navigation = useNavigation();

function handleOpenGame({id, title, bannerUrl}:GameCardProps){
  navigation.navigate('game',{id,title,bannerUrl});
}

useEffect(()=>{
  fetch(`${SERVER_URL}/games`)
  .then(response => response.json())
  .then(data => setGames(data))
},[])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo}/>
        <Heading 
          title="Encontre o seu DUO" 
          subtitle="Selecione o game que deseja jogar..."/>

        <FlatList
          data={games}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) =>(
            <GameCard
            data={item}
            onPress={()=>handleOpenGame(item)}
            />
          )}
          contentContainerStyle={styles.contentList}
          />        
      </SafeAreaView>
    </Background>
  );
}