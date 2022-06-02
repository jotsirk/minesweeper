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
    this.router.navigate(['lobby'])
  }

}
