import { Component, OnInit, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.scss'],
})
export class ValidationErrorsComponent implements OnInit {
  @Input() errors: ValidationErrors;
  @Input() title: string;
  constructor() {}

  ngOnInit(): void {}
}
