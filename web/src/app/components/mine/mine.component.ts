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
  @Input() isGameOver: boolean = false;
  @Output() changedMinesEvent = new EventEmitter<Mine[]>();

  constructor(private gameService: GameService) {
  }

  onClick() {
    if (this.isGameOver || this.mine.isFlagged) {
      return;
    }

    this.gameService.registerMineClick(this.mine.coordinates)
      .subscribe(data => {
        this.changedMinesEvent.emit(data);
      });
  }

  onFlag(event: any) {
    event.preventDefault();

    if (this.isGameOver) {
      return;
    }

    this.gameService.registerFlagClick(this.mine.coordinates)
      .subscribe(data => {
        this.changedMinesEvent.emit(data);
      });
  }
}
