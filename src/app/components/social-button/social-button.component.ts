import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-social-button',
  templateUrl: './social-button.component.html',
  styleUrls: ['./social-button.component.scss'],
})
export class SocialButtonComponent implements OnInit {
  @Output() clicked = new EventEmitter();
  @Input() user;
  @Input() text = '';
  class = '';

  constructor() {}

  ngOnInit(): void {
    this.class = this.user ? 'google-sign-out' : 'google-sign-in';
  }
}
