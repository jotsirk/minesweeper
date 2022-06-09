package com.kj.minesweeper.resource

import com.kj.minesweeper.model.User
import com.kj.minesweeper.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController("/users")
class UsersResource {

    @Autowired
    private lateinit var userService: UserService

    @GetMapping("/get-gameroom-users")
    fun getUsersInGameRoom(): MutableCollection<User> {
        return userService.registeredUser
    }
}
