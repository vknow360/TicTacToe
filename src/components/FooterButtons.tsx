import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {styles} from '../styles/style';

interface FooterButtonsProps {
  resetGame: () => void;
  startNewGame: () => void;
}

const FooterButtons: React.FC<FooterButtonsProps> = ({
  resetGame,
  startNewGame,
}) => {
  return (
    <View style={styles.footer}>
      <Pressable
        style={[styles.footerButton, styles.resetButton]}
        onPress={resetGame}>
        <Text style={styles.footerButtonText}>Reset Game</Text>
      </Pressable>
      <Pressable
        style={[styles.footerButton, styles.startButton]}
        onPress={startNewGame}>
        <Text style={styles.footerButtonText}>Start New Game</Text>
      </Pressable>
    </View>
  );
};

export default FooterButtons;
