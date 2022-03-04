import { View, Text, Pressable } from 'react-native';
import React, { useState, useEffect, useCallback} from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';
import { Col, Row, Grid } from "react-native-easy-grid";

let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 3;
const WINNING_POINTS = 23;

const options = [
    {
        label: 'numeric-1-circle',
        value: 1
    },
    {
        label: 'numeric-2-circle',
        value: 2
    },
    {
        label: 'numeric-3-circle',
        value: 3
    },
    {
        label: 'numeric-4-circle',
        value: 4
    },
    {
        label: 'numeric-5-circle',
        value: 5
    },
    {
        label: 'numeric-6-circle',
        value: 6
    }
  ]

const points = [
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
    const [status, setStatus] = useState('');
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

    function selectPoints(i) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }
  
    function throwDices() {
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
                <Text style={styles.gameinfo}>Total: {nbrOfThrowsLeft}</Text>
                <Text style={styles.gameinfo}>You are {nbrOfThrowsLeft} points away from bonus</Text>

                <Row style={styles.numbersRow}>
                    {
                        points.map((item) => (
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
                            <Pressable key={item.value} onPress={() => selectDice(item.value)}>
                                <MaterialCommunityIcons
                                    name={item.label}
                                    key={item.value}
                                    size={50}
                                    color={'steelblue'}>
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
