import React, {RefObject} from 'react';
import {Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {styles} from '../styles/style';

interface PlayerStatusProps {
  iconRef: RefObject<string>;
  status: string;
}

const PlayerStatus: React.FC<PlayerStatusProps> = ({iconRef, status}) => {
  return (
    <View style={styles.playerStatus}>
      <View style={styles.playerStatusLeft}>
        <FontAwesome
          name={iconRef.current}
          size={50}
          color={iconRef.current === 'stopwatch' ? 'white' : '#ce8c02'}
        />
      </View>
      <View style={styles.playerStatusRight}>
        <Text style={{fontSize: 13, fontWeight: 'bold', color: '#f7f6f6'}}>
          STATUS
        </Text>
        <Text style={styles.statusMainText}>{status}</Text>
      </View>
    </View>
  );
};

export default PlayerStatus;
