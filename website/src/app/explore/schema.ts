export interface Classification {
  kingdom?: string;
  phylum?: string;
  subphylum?: string;
  class?: string;
  order?: string;
  family?: string;
  genus?: string;
  species?: string;
  subspecies?: string;
}

export interface Image {
    id: string;
    default: string;
    original?: string;
    square?: string;
    small?: string;
    medium?: string;
    large?: string;
}

export interface Name {
    common?: string;
    sci?: string;
    locale?: {
        en: string;
    }
}

export interface SearchResult {
    id: any;
    name: Name;
    image: Image;
}