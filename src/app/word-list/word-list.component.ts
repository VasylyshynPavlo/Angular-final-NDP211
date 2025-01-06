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
  createWordsCollection: { language: string, title: string } = { language: 'null', title: 'null' };
  addWord_: { text: string, description: string, translate: string } = { text: 'null', description: 'null', translate: 'null' };

  wordsCollections: WordsCollection[] = [];
  selectedWordsCollection: WordsCollection | null = null;

  openViewWordModal(content: TemplateRef<any>) {
    this.modalService.open(content);
  }

  openEditWordModal(content: TemplateRef<any>, word: Word) {
    this.editableWord = { ...word };
    this.modalService.open(content);
  }

  openCreateCollectionModal(content: TemplateRef<any>) {
    this.modalService.open(content)
  }

  openAddWordModal(content: TemplateRef<any>) {
    this.modalService.open(content)
  }

  saveWord(modal: any) {
    if (this.selectedWordsCollection !== null) {
      let transformedExamples: any = {}
      const index = this.selectedWordsCollection.words.findIndex(w => w.id === this.editableWord.id);
      if (index !== -1) {
        transformedExamples = this.editableWord.examples.map((example: any) => ({
          text: example.text,
          translate: example.translate
        }));
        this.selectedWordsCollection.words[index] = { ...this.editableWord };
      }

      this.library.replaceExamples(this.selectedWordsCollection.id, this.editableWord.id, transformedExamples);
      this.library.editWord(this.selectedWordsCollection.id, this.editableWord.id, this.editableWord.text, this.editableWord.translate, this.editableWord.description);

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

  async createCollection(modal: any) {
    await this.library.createWordsCollection(this.createWordsCollection.language, this.createWordsCollection.title);
    modal.close();
    this.Reload();
  }

  async deleteWordsCollection() {
    if (this.selectedWordsCollection !== null)
      await this.library.deleteWordsCollection(this.selectedWordsCollection?.id);
    this.selectedWordsCollection = this.wordsCollections.length > 0 ? this.wordsCollections[0] : null;
    this.Reload();
  }

  private Reload() {
    this.selectedWordsCollection = null;
    setTimeout(() => {
      this.library.getWordCollections().subscribe((response) => {
        this.wordsCollections = response.data;

        if (this.wordsCollections.length > 0) {
          this.selectedWordsCollection = this.wordsCollections[0];
        }
      });
    });
  }

  async addWord(modal: any) {
    if (this.selectedWordsCollection !== null)
      await this.library.addWord(this.selectedWordsCollection?.id, this.addWord_.text, this.addWord_.description, this.addWord_.translate);
    modal.close();

    this.Reload();
  }

  ngOnInit(): void {
    this.Reload();
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
