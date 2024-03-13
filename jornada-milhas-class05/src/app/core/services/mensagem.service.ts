import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, {
      duration: this.durationInSeconds * 1000,
    });
  }

}
