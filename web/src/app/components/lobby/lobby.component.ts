import {Component} from "@angular/core";
import {Router, ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: "lobby",
  templateUrl: "lobby.component.html"
})
export class LobbyComponent {

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {

  }

}
