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
  isGameWon: boolean = false;
  chatRoomMessages: string[] = [];
  gameroomUsers: User[] = [];
  mineField: Mine[][] = [];
  messageField = '';
  mines: number = 0;
  flagsPlanted: number = 0;

  constructor(
    private gameService: GameService
  ) {
  }

  ngOnInit() {
    // todo check about the current user thing. refresh loses username and everything else will break because of this
    this.currentUser = history.state;
    this.loadGame();
    this.loadGameRoomUser();
    this.connect();
    this.loadMineField();
    this.getMineCount();
  }

  loadGame() {
    this.gameService.loadGame().subscribe(data => {
      this.isGameOver = data['isGameOver'];
    });
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

  getMineCount() {
    this.gameService.getMineCount().subscribe( data => this.mines = data);
  }

  displayMineCount() {
    return `${this.flagsPlanted}/${this.mines}`;
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
        rowMines.push(new Mine(i, j, mine.displayValue, mine.isRevealed, mine.isFlagged));
      }
      this.mineField.push(rowMines);
      rowMines = [];
    }
  }

  updateMineField(changedMines: Mine[]) {
    for (const changedMine of changedMines) {
      if (changedMine.displayValue === 'w') {
        this.isGameWon = true;
        continue;
      }

      this.mineField[changedMine.indexX][changedMine.indexY].isFlagged = changedMine.isFlagged;
      this.mineField[changedMine.indexX][changedMine.indexY].displayValue = changedMine.displayValue;
      this.mineField[changedMine.indexX][changedMine.indexY].isRevealed = changedMine.isRevealed;

      if (changedMine.displayValue === 'x') {
        this.isGameOver = true;
        return;
      }
    }
  }

  restartGame() {
    this.mineField = [];
    this.isGameWon = false;
    this.isGameOver = false;
    this.gameService.restartGame().subscribe(
        data => {
          this.initMineField(data);
        });
  }
}
