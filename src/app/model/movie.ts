export interface Movie {
    id: number;
    name?: string;
    shortName?: string;
    isWatched: boolean;
    dateWatched?: string;
    hideDateWatchedValue: boolean;
    hideDatePicker: boolean;
    dateAddedToWatched?: string;
}