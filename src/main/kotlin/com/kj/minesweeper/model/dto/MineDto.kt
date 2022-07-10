package com.kj.minesweeper.model.dto

class MineDto(
    val indexX: Int,
    val indexY: Int,
    val isRevealed: Boolean,
    val displayField: String
)