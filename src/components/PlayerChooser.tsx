import React from 'react';
import {Pressable, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {styles} from '../styles/style';

interface PlayerChooserProps {
  vsPlayer: boolean;
  handlePlayerTypeChange: (mode: boolean) => void;
}

const PlayerChooser: React.FC<PlayerChooserProps> = ({
  vsPlayer,
  handlePlayerTypeChange,
}) => {
  return (
    <View style={styles.playerChooser}>
      <Pressable
        style={[styles.button, vsPlayer ? styles.buttonActive : {}]}
        onPress={() => handlePlayerTypeChange(true)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MaterialIcons name="person" size={30} color={'#876fad'} />
          <Text
            style={[
              styles.buttonText,
              vsPlayer ? styles.buttonTextActive : {},
            ]}>
            {' vs'}
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={[styles.button, !vsPlayer ? styles.buttonActive : {}]}
        onPress={() => handlePlayerTypeChange(false)}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <FontAwesome name="robot" size={20} color="#529a9e" />
          <Text
            style={[
              styles.buttonText,
              !vsPlayer ? styles.buttonTextActive : {},
            ]}>
            {' bot'}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default PlayerChooser;
