import {Component, Input} from "@angular/core";
import {Mine} from "../models/mine.model";
import {GameService} from "../../services/game.service";

@Component({
  selector: "mine",
  templateUrl: "mine.component.html",
  styleUrls: ["mine.component.css"],
})
export class MineComponent {
  @Input() mine!: Mine;

  constructor(private gameService: GameService) {
  }

  onClick() {
    this.gameService.registerMineClick(this.mine.coordinates)
      .subscribe(() => {
        console.log("try and update something");
      });
  }

  displayMine(): string {
    let displayedValue: string;

    if (this.mine.isBomb) {
      displayedValue = 'x';
    } else if (!this.mine.isBomb) {
      displayedValue = this.mine.howManyBombsTouching.toString();
    } else {
      displayedValue = '';
    }
    return displayedValue;
  }
}
