import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../models/user.model";

@Component({
  selector: "lobby",
  templateUrl: "lobby.component.html"
})
export class LobbyComponent implements OnInit {

  private currentUser: User | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.currentUser = history.state
    console.log(this.currentUser)
  }

}
