package com.kj.minesweeper.resource

import com.kj.minesweeper.model.MessageModel
import com.kj.minesweeper.model.User
import com.kj.minesweeper.model.dto.GameDto
import com.kj.minesweeper.model.dto.MineDto
import com.kj.minesweeper.service.MineFieldService
import com.kj.minesweeper.service.UserService
import com.kj.minesweeper.service.converter.MineDtoConverter
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
class GameLogicResource {

    @Autowired
    private lateinit var userService: UserService

    @Autowired
    private lateinit var mineFieldService: MineFieldService

    @Autowired
    private lateinit var mineDtoConverter: MineDtoConverter

    @PostMapping("/api/register-user")
    @ResponseStatus(HttpStatus.CREATED)
    fun registerUser(@RequestBody user: User): User {
        return userService.registerNewUser(user)
    }

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    fun send(messageModel: MessageModel): MessageModel {
        return messageModel
    }

    @GetMapping("/api/get-minefield")
    @ResponseStatus(HttpStatus.OK)
    fun getMineField(): Array<Array<MineDto?>> {
        return mineDtoConverter.convertMineFieldToDtoMineField(mineFieldService.getMineField())
    }

    @GetMapping("/api/get-users")
    @ResponseStatus(HttpStatus.OK)
    fun getUsers(): MutableCollection<User> {
        return userService.getRegisteredUsers()
    }

    @PostMapping("/api/register-mine-click")
    @ResponseStatus(HttpStatus.OK)
    fun registerMineClick(@RequestBody mineCoordinates: Array<Int>): MutableCollection<MineDto> {
        return mineDtoConverter.convertAffectedMinesToDtoList(mineFieldService.registerMineClick(mineCoordinates))
    }

    @PostMapping("/api/register-flag-click")
    @ResponseStatus(HttpStatus.OK)
    fun registerFlagClick(@RequestBody mineCoordinates: Array<Int>): MutableCollection<MineDto> {
        return mineDtoConverter.convertAffectedMinesToDtoList(mineFieldService.registerMineFlagClick(mineCoordinates))
    }

    @GetMapping("/api/load-game")
    @ResponseStatus(HttpStatus.OK)
    fun loadGame(): GameDto {
        // todo at some point this should be a game room specific thing
        return mineFieldService.loadGame()
    }

    @GetMapping("/api/restart-game")
    @ResponseStatus(HttpStatus.OK)
    fun restartGame(): Array<Array<MineDto?>> {
        return mineDtoConverter.convertMineFieldToDtoMineField(mineFieldService.restartGame())
    }
}
