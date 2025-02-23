import React, {useRef, useState} from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';

import {styles} from './styles/style';
import FooterButtons from './components/FooterButtons';
import GameBoard from './components/GameBoard';
import PlayerStatus from './components/PlayerStatus';
import PlayerChooser from './components/PlayerChooser';

const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [vsPlayer, setVsPlayer] = useState(false);
  const [isCross, setIsCross] = useState(true);
  const [status, setStatus] = useState(`Player${vsPlayer ? ' 1' : ''} Turn`);
  const [gameState, setGameState] = useState(new Array(9).fill('empty'));
  const iconRef = useRef('stopwatch');
  const isBotTurn = useRef(false);

  const handlePlayerTypeChange = (mode: boolean) => {
    if (
      !gameState.includes('cross') &&
      !gameState.includes('circle') &&
      mode != vsPlayer
    ) {
      const newVsPlayer = mode;
      setVsPlayer(newVsPlayer);
      setStatus(`Player${newVsPlayer ? ' 1' : ''} Turn`);
    }
  };

  const onChangeItem = (index: number) => {
    if (
      gameState[index] === 'empty' &&
      !checkWin(gameState) &&
      !isBotTurn.current
    ) {
      const newGameState = [...gameState];
      newGameState[index] = isCross ? 'cross' : 'circle';
      setGameState(newGameState);

      const winner = checkWin(newGameState);
      if (winner) {
        setStatus(winner === 'cross' ? 'Player 1 Wins!' : 'Player 2 Wins!');
        iconRef.current = 'trophy';
        return;
      } else if (checkDraw(newGameState)) {
        setStatus("It's a Draw!");
        iconRef.current = 'meh';
        return;
      }

      let newIsCross = !isCross;
      setIsCross(newIsCross);

      if (!vsPlayer && !newIsCross) {
        isBotTurn.current = true;
        setStatus('Bot Turn');
        setTimeout(() => makeBotMove([...newGameState]), 1000);
      } else {
        setStatus(newIsCross ? 'Player 2 Turn' : 'Player 1 Turn');
      }
    }
  };

  const checkDraw = (gameState: string[]) => {
    return gameState.every(cell => cell !== 'empty');
  };

  const checkWin = (gameState: string[]) => {
    for (const condition of winConditions) {
      const [a, b, c] = condition;
      if (
        gameState[a] !== 'empty' &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return gameState[a];
      }
    }
    return null;
  };

  const getBotMove = (gameState: string[]) => {
    const emptyIndices = gameState
      .map((cell, index) => (cell === 'empty' ? index : -1))
      .filter(index => index !== -1);

    if (emptyIndices.length === 0) return -1;

    if (Math.random() < 0.4) {
      return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    } else {
      for (const condition of winConditions) {
        const [a, b, c] = condition;
        const values = [gameState[a], gameState[b], gameState[c]];

        if (
          values.filter(v => v === 'circle').length === 2 &&
          values.includes('empty')
        ) {
          return condition[values.indexOf('empty')];
        }

        if (
          values.filter(v => v === 'cross').length === 2 &&
          values.includes('empty')
        ) {
          return condition[values.indexOf('empty')];
        }
      }
      if (gameState[4] === 'empty') return 4;

      const corners = [0, 2, 6, 8].filter(i => gameState[i] === 'empty');
      if (corners.length > 0) {
        return corners[Math.floor(Math.random() * corners.length)];
      }

      return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }
  };

  const makeBotMove = (newState: string[]) => {
    if (!vsPlayer && !checkWin(newState) && !checkDraw(newState)) {
      const botMoveIndex = getBotMove(newState);
      if (botMoveIndex !== -1) {
        const newGameState = [...newState];
        newGameState[botMoveIndex] = 'circle';
        setGameState(newGameState);
        isBotTurn.current = false;

        if (checkWin(newGameState)) {
          setStatus('Bot Wins!');
          iconRef.current = 'frown';
        } else if (checkDraw(newGameState)) {
          setStatus("It's a Draw!");
          iconRef.current = 'meh';
        } else {
          setIsCross(true);
          setStatus('Player Turn');
        }
      }
    }
  };

  const resetGame = () => {
    setGameState(new Array(9).fill('empty'));
    setIsCross(true);
    setStatus(`Player${vsPlayer ? ' 1' : ''} Turn`);
    iconRef.current = 'stopwatch';
  };

  const startNewGame = () => {
    resetGame();
    setVsPlayer(false);
  };

  return (
    <SafeAreaView>
      <StatusBar></StatusBar>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>tic tac toe</Text>
        </View>
        {/* <View style={styles.playerChooser}>
          <Pressable
            style={[styles.button, vsPlayer ? styles.buttonActive : {}]}
            onPress={handlePlayerTypeChange}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialIcons
                name="person"
                size={30}
                color={'#876fad'}></MaterialIcons>
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
            onPress={handlePlayerTypeChange}>
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
        </View> */}

        <PlayerChooser
          vsPlayer={vsPlayer}
          handlePlayerTypeChange={(mode: boolean) =>
            handlePlayerTypeChange(mode)
          }></PlayerChooser>

        {/* <View style={styles.playerStatus}>
          <View style={styles.playerStatusLeft}>
            <FontAwesome
              name={iconRef.current}
              size={50}
              color={
                iconRef.current === 'stopwatch' ? 'white' : '#ce8c02'
              }></FontAwesome>
          </View>
          <View style={styles.playerStatusRight}>
            <Text style={{fontSize: 13, fontWeight: 'bold', color: '#f7f6f6'}}>
              STATUS
            </Text>
            <Text style={styles.statusMainText}>{status}</Text>
          </View>
        </View> */}

        <PlayerStatus iconRef={iconRef} status={status}></PlayerStatus>

        {/* <View style={styles.playBoard}>
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
                <Icons name={item} color="null"></Icons>
              </Pressable>
            )}></FlatList>
        </View> */}

        <GameBoard
          gameState={gameState}
          onChangeItem={onChangeItem}></GameBoard>

        {/* <View style={styles.footer}>
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
        </View> */}
        <FooterButtons
          resetGame={resetGame}
          startNewGame={startNewGame}></FooterButtons>
      </View>
    </SafeAreaView>
  );
}

export default App;
