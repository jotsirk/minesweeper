package com.kj.minesweeper.service

import com.kj.minesweeper.model.User
import com.kj.minesweeper.model.dto.UserDto
import org.springframework.stereotype.Service

@Service
class UserService(
    val registeredUser: MutableCollection<User> = mutableListOf()
) {
    fun registerNewUser(user: User): User {
        if (registeredUser.any { it.username == user.username }) {
            throw Exception("Username already taken!")
        } else {
            registeredUser += user
        }
        return user
    }

    fun getRegisteredUsers(): MutableCollection<User> {
        return this.registeredUser
        //return convertUserToDto(this.registeredUser)
    }

    private fun convertUserToDto(registeredUser: MutableCollection<User>): List<UserDto> {
        var userDtos: List<UserDto> = mutableListOf()
        registeredUser.forEach {
            userDtos.toMutableList().add(UserDto(it.username))
            println(it.username)
        }
        return userDtos
    }
}
