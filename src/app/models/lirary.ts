export interface Example {
    id: string;
    text: string;
    translate: string
};

export interface Word {
    id: string;
    text: string;
    description : string | null;
    translate: string | null;
    examples: Example[];
}

export interface WordsCollection {
    id: string;
    title: string | null;
    language: string;
    words: Word[];
}

export interface WordsCollections {
    WordCollection: WordsCollection[];
}

export interface getWordCollectionsResponse {
    code: string
    data: WordsCollection[];
}