import {Component, OnInit} from "@angular/core";
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
  isGameOver: boolean = false;
  chatRoomMessages: string[] = [];
  gameroomUsers: User[] = [];
  mineField: Mine[][] = [];
  messageField = '';

  constructor(
    private gameService: GameService
  ) {
  }

  ngOnInit() {
    // todo check about the current user thing. refresh loses username and everything else will break because of this
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
    //todo save messages to some place so that refresh does not lose these
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
    let mine: Mine;

    for (let i = 0; i < generatedMineField.length; i++) {
      for (let j = 0; j < generatedMineField[i].length; j++) {
        mine = generatedMineField[i][j];
        rowMines.push(new Mine(i, j, mine.displayValue, mine.isRevealed));
      }
      this.mineField.push(rowMines);
      rowMines = [];
    }
  }

  updateMineField(changedMines: Mine[]) {
    let mine: Mine;

    for (const changedMine of changedMines) {
      mine = this.mineField[changedMine.indexX][changedMine.indexY];
      this.mineField[changedMine.indexX][changedMine.indexY] =
        new Mine(changedMine.indexX, changedMine.indexY, changedMine.displayValue, changedMine.isRevealed);

      if (changedMine.displayValue === 'x') {
        this.isGameOver = true;
        return;
      }
    }
  }
}
