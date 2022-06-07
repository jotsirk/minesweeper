package com.kj.minesweeper.model

class MineField(
    var howManyTouchingBombs: Int = 0,
    var isBomb: Boolean = false,
    var isOpened: Boolean = false,
    var isFlagged: Boolean = false,
    var isRevealed: Boolean = false
) {

    fun displayFieldString(): String {
        if (isBomb) {
            return "[x]"
        }
        return "[$howManyTouchingBombs]"
    }
}