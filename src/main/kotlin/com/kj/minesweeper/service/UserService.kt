package com.kj.minesweeper.service

import com.kj.minesweeper.model.User
import org.springframework.stereotype.Service

@Service
class UserService {

    private val registeredUser: MutableCollection<User> = mutableListOf()

    fun registerNewUser(user: User): User {
        if (registeredUser.any { it.username == user.username }) {
            throw Exception("Username already taken!")
        } else {
            registeredUser += user
        }
        return user
    }
}