import React from "react"
import { View, SafeAreaView, Text, TouchableOpacity, PanResponder } from "react-native"
import styles from './Style'
import words from './wordlist'
import useLevel from './storage/level'
import useTotal from "./storage/average"
import useSolved from "./storage/solved"
import useStage from "./storage/stage"
import useStaged from "./storage/staged"

// Block type
type BlockProps = {
  index: number,
  guess: string,
  done: boolean,
}

// Block function
const Block = ({ index, guess, done }: BlockProps) => {

  return (
    <View style={[styles.guessSquare, done ? {backgroundColor: 'green'} : {}]}>
      <Text style={styles.guessLetter}>{guess[index]}</Text>
    </View>
  )
}

// Guess type
type GuessRowProps = {
  guess: string,
  word: string,
  done: boolean,
}

// Guess function
const GuessRow = ({ guess, word, done }: GuessRowProps) => {
  return (
    <View style={styles.guessRow}>
      {[...Array(word.length)].map((_, index) => (
        <Block key={index} index={index} guess={guess} done={done} />
      ))}
    </View>
  )
}

// Keyboard type
type KeyboardRowProps = {
  letters: string[],
  onKeyPress: (letter: string) => void,
}

// Create keyboard and on press
const KeyboardRow = ({ letters, onKeyPress }: KeyboardRowProps) => (
  <View style={styles.keyboardRow}>
    {letters.map(letter => (
      <TouchableOpacity onPress={() => onKeyPress(letter.trim())} key={letter.trim()}>
        <View style={styles.key}>
          <Text style={styles.keyLetter}>{letter}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
)

// Create keyboard
const Keyboard = ({ onKeyPress }: { onKeyPress: (letter: string) => void }) => {
  const row1 = ["Q", "W", "E", "R", "T", "Y", "U", " I ", "O", "P"]
  const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
  const row3 = [" ⌫ ", "Z", "X", "C", "V", "B", "N", "M", " 🔍 "]

  return (
    <View style={styles.keyboard}>
      <KeyboardRow letters={row1} onKeyPress={onKeyPress} />
      <KeyboardRow letters={row2} onKeyPress={onKeyPress} />
      <KeyboardRow letters={row3} onKeyPress={onKeyPress} />
    </View>
  )
}

// Init guess
const defaultGuess: {
  [key: number]: string
} = {
  0: "",
}

// Main App
export default function Main({ route, navigation }: any) {
  const { stagerefresh } = route?.params || {}
  const { stage, updateStage } = useStage()
  const currentStage = stagerefresh ? stagerefresh : stage

  // clues functionality 
  const [activeWord, setActiveWord] = React.useState(words[0][0])
  const [guessIndex, setGuessIndex] = React.useState(0)
  const [guesses, setGuesses] = React.useState(defaultGuess)
  const [clues, setClues] = React.useState(words[0].slice(1))
  
  // Level
  const { level, levelUp } = useLevel()

  // Average
  //const { addScore } = useTotal()
  // Solved
  const { solvedUp } = useSolved()
  // Stage
  const { staged, updateStaged} = useStaged()

  const condition = staged.charAt(parseInt(level) - 1) === 'f'
  const isActive = stage.charAt(parseInt(level) - 1) !== '0'

  // Set Clues
  const [count, setCounter] = React.useState(0);

  const [gameComplete, setGameComplete] = React.useState(false)

  //handle key presses
  const handleKeyPress = (letter: string) => {
    let guess: string = guesses[guessIndex]
    // Enter guess
    if (letter === "🔍") {
      //not enough characters
      if (guess.length !== activeWord.length) {
        return
      }
      // if guess is word
      if (guess.toLocaleLowerCase() === activeWord.toLocaleLowerCase()) {
        
        setGuesses({ ...guesses, [guessIndex]: activeWord.toUpperCase() + letter.toUpperCase() })
        setGuessIndex(0)

        if (condition) {
          solvedUp()
        }

        updateStage(parseInt(level), 0)
        updateStaged(parseInt(level))
        setGameComplete(true)

        return
      }
      //remove guess
      if (guessIndex < activeWord.length) {
        setGuesses({ ...guesses, [guessIndex]: guess.slice(0, -1 * activeWord.length) })
        if (count != 5) {
          setCounter(count + 1)
          updateStage(parseInt(level), count + 1)
        }
        setGuessIndex(0)
      }
    }
    // delete letter
    if (letter === "⌫" && !gameComplete) {
      setGuesses({ ...guesses, [guessIndex]: guess.slice(0, -1) })
      return
    }
    // don't add if guess is full
    if (guess.length >= activeWord.length) {
      return
    }
    
    setGuesses({ ...guesses, [guessIndex]: guess + letter })
  }

  React.useEffect(() => {
    if (!gameComplete) {
      setActiveWord(words[parseInt(level) - 1][0])
      setGuesses(defaultGuess)
      setGuessIndex(0)
      setClues(words[parseInt(level) - 1].slice(1))
      setCounter(
        parseInt(currentStage.charAt(parseInt(level) - 1)) !== 0 ?
        parseInt(currentStage.charAt(parseInt(level) - 1)) :
        parseInt(stage.charAt(parseInt(level) - 1))
      );
    }
  }, [parseInt(level)])

  React.useEffect(() => {
    setCounter(
      parseInt(currentStage.charAt(parseInt(level) - 1)) !== 0 ?
      parseInt(currentStage.charAt(parseInt(level) - 1)) :
      parseInt(stage.charAt(parseInt(level) - 1))
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 0.05, flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => {{navigation.navigate('Start', {stagerefresh: stage})}}}>
          <View style={styles.backButton}>
            <Text style={styles.backSymbol}>{"☜"}</Text>
          </View>
        </TouchableOpacity>
        <View style={[styles.scoreContainer, {  borderColor: !condition ? 'green' : (isActive ? "blue" : "white")}]}>
          <Text style={[styles.score, {  color: !condition ? 'green' : (isActive ? "blue" : "white")}]}>{"LEVEL " + level}</Text>
        </View>
      </View>

      <View style={styles.clueContainer}>
        {clues.map((clue, index) => {
          if (index <= count) {
            return (
              <Text key={index}>
                <Text style={styles.clues}>{ "☞ " + clue + " ☜"}</Text>
              </Text>
            )
          }
        })}
      </View>

      <View>
        <GuessRow
          guess={guesses[0]}
          word={activeWord}
          done={gameComplete}
        />
      </View>

      <View>
        <View style={styles.nextPrev}>
          
          {parseInt(level) > 1 && (
            <TouchableOpacity onPress={() => {
              levelUp((parseInt(level) - 1))
              setGameComplete(false)
              setCounter(0)
            }}>
              <View style={styles.continue}>
                <Text style={styles.continueButton}> {"◀"} </Text>
              </View>
            </TouchableOpacity>
          )}
          
          {parseInt(level) < 100 && (
            <TouchableOpacity onPress={() => {
              levelUp((parseInt(level) + 1))
              setGameComplete(false)
              setCounter(0)
            }}>
              <View style={styles.continue}>
                <Text style={styles.continueButton}> {'▶'} </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <Keyboard onKeyPress={handleKeyPress} />
      </View>
    </SafeAreaView>
  )
}
