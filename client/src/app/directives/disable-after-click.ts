import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDisableAfterClick]',
})
export class DisableAfterClick {
  @Input('delay') delay: number = 3000;
  originalText: string = '';

  constructor(
    private el: ElementRef,
    private renderer2: Renderer2,
  ) {}

  @HostListener('click')
  onClick() {
    this.originalText = this.el.nativeElement.textContent;

    this.renderer2.setProperty(this.el.nativeElement, 'disabled', true);
    this.renderer2.setProperty(this.el.nativeElement, 'textContent', 'Processing...');

    setTimeout(() => {
      this.renderer2.setProperty(this.el.nativeElement, 'disabled', false);
      this.renderer2.setProperty(this.el.nativeElement, 'textContent', this.originalText);
    }, this.delay);
  }
}
