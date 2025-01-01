import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faEye, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { WordsCollection } from '../models/lirary';
import { LibraryService } from '../services/library.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-word-list',
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './word-list.component.html',
  styleUrl: './word-list.component.css'
})
export class WordListComponent implements OnInit {
  constructor(private library: LibraryService) { }
  
  faPenToSquare = faPenToSquare;
  faEye = faEye;
  faTrash = faTrash;
  faPlus = faPlus;

  wordsCollections: WordsCollection[] = [];
  selectedWordsCollection: WordsCollection | null = null;

  private Reload() {
    this.library.getWordCollections().subscribe((response) => {
      this.wordsCollections = response.data;
      if (this.wordsCollections.length > 0) {
        this.selectedWordsCollection = this.wordsCollections[0];
      }
    });
  }

  ngOnInit(): void {
    this.Reload();
  }
}
