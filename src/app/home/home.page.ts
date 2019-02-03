import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { NotesService } from '../services/notes.service';
import { Note } from '../interfaces/note';
import { NavigationOptions } from '@ionic/angular/dist/providers/nav-controller';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private notesService: NotesService
  ) {}

  ngOnInit() {
    this.notesService.load();
  }

  addNote() {
    this.alertCtrl
      .create({
        header: 'New Note',
        message: 'What should the title of this note be?',
        inputs: [
          {
            type: 'text',
            name: 'title'
          }
        ],
        buttons: [
          {
            text: 'Cancel'
          },
          {
            text: 'Save',
            handler: data => {
              this.notesService.createNote(data.title);
            }
          }
        ]
      })
      .then(alert => {
        alert.present();
      });
  }

  directToScanner() {
    let url = `/qr-scanner`;
    let options: NavigationOptions = {
      animated: true,
      animationDirection: 'forward'
    };
    this.navCtrl.navigate(url, options);
  }

  directToDetail(note: Note) {
    let id = note.id;
    let url = `/notes/${id}`;
    let options: NavigationOptions = {
      animated: true,
      animationDirection: 'forward'
    };
    this.navCtrl.navigate(url, options);
  }
}
