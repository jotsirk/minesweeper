package com.kj.minesweeper.service.converter

import com.kj.minesweeper.model.Mine
import com.kj.minesweeper.model.dto.MineDto
import org.springframework.stereotype.Component

@Component
class MineDtoConverter {

    fun convertAffectedMinesToDtoList(mines: List<Mine>): MutableCollection<MineDto> {
        val mineDtos = mutableListOf<MineDto>()
        mines.forEach {
            mineDtos.add(
                MineDto(
                    indexX = it.indexX,
                    indexY = it.indexY,
                    isRevealed = it.isRevealed,
                    displayField = it.displayString(),
                )
            )
        }
        return mineDtos
    }
}