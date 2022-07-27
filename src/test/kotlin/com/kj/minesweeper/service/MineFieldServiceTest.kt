package com.kj.minesweeper.service

import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.junit.MockitoJUnitRunner
import org.springframework.beans.factory.annotation.Autowired

@RunWith(MockitoJUnitRunner::class)
class MineFieldServiceTest {

    @Autowired
    private lateinit var mineFieldService: MineFieldService

    @Test
    fun `registerMineClick - reveal adjacent empty fields - if no errors`() {
        // given
        mineFieldService.generateMineField(10, 10)

        // when
        mineFieldService.registerMineClick(arrayOf(3, 3))

        // then
        println()
    }
}
