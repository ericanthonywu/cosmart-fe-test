export interface Books {
    key: string;
    title: string;
    authors: string;
    editionCount: string;
}

export interface GetBooksRequest {
    page: number;
    limit: number;
    genre: string;
}