import { StyleSheet, Platform, StatusBar } from "react-native";

const styles = StyleSheet.create({
  guessRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  guessSquare: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 20,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 3,
  },
  guessLetter: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  container: {
    backgroundColor: 'black',
    justifyContent: "space-between",
    flex: 1,
  },

  // keyboard
  keyboard: {
    flexDirection: "column" ,
    marginBottom: 20,
  },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  key: {
    backgroundColor: "white",
    padding: 11,
    margin: 2,
    borderRadius: 3,
  },
  keyLetter: {
    fontWeight: "800",
    fontSize: 15,
  },

  // Game complete
  continue: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
    alignItems: "center",
  },
  continueButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
    fontWeight: "800",
    fontSize: 20,
    marginHorizontal: 10,
  },
  nextPrev: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
  },

  // start menu
  menu: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  menuButtons: {
    backgroundColor: "black",
    padding: 15,
    margin: 10,
    borderRadius: 20,
    fontWeight: "800",
    fontSize: 30,
    width: 200,
    alignItems: "center",
  },

  //clues
  clues: {
    color: 'white',
    fontWeight: "800",
    fontSize: 40,
    justifyContent: "center",
    textAlign: 'center',
  },
  clueContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  //Start
  title: {
    flex: 1,
    color: 'white',
    fontWeight: "800",
    fontSize: 50,
    marginTop: '20%',
  },
  start: {
    backgroundColor: 'black',
    flex: 1, 
    alignItems: 'center', 
    paddingBottom: 250,
    justifyContent: 'center'
  },
  cluesStart: {
    color: 'white',
    fontWeight: "800",
    fontSize: 40,
  },
  
  //Score
  scoreContainer: {
    flex: 1, 
    borderRadius: 30,  
    height: 45,
    backgroundColor: 'black',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    borderWidth: 1,
  },
  score: {
    color: 'white',
    fontWeight: "800",
    fontSize: 30,
    justifyContent: "center",
    textAlign: 'center',
  },
  star: {
    color: 'white',
    fontWeight: "800",
    fontSize: 30,
    justifyContent: "center",
    textAlign: 'center',
  },
  backButton: {
    borderRadius: 30,  
    height: 45,
    backgroundColor: 'black',
    marginLeft: 5,
  },
  backSymbol: {
    color: 'white',
    fontWeight: "800",
    fontSize: 40,
    justifyContent: "center",
    textAlign: 'center',
  },
  questionSymbol: {
    color: 'white',
    fontWeight: "800",
    fontSize: 40,
    justifyContent: "center",
    textAlign: 'center',
    marginRight: 5,
  },
  forwardButton: {
    flex: 1, 
    borderTopWidth: 45, 
    borderLeftWidth: 45, 
    borderTopColor: 'white',
    borderColor: 'black',
    borderRadius: 5,  
    marginTop: 5,
  },
  background: {
    position: 'absolute',
    width: 1200,
    height: 1200,
    top: 0,
    opacity: 0.2,
    transform: [
      {
        translateX: 0,
      },
      {
        translateY: 0,
      },
    ],      
  }, 
})

export default styles;