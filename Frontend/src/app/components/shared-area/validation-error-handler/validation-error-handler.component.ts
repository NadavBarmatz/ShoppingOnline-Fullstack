import { Component, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-validation-error-handler',
  templateUrl: './validation-error-handler.component.html',
  styleUrls: ['./validation-error-handler.component.css']
})
export class ValidationErrorHandlerComponent {

  @Input()
  public fieldName: NgModel;

  @Input() 
  public minLength: string;

  @Input() 
  public maxLength: string;

  @Input() 
  public min: string;

  @Input() 
  public max: string;

}
