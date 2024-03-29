package com.kj.minesweeper.service

import com.kj.minesweeper.model.Mine
import com.kj.minesweeper.model.dto.GameDto
import org.springframework.stereotype.Service
import java.util.*
import kotlin.random.Random

@Service
class MineFieldService {

    private var mineField: Array<Array<Mine?>>? = null
    private var isGameOver = false
    private var isGameWon = false
    private var numOfFieldsToOpen: Int = 0
    private var numOfBombs: Int = 0

    fun getMineField(): Array<Array<Mine?>>? {
        if (mineField.isNullOrEmpty()) {
            generateMineField(20, 10)
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
        this.numOfFieldsToOpen = sizeOfField * sizeOfField - numOfBombs
        this.numOfBombs = numOfBombs
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
            isGameOver = true
            return affectedMines
        } else if (mine.howManyTouchingBombs == 0) {
            openTouchingFieldsWithNoNearbyBombs(affectedMines, mine)
        }

        this.numOfFieldsToOpen -= affectedMines.size

        if (this.numOfFieldsToOpen == 0) {
            this.isGameWon = true
            // todo send event of winning, but right now just send a mine with a winning symbol
            affectedMines.add(Mine(100, 100, 9, isBomb = false, isFlagged = false, isRevealed = true))
        }

        return affectedMines
    }

    fun restartGame(): Array<Array<Mine?>>? {
        generateMineField(10, 10)
        this.isGameWon = false
        this.isGameOver = false
        return this.mineField
    }

    private fun openTouchingFieldsWithNoNearbyBombs(affectedMines: MutableCollection<Mine>, selectedMine: Mine) {
        var stackActiveMine: Mine
        var stackAdjacentMine: Mine
        val mineStack: Stack<Mine> = Stack()
        mineStack.add(selectedMine)

        while (mineStack.isNotEmpty()) {
            stackActiveMine = mineStack.pop()
            for (directionArray in adjacentMines) {
                try {
                    stackAdjacentMine =
                        mineField?.get(stackActiveMine.indexX - directionArray[0])!![stackActiveMine.indexY - directionArray[1]]!!

                    if (stackAdjacentMine.howManyTouchingBombs == 0 && !stackAdjacentMine.isRevealed) {
                        stackAdjacentMine.isRevealed = true
                        mineStack.add(stackAdjacentMine)
                    }
                } catch (ex: IndexOutOfBoundsException) {
                    continue
                }
            }
            if (!affectedMines.contains(stackActiveMine) && stackActiveMine.isRevealed) {
                affectedMines.add(stackActiveMine)
            }
        }
    }

    fun registerMineFlagClick(clickedMineCoordinates: Array<Int>): List<Mine> {
        val mine = mineField!![clickedMineCoordinates[0]][clickedMineCoordinates[1]]
        return flagMineClick(mine!!)
    }

    private fun flagMineClick(mine: Mine): List<Mine> {
        val affectedMines = mutableListOf(mine)

        mine.isFlagged = !mine.isFlagged

        return affectedMines
    }

    fun loadGame(): GameDto {
        return GameDto(isGameOver = this.isGameOver)
    }

    fun getNumOfBombs(): Int {
        return this.numOfBombs
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

        private val adjacentMines = arrayOf(
            intArrayOf(0, -1),
            intArrayOf(1, 0),
            intArrayOf(0, 1),
            intArrayOf(-1, 0),
        )
    }
}
