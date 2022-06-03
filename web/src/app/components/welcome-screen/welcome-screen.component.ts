import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'welcome-screen',
  templateUrl: 'welcome-screen.component.html',
})
export class WelcomeScreenComponent {

  isClicked = false
  username = ""

  constructor(
    private router: Router,
  ) {
  }

  submitUser() {
    // submit a user to a lobby and redirect him into that lobby
    this.router.navigate(['lobby', {}])
  }

}
