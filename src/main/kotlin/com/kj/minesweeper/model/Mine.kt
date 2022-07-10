package com.kj.minesweeper.model

class Mine(
    var indexX: Int,
    var indexY: Int,
    var howManyTouchingBombs: Int = 0,
    var isBomb: Boolean = false,
    var isFlagged: Boolean = false,
    var isRevealed: Boolean = false
) {
    fun displayString(): String {
        var displayStr = ""

        if (isRevealed) {
            if (isBomb) {
                displayStr = "x"
            } else {
                displayStr = this.howManyTouchingBombs.toString()
            }
        }
        return displayStr
    }
}