package com.kj.minesweeper.service

import com.kj.minesweeper.model.MineField
import kotlin.random.Random

open class MineFieldService {

    fun generateMineField(sizeOfField: Int, numOfBombs: Int): Array<Array<MineField>> {
        val playingField: Array<Array<MineField>> = Array(sizeOfField) { Array(sizeOfField) { MineField() } }

        // todo add random bombs
        setBombsInPlayingField(numOfBombs, playingField)
        // todo add numbers to indicate how many bombs are touching what fields

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

                bombsInPlay--
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
}