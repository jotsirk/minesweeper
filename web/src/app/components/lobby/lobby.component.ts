import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../models/user.model";
import * as Stomp from "stompjs";
import * as SockJS from "sockjs-client";
import {GameService} from "../../services/game.service";
import {Mine} from "../models/mine.model";

@Component({
  selector: "lobby",
  templateUrl: "lobby.component.html",
  styleUrls: ['lobby.component.css']
})
export class LobbyComponent implements OnInit {

  private currentUser: User | null = null;
  private stompClient: Stomp.Client | null = null;
  chatRoomMessages: string[] = [];
  gameroomUsers: User[] = [];
  mineField: Mine[][] = [];
  messageField = '';

  constructor(
    private gameService: GameService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    // todo check about the current user thing. refresh loses username and everything else will break because of this
    console.log(history.state);
    this.currentUser = history.state;
    this.loadGameRoomUser();
    this.connect();
    this.loadMineField();
  }

  loadGameRoomUser() {
    this.gameService.getGameroomUsers().subscribe(data => this.gameroomUsers = data);
  }

  connect() {
    const socket = new SockJS("http://localhost:8090/chat")
    this.stompClient = Stomp.over(socket)
    const _this = this
    this.stompClient.connect({}, function (frame) {
      _this.stompClient?.subscribe('/topic/messages', function (hello) {
        _this.showMessage(JSON.parse(hello.body));
      })
    })
  }

  sendMessage() {
    //todo save message to some place so that refresh does not lose these
    console.log(this.currentUser?.username);
    this.stompClient?.send('/app/chat',
      {},
      JSON.stringify({'from': this.currentUser?.username, 'msg': this.messageField}));
    this.messageField = '';
  }

  showMessage(message: any) {
    this.chatRoomMessages.push(message);
  }

  loadMineField() {
    this.gameService.getMinefield().subscribe(data => {
      this.initMineField(data);
    })
  }

  private initMineField(generatedMineField: [][]) {
    let rowMines: Mine[] = [];
    for (let i = 0; i < generatedMineField.length; i++) {
      for (let j = 0; j < generatedMineField[i].length; j++) {
        rowMines.push(new Mine(i, j));
      }
      this.mineField.push(rowMines);
      rowMines = [];
    }
  }

  updateMineField(changedMines: Mine[]) {
    console.log(changedMines[0]);
  }
}
