import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('#7b1fa2');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }
}
