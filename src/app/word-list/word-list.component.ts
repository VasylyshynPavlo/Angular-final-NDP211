import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPenToSquare, faEye, faTrash, faPlus, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Word, WordsCollection } from '../models/lirary';
import { LibraryService } from '../services/library.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-word-list',
  imports: [FontAwesomeModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './word-list.component.html',
  styleUrl: './word-list.component.css'
})
export class WordListComponent implements OnInit {
  constructor(private library: LibraryService, private modalService: NgbModal) { }

  faPenToSquare = faPenToSquare;
  faEye = faEye;
  faTrash = faTrash;
  faPlus = faPlus;
  editableWord: any = {};

  wordsCollections: WordsCollection[] = [];
  selectedWordsCollection: WordsCollection | null = null;

  openViewWordModal(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  openEditWordModal(content: TemplateRef<any>, word: Word) {
    // Копіюємо дані слова, щоб редагування не змінювало об'єкт до збереження
    this.editableWord = { ...word };
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  saveWord(modal: any) {
    if (this.selectedWordsCollection !== null) {
      const index = this.selectedWordsCollection.words.findIndex(w => w.id === this.editableWord.id);
      if (index !== -1) {
        // Оновлення слова в колекції
        this.selectedWordsCollection.words[index] = { ...this.editableWord };
      }
      console.log('Saved word:', this.editableWord);

      // Закриття модального вікна
      modal.close();
    } else {
      console.error('No collection selected');
    }
  }

  addExample() {
    if (!this.editableWord.examples) {
      this.editableWord.examples = [];
    }
    this.editableWord.examples.push({ id: Date.now(), text: '', translate: '' });
  }
  
  removeExample(index: number) {
    if (this.editableWord.examples) {
      this.editableWord.examples.splice(index, 1);
    }
  }

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

  editWord(word: Word) {

  }

  viewWord(word: Word) {

  }

  async deleteWord(word: Word) {
    let response: boolean = true;

    if (this.selectedWordsCollection !== null && this.selectedWordsCollection.id !== null) {
      this.library.deleteWord(this.selectedWordsCollection.id, word.id);
    }

    if (response === true && this.selectedWordsCollection !== null) {
      this.selectedWordsCollection.words = this.selectedWordsCollection.words.filter(w => w.id !== word.id);
    } else {
      console.error('Cannot delete this word!');
    }
  }
}
