export interface Movie {
    id: number;
    name?: string;
    isWatched: boolean;
    dateWatched?: string;
    hideDateWatchedValue: boolean;
    hideDatePicker: boolean;
    dateAddedToWatched?: string;
}