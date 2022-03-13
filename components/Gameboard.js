import { View, Text, Pressable } from 'react-native';
import React, { useState, useEffect, useCallback} from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';
import { Col, Row, Grid } from "react-native-easy-grid";

let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const WINNING_POINTS = 63;

const options = [
    {label: 'numeric-1-circle', value: 'dice-1'},
    {label: 'numeric-2-circle', value: 'dice-2'},
    {label: 'numeric-3-circle', value: 'dice-3'},
    {label: 'numeric-4-circle', value: 'dice-4'},
    {label: 'numeric-5-circle', value: 'dice-5'},
    {label: 'numeric-6-circle', value: 'dice-6'}
  ]

const values = [
    {id: 'dice-1', value: 0},
    {id: 'dice-2', value: 0},
    {id: 'dice-3', value: 0},
    {id: 'dice-4', value: 0},
    {id: 'dice-5', value: 0},
    {id: 'dice-6', value: 0}
  ]

export default function Gameboard() {
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [points, setPoints] = useState(0);
    let BONUS = WINNING_POINTS - points;
    const [status, setStatus] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [diceDisable, setDiceDisable] = useState(false);
    const [selectedDices, setSelectedDices] = 
        useState(new Array(NBR_OF_DICES).fill(false));
    const [selectedCount, setSelectedCount] = 
        useState(new Array(6).fill(false));
    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <Pressable
                    key={"row" + i}
                    disabled={diceDisable}
                    onPress={() => selectDice(i)}>
                <MaterialCommunityIcons
                    name={board[i]}
                    key={"row" + i}
                    size={50}
                    color={selectedDices[i] ? "black" : "steelblue"}>
                </MaterialCommunityIcons>
            </Pressable>
        )
    }

    useEffect(() => {
        checkWinner();
        if (nbrOfThrowsLeft === NBR_OF_THROWS) {
            setStatus('Throw dices');
        }
        if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS-1);
            setIsDisabled(false);
        }
        if (nbrOfThrowsLeft == 0) {
            setDiceDisable(true);
            setStatus('Select your points');
        } else {
            setDiceDisable(false);
        }
        
        
    }, [nbrOfThrowsLeft]);

    function selectDice(i) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }
  
    function throwDices() {
        if (status === 'Select your points' || status === 'Select your points before next throw') {
            setStatus('Select your points before next throw');
            return;
        }
        if (status === 'Game over. All points selected.') {
            for (let i = 1; i <= values.length; i++) {
                let valueI = 'dice-' + i;
                const index = values.findIndex(obj => {
                    return obj.id === valueI;
                });
                values[index].value = 0;
            }
            
            setPoints(0);
            setSelectedCount(new Array(6).fill(false));
        }

        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
    }

    function checkWinner() {
      if (nbrOfThrowsLeft === 0) {
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
      } 
      else {
          setStatus('Select and throw dices again');
      }
    }

    function calculatePoints(spotCount, i) {
        if (nbrOfThrowsLeft > 0) {
            setStatus('Throw 3 times before setting points');
            return;
        }
        if (selectedCount[i] == true){
            let alreadySelected = i + 1;
            setStatus('You have already selected points for ' + alreadySelected);
            return;
        }
        setIsDisabled(true);

        let end = 0;
        for (let i = 0; i < 6; i++) {
            if (selectedCount[i] == true) {
                end ++;
            }
        }
        if (end == 5) {
            setStatus('Game over. All points selected.');
            let end = 0;
        } else {
            setStatus('Points added. Throw dices');
        }
        
        let counts = [...selectedCount];
        counts[i] = selectedCount[i] ? false : true;
        setSelectedCount(counts);

        let kerroin = 0;
        for (let i = 0; i < 6; i++) {
            if (board[i] == spotCount) {
                kerroin ++;
            }
        }
        const index = values.findIndex(obj => {
            return obj.id === spotCount;
        });
        let spotValue = 0;
        if (spotCount == 'dice-1') {
            spotValue = 1;
        } else if (spotCount == 'dice-2') {
            spotValue = 2;
        } else if (spotCount == 'dice-3') {
            spotValue = 3;
        } else if (spotCount == 'dice-4') {
            spotValue = 4;
        } else if (spotCount == 'dice-5') {
            spotValue = 5;
        } else {
            spotValue = 6;
        }

        let result = kerroin * spotValue;
        setPoints(points + result);
        values[index].value = result;
    }
    return(
        <Grid style={styles.gameboard}>
            <View style={styles.gameboard}>
                <View style={styles.flex}>{row}</View>
                <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
                <Text style={styles.gameinfo}>{status}</Text>
                <Pressable
                    style={styles.button}
                    onPress={() => throwDices()}>
                    <Text style={styles.buttonText}>Throw dices</Text>
                </Pressable>
                <Text style={styles.gameinfo}>Total: {points}</Text>
                <Text style={styles.gameinfo}>
                    {(WINNING_POINTS > points ? 'You are ' + BONUS + ' points away from bonus' : 'You got the bonus!')}
                </Text>

                <Row style={styles.numbersRow}>
                    {
                        values.map((item) => (
                        <Col>
                            <Text key={item.id} style={styles.numbers}>{item.value}</Text>
                        </Col>
                        ))
                    }
                </Row>
                <Row>
                    {
                        options.map((item, index) => (
                        <Col>
                            <Pressable style={styles.numbersBtns} disabled={isDisabled} key={item.value} onPress={() => calculatePoints(item.value, index)}>
                                <MaterialCommunityIcons
                                    name={item.label}
                                    key={item.value}
                                    size={50}
                                    color={selectedCount[index] ? "black" : "steelblue"}>
                                </MaterialCommunityIcons>
                            </Pressable>
                        </Col>
                        ))
                    }
                </Row>
            </View>
        </Grid>
    )
}
