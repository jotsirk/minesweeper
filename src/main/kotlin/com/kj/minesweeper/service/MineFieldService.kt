package com.kj.minesweeper.service

import com.kj.minesweeper.model.MineField
import org.springframework.stereotype.Service
import kotlin.random.Random

@Service
class MineFieldService {

    fun generateMineField(sizeOfField: Int, numOfBombs: Int): Array<Array<MineField>> {
        val playingField: Array<Array<MineField>> = Array(sizeOfField) { Array(sizeOfField) { MineField() } }
        setBombsInPlayingField(numOfBombs, playingField)
        return playingField
    }

    private fun setBombsInPlayingField(numOfBombs: Int, playingField: Array<Array<MineField>>) {
        var bombsInPlay = numOfBombs

        for (i in 0 until numOfBombs) {
            while (bombsInPlay > 0) {
                val rowIndex = Random.nextInt(0, playingField.size - 1)
                val columnIndex = Random.nextInt(0, playingField.size - 1)
                val mineField = playingField[rowIndex][columnIndex]

                if (mineField.isBomb) {
                    continue
                }

                mineField.isBomb = true
                initBombTouchingFields(playingField, rowIndex, columnIndex)

                bombsInPlay--
            }
        }
    }

    private fun initBombTouchingFields(playingField: Array<Array<MineField>>, rowNumber: Int, columnNumber: Int) {
        for (directionArray in fieldCircle) {
            try {
                val mineField = playingField[rowNumber - directionArray[0]][columnNumber - directionArray[1]]
                if (mineField.isBomb) {
                    continue
                }
                mineField.howManyTouchingBombs++
            } catch (ex: ArrayIndexOutOfBoundsException) {
                continue
            }
        }
    }

    fun displayPlayingField(playingField: Array<Array<MineField>>) {
        for (i in playingField.indices) {
            for (j in 0 until playingField[i].size) {
                print(playingField[i][j].displayFieldString())
            }
            println()
        }
    }

    companion object {
        private val fieldCircle = arrayOf(
            intArrayOf(-1, -1),
            intArrayOf(0, -1),
            intArrayOf(1, -1),
            intArrayOf(-1, 0),
            intArrayOf(1, 0),
            intArrayOf(-1, 1),
            intArrayOf(0, 1),
            intArrayOf(1, 1),
        )
    }
}
