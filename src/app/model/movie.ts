export interface Movie {
    id: number;
    name?: string;
    isWatched: boolean;
    watched?: string;
    dateWatched?: Date;
    dateAddedToWatched?: Date;
}