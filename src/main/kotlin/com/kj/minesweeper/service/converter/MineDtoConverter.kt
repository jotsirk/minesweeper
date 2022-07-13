package com.kj.minesweeper.service.converter

import com.kj.minesweeper.model.Mine
import com.kj.minesweeper.model.dto.MineDto
import org.springframework.stereotype.Component

@Component
class MineDtoConverter {

    fun convertMineFieldToDtoMineField(mineField: Array<Array<Mine?>>?): Array<Array<MineDto?>> {
        // todo look into this init because the Array(mineField[0].size bothers me
        val playingField: Array<Array<MineDto?>> = Array(mineField!!.size) { Array(mineField[0].size) { null } }
        var mine: Mine

        for (i in mineField.indices) {
            for (j in 0 until mineField[i].size) {
                mine = mineField[i][j]!!
                playingField[i][j] = MineDto(indexX = mine.indexX, indexY = mine.indexY, isRevealed = mine.isRevealed)
            }
        }

        return playingField
    }

    fun convertAffectedMinesToDtoList(mines: List<Mine>): MutableCollection<MineDto> {
        val mineDtos = mutableListOf<MineDto>()
        mines.forEach {
            mineDtos.add(
                MineDto(
                    indexX = it.indexX,
                    indexY = it.indexY,
                    isRevealed = it.isRevealed,
                    displayValue = it.displayString(),
                )
            )
        }
        return mineDtos
    }
}
