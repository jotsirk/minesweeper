package com.kj.minesweeper.service

import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mock
import org.mockito.junit.MockitoJUnitRunner

@RunWith(MockitoJUnitRunner::class)
class MineFieldServiceTest {

    @Mock
    private lateinit var mineFieldService: MineFieldService

    @Test
    fun `displayPlayingBoard`() {
        val playingField = mineFieldService.generateMineField(10, 4)
        mineFieldService.displayPlayingField(playingField)
    }
}