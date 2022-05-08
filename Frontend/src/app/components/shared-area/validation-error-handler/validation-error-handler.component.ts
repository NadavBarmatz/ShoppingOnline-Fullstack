import { ValidationFieldsModel } from './validation-attributes.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-validation-error-handler',
  templateUrl: './validation-error-handler.component.html',
  styleUrls: ['./validation-error-handler.component.css']
})
export class ValidationErrorHandlerComponent implements OnInit {

  @Input()
  public validationFields: ValidationFieldsModel[];

  constructor() { }

  ngOnInit(): void {
  }

}
