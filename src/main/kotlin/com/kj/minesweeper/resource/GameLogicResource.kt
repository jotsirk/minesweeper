package com.kj.minesweeper.resource

import com.kj.minesweeper.model.MessageModel
import com.kj.minesweeper.model.User
import com.kj.minesweeper.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpOutputMessage
import org.springframework.http.HttpStatus
import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.ResponseStatus
import org.springframework.web.bind.annotation.RestController

@RestController
class GameLogicResource {

    @Autowired
    private lateinit var userService: UserService

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
}