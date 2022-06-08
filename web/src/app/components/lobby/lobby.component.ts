import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../models/user.model";
import * as Stomp from "stompjs";
import * as SockJS from "sockjs-client";

@Component({
  selector: "lobby",
  templateUrl: "lobby.component.html"
})
export class LobbyComponent implements OnInit {

  greetings: string[] = [];
  private currentUser: User | null = null;
  private stompClient: Stomp.Client | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.currentUser = history.state
    console.log(this.currentUser)
    this.connect()
  }

  connect() {
    const socket = new SockJS("http://localhost:8090/chat")
    this.stompClient = Stomp.over(socket)
    const _this = this
    this.stompClient.connect({}, function (frame) {
      console.log('connected' + frame)
      _this.stompClient?.subscribe('/topic/message', function (hello) {
        console.log(hello.body)
        _this.showMessage(JSON.parse(hello.body))
      })
    })
  }

  sendMessage() {

  }

  showMessage(message: any) {
    this.greetings.push(message);
  }
}
