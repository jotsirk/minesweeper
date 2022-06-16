import {Component, Input} from "@angular/core";
import {Mine} from "../models/mine.model";

@Component({
  selector: "mine-component",
  templateUrl: "mine.component.html",
  styleUrls: ["mine.component.css"],
})
export class MineComponent {
  @Input() mine: Mine | null = null;
}
