package com.kj.minesweeper.model

class MineField(
    val howManyTouchingBombs: Int = 0,
    var isBomb: Boolean = false,
    val isOpened: Boolean = false,
    val isFlagged: Boolean = false,
    val isRevealed: Boolean = false,
) {

    fun displayFieldString(): String {
        if (isBomb) {
            return "[x]"
        }
        return "[$howManyTouchingBombs]"
    }
}