import React from 'react';
import {FlatList, Pressable, View} from 'react-native';
import Icons from './Icons';
import {styles} from '../styles/style';

interface GameBoardProps {
  gameState: string[];
  onChangeItem: (index: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({gameState, onChangeItem}) => {
  return (
    <View style={styles.playBoard}>
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        style={styles.grid}
        numColumns={3}
        data={gameState}
        renderItem={({item, index}) => (
          <Pressable
            key={index}
            style={styles.card}
            onPress={() => onChangeItem(index)}>
            <Icons name={item} color="null" />
          </Pressable>
        )}
      />
    </View>
  );
};

export default GameBoard;
