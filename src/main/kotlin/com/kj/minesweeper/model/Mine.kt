package com.kj.minesweeper.model

class Mine(
    var howManyTouchingBombs: Int = 0,
    var isBomb: Boolean = false,
    var isOpened: Boolean = false,
    var isFlagged: Boolean = false,
    var isRevealed: Boolean = false
) {}