import {Component} from "@angular/core";
import {Mine} from "../models/mine.model";

@Component({
  selector: "mine",
  templateUrl: "mine.component.html",
  styleUrls: ["mine.component.css"],
})
export class MineComponent {

  constructor(mine: Mine) {
  }

}
