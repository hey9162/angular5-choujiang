import { Directive , HostBinding, HostListener, Input, Renderer2,ElementRef} from '@angular/core';

@Directive({
  selector: '[inputView]'
})
export class InputDirective {
  body: HTMLElement;
  constructor(private elementRef: ElementRef) { 
    this.body = window.document.body;
  }
  
  @HostListener('focus',['$event'])
  onFocus(event){
    this.body.style.height = window.document.body.clientHeight + 'px';
  };
  @HostListener('blur',['$event'])
  onBlur(event){
    this.body.style.height = 'auto';
  }
}
