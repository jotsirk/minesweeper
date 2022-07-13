import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Mine} from "../models/mine.model";
import {GameService} from "../../services/game.service";

@Component({
  selector: "mine",
  templateUrl: "mine.component.html",
  styleUrls: ["mine.component.css"],
})
export class MineComponent {
  @Input() mine!: Mine;
  @Output() changedMinesEvent = new EventEmitter<Mine[]>();

  constructor(private gameService: GameService) {
  }

  onClick() {
    this.gameService.registerMineClick(this.mine.coordinates)
      .subscribe(data => {
        this.changedMinesEvent.emit(data);
      });
  }
}
