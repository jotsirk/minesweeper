import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {GameService} from "../../services/game.service";
import {User} from "../models/user.model";

@Component({
  selector: 'welcome-screen',
  templateUrl: 'welcome-screen.component.html',
})
export class WelcomeScreenComponent {

  isClicked = false
  username = ""

  constructor(
    private router: Router,
    private gameService: GameService,
  ) {
  }

  submitUser() {
    // submit a user to a lobby and redirect him into that lobby
    this.gameService.registerUser(new User(this.username))
      .subscribe(data => {
        if (data['username'] !== null) {
          this.router.navigate(['/lobby'], {state: data})
        }
      })
  }
}
