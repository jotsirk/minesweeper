import {Component, Input} from "@angular/core";
import {Mine} from "../models/mine.model";

@Component({
  selector: "mine",
  templateUrl: "mine.component.html",
  styleUrls: ["mine.component.css"],
})
export class MineComponent {
  @Input() mine!: Mine;

  onClick() {
    console.log(this.mine.indexX + ' ' + this.mine.indexY)
  }
}
