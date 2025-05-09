import { Component, HostListener } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { evaluate } from 'mathjs';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  //styleUrls: [: './calculator.component.scss'
})
export class CalculatorComponent {
  expression = '';
  buttons = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '+', '%'];

  constructor(private dialogRef: MatDialogRef<CalculatorComponent>) {}

  append(value: string) {
    this.expression += value;
  }

  clear() {
    this.expression = '';
  }

  calculate() {
    try {
      this.expression = evaluate(this.expression).toString();
    } catch {
      this.expression = 'Error';
    }
  }

  close() {
    this.dialogRef.close();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyPress(event: KeyboardEvent) {
    const key = event.key;

    if (/\d|[\+\-\*\/%\.]/.test(key)) {
      this.append(key);
    } else if (key === 'Enter') {
      this.calculate();
    } else if (key === 'Backspace') {
      this.expression = this.expression.slice(0, -1);
    } else if (key === 'Escape') {
      this.close();
    }
  }
}
