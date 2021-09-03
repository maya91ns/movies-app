import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent implements OnInit {
  @Input() label = '';
  @Input() routerLink: string;
  @Input() shouldHide = false;

  @Output() onClick = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  btnClick(event: any) {
    this.onClick.emit();
}
}
