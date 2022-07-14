import {Directive, HostListener, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[mineClick]'
})
export class MineClickDirective {

  constructor(private readonly viewRef: ViewContainerRef) {
  }

  @HostListener('click') onMouseClick() {
    console.log(this.viewRef.element.nativeElement);
  }

}
