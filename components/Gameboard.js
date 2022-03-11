import { View, Text, Pressable } from 'react-native';
import React, { useState, useEffect, useCallback} from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';
import { Col, Row, Grid } from "react-native-easy-grid";

let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const NBR_OF_TURNS = 6;
const WINNING_POINTS = 63;

const options = [
    {
        label: 'numeric-1-circle',
        value: 'dice-1'
    },
    {
        label: 'numeric-2-circle',
        value: 'dice-2'
    },
    {
        label: 'numeric-3-circle',
        value: 'dice-3'
    },
    {
        label: 'numeric-4-circle',
        value: 'dice-4'
    },
    {
        label: 'numeric-5-circle',
        value: 'dice-5'
    },
    {
        label: 'numeric-6-circle',
        value: 'dice-6'
    }
  ]

const values = [
    {
        label: '1',
        value: 0
    },
    {
        label: '2',
        value: 0
    },
    {
        label: '3',
        value: 0
    },
    {
        label: '4',
        value: 0
    },
    {
        label: '5',
        value: 0
    },
    {
        label: '6',
        value: 0
    }
  ]

export default function Gameboard() {
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [points, setPoints] = useState(0);
    let BONUS = WINNING_POINTS - points;
    const [status, setStatus] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [selectedDices, setSelectedDices] = 
        useState(new Array(NBR_OF_DICES).fill(false));

    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <Pressable
                    key={"row" + i}
                    onPress={() => selectDice(i)}>
                <MaterialCommunityIcons
                    name={board[i]}
                    key={"row" + i}
                    size={50}
                    color={getDiceColor(i)}>
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
        }
        
        
    }, [nbrOfThrowsLeft]);

    function getDiceColor(i) {
        if (board.every((val, i, arr) => val === arr[0])) {
            return "orange";
        }
        else {
            return selectedDices[i] ? "black" : "steelblue";
        }
    }

    function selectDice(i) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }
  
    function throwDices() {
        /* if (nbrOfThrowsLeft === 0) {
            setStatus('Select your points before next throw');
            return;
        } */
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if (!selectedDices[i]) {
                let randomNumber = Math.floor(Math.random() * 6 + 1);
                board[i] = 'dice-' + randomNumber;
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
    }

    function checkWinner() {
        if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
            setStatus('You won');
        }
        else if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft === 0) {
            setStatus('You won, game over');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }
        else if (nbrOfThrowsLeft === 0) {
            setStatus('Game over');
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        } 
        else {
            setStatus('Select and throw dices again');
        }
    }

    function calculatePoints(spotCount) {
        setIsDisabled(true);
        if (nbrOfThrowsLeft > 0) {
            setStatus('Throw 3 times before setting points');
            return;
        }
        let kerroin = 0;
        for (let i = 0; i < 6; i++) {
            if (board[i] == spotCount) {
                kerroin ++;
                console.log('kerroin', kerroin, i)

            }
        }

        if (spotCount == 'dice-1') {
            let spotValue = 1;
            setPoints(points + kerroin * spotValue);
            return;
        } else if (spotCount == 'dice-2') {
            let spotValue = 2;
            setPoints(points + kerroin * spotValue);
            return;
        } else if (spotCount == 'dice-3') {
            let spotValue = 3;
            setPoints(points + kerroin * spotValue);
            return;
        } else if (spotCount == 'dice-4') {
            let spotValue = 4;
            setPoints(points + kerroin * spotValue);
            return;
        } else if (spotCount == 'dice-5') {
            let spotValue = 5;
            setPoints(points + kerroin * spotValue);
            return;
        } else {
            let spotValue = 6;
            setPoints(points + kerroin * spotValue);
            return;
        }
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
                            <Text style={styles.numbers}>{item.value}</Text>
                        </Col>
                        ))
                    }
                </Row>
                
                <Row style={styles.numbersRow}>
                    {
                        options.map((item) => (
                        <Col>
                            <Pressable disabled={isDisabled} key={item.value} onPress={() => calculatePoints(item.value)}>
                                <MaterialCommunityIcons
                                    name={item.label}
                                    key={item.value}
                                    size={50}
                                    color={(isDisabled ? 'black' : 'steelblue')}>
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
