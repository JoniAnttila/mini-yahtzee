import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 40,
    marginBottom: 15,
    backgroundColor: 'skyblue',
    flexDirection: 'row',
  },
  footer: {
    backgroundColor: 'skyblue',
    flexDirection: 'row'
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
  },
  gameboard: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10
  },
  gameinfo1: {
    backgroundColor: '#fff',
    fontSize: 18,
    marginTop: 10
  },
  gameinfo2: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 22,
    marginTop: 5
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    marginTop: 40,
    flexDirection: "row"
  },
  button: {
    marginVertical: 30,
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#73CED6",
    width: 150,
    borderRadius: 15,
    justifyContent: 'center',
  },
  buttonText: {
    color:"#2B2B52",
    fontSize: 20
  },
  numbers: {
    fontSize: 18,
    paddingLeft: 16,
    marginTop: 15,
  },
  numbersRow: {
    alignItems: 'flex-start',
    width: 290
  },
  numbersRow2: {
    alignItems: 'flex-end',
    height: 35
  },
});