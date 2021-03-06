package com.kj.minesweeper.model.dto

class MineDto(
    val indexX: Int,
    val indexY: Int,
    val isRevealed: Boolean,
    val displayValue: String? = null,
    val isFlagged: Boolean = false,
)
