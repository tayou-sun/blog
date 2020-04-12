import { Component, OnInit } from '@angular/core';
import { faBlog, faUser, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { NewPostDialogComponent } from '../new-post-dialog/new-post-dialog.component';
import { MatDialog } from '@angular/material/dialog';
declare var $: any;
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  entryComponents:[
    NewPostDialogComponent
  ]
})
export class MenuComponent implements OnInit {

  faBlog = faBlog;
  faUser = faUser;
  faPlusCircle = faPlusCircle;

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  onNewPostClicked() {
    const dialogRef = this.dialog.open(NewPostDialogComponent, {
      width: '450px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}

