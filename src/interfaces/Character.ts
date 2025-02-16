export interface Result {
  items: Character[]
  meta: Meta
  links: Links
}

export interface Character {
  id: number
  name: string
  ki?: string
  maxKi?: string
  race?: string
  gender?: string
  description: string
  image: string
  affiliation?: string
  transformations?: Transformation[];
}

export interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export interface Links {
  first: string
  previous: string
  next: string
  last: string
}

export interface Transformation {
  id: string;
  name: string;
  image: string;
  ki: string;
}