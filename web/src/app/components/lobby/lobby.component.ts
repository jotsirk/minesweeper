import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../models/user.model";
import * as Stomp from "stompjs";
import * as SockJS from "sockjs-client";
import {GameService} from "../../services/game.service";
import {Mine} from "../models/mine.model";

@Component({
  selector: "lobby",
  templateUrl: "lobby.component.html"
})
export class LobbyComponent implements OnInit {

  private greetings: string[] = [];
  private currentUser: User | null = null;
  private stompClient: Stomp.Client | null = null;
  gameroomUsers: User[] = [];
  mineField: Object[][] = [];

  constructor(
    private gameService: GameService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.currentUser = history.state
    console.log(this.currentUser)
    this.loadGameRoomUser()
    this.connect()
    this.loadMineField();
  }

  loadGameRoomUser() {
    // todo this needs to come from the backend
    //this.gameService.getGameroomUsers().subscribe(data => this.gameroomUsers = data)
    for (let i = 0; i < 10; i++) {
      this.gameroomUsers.push(new User("user" + i));
    }
  }

  connect() {
    const socket = new SockJS("http://localhost:8090/chat")
    this.stompClient = Stomp.over(socket)
    const _this = this
    this.stompClient.connect({}, function (frame) {
      _this.stompClient?.subscribe('/topic/messages', function (hello) {
        _this.showMessage(JSON.parse(hello.body))
      })
    })
  }

  sendMessage() {
    this.stompClient?.send('/app/chat',
      {},
      JSON.stringify({'from': 'lmao', 'msg': 'hello'}))
  }

  showMessage(message: any) {
    this.greetings.push(message);
  }

  loadMineField() {
    for (let i=0; i<10; i++) {
      for (let j=0; j<10; j++) {
        this.mineField[i][j] = new Mine(i, j);
      }
    }
  }
}
