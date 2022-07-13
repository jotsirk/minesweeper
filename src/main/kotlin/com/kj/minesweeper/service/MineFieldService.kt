package com.kj.minesweeper.service

import com.kj.minesweeper.model.Mine
import org.springframework.stereotype.Service
import kotlin.random.Random

@Service
class MineFieldService {

    private var mineField: Array<Array<Mine?>>? = null

    fun getMineField(): Array<Array<Mine?>>? {
        if (mineField.isNullOrEmpty()) {
            generateMineField(10, 10)
        }
        return mineField
    }

    fun generateMineField(sizeOfField: Int, numOfBombs: Int) {
        val playingField: Array<Array<Mine?>> = Array(sizeOfField) { Array(sizeOfField) { null } }

        for (i in 0 until sizeOfField) {
            for (j in 0 until sizeOfField) {
                playingField[i][j] = Mine(indexX = i, indexY = j)
            }
        }

        setBombsInPlayingField(numOfBombs, playingField)
        this.mineField = playingField
    }

    private fun setBombsInPlayingField(numOfBombs: Int, playingField: Array<Array<Mine?>>) {
        var bombsInPlay = numOfBombs

        for (i in 0 until numOfBombs) {
            while (bombsInPlay > 0) {
                val rowIndex = Random.nextInt(0, playingField.size - 1)
                val columnIndex = Random.nextInt(0, playingField.size - 1)
                val mineField = playingField[rowIndex][columnIndex]

                if (mineField!!.isBomb) {
                    continue
                }

                mineField.isBomb = true
                initBombTouchingFields(playingField, rowIndex, columnIndex)

                bombsInPlay--
            }
        }
    }

    private fun initBombTouchingFields(playingField: Array<Array<Mine?>>, rowNumber: Int, columnNumber: Int) {
        for (directionArray in fieldCircle) {
            try {
                val mineField = playingField[rowNumber - directionArray[0]][columnNumber - directionArray[1]]
                if (mineField!!.isBomb) {
                    continue
                }
                mineField.howManyTouchingBombs++
            } catch (ex: ArrayIndexOutOfBoundsException) {
                continue
            }
        }
    }

    fun registerMineClick(clickedMineCoordinates: Array<Int>): List<Mine> {
        val mine = mineField!![clickedMineCoordinates[0]][clickedMineCoordinates[1]]
        return mineClick(mine!!)
    }

    private fun mineClick(mine: Mine): List<Mine> {
        val affectedMines = mutableListOf(mine)
        mine.isRevealed = true

        if (mine.isBomb) {
            // todo return some game ending event
        }
        if (mine.howManyTouchingBombs == 0) {
            // todo reveal all directly touching bombs as well
        }

        return affectedMines
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
