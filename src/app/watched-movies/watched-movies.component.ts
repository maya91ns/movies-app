import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../model/movie';

@Component({
  selector: 'app-watched-movies',
  templateUrl: './watched-movies.component.html',
  styleUrls: ['./watched-movies.component.scss']
})
export class WatchedMoviesComponent implements OnInit {
  title = 'watched movies';
  watchedMovies: Movie[] = [];
  movies: Movie[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem(`watchedMovies:${localStorage.getItem("apiKey")}`) !== null) 
    {
      this.watchedMovies = JSON.parse(localStorage.getItem(`watchedMovies:${localStorage.getItem("apiKey")}`));
    }
    if(localStorage.getItem(`movies:${localStorage.getItem("apiKey")}`) !== null) 
    {
      this.movies = JSON.parse(localStorage.getItem(`movies:${localStorage.getItem("apiKey")}`));
    }
  }

  onSelectSortOption(event: any) { 
    var selectedIndex = (<HTMLSelectElement>document.getElementById("selectSortOptionId")).selectedIndex;
    if(selectedIndex == 0){
      this.watchedMovies.sort((a, b) => (a.name > b.name) ? 1 : -1);
    }
    else if(selectedIndex == 1){
      this.watchedMovies.sort((a, b) => (a.name < b.name) ? 1 : -1);
    }
    else if(selectedIndex == 2){
      this.watchedMovies.sort((a, b) => (new Date(a.dateWatched) > new Date(b.dateWatched)) ? 1: -1);
    }
    else if(selectedIndex == 3){
      this.watchedMovies.sort((a, b) => (new Date(a.dateWatched) < new Date(b.dateWatched)) ? 1 : -1);
    }
    else if(selectedIndex == 4){
      this.watchedMovies.sort((a, b) => (new Date(a.dateAddedToWatched) > new Date(b.dateAddedToWatched)) ? 1 : -1);
    }
    else if(selectedIndex == 5){
      this.watchedMovies.sort((a, b) => (new Date(a.dateAddedToWatched) < new Date(b.dateAddedToWatched)) ? 1 : -1);
    }
  }

  removeFromWatched(movieId: number) {
    this.movies.forEach(movie => {
      if(movie.id == movieId)
      {
        movie.dateWatched = null;
        movie.dateAddedToWatched = null;
        movie.isWatched = false;
        movie.hideDateWatchedValue = true;
        movie.hideDatePicker = true;
        this.removeMatching(movieId);    
      }
    })
    localStorage.setItem(`movies:${localStorage.getItem("apiKey")}`, JSON.stringify(this.movies));
    localStorage.setItem(`watchedMovies:${localStorage.getItem("apiKey")}`, JSON.stringify(this.watchedMovies));
  }

  removeMatching(movieId: number) {
    let index = 0;
    let counter = 0;
    this.watchedMovies.forEach(movie => {
      if(movie.id == movieId)
      {
        index = counter;
      }
      counter++;
    });
    this.watchedMovies.splice(index, 1);
  }

  seeDetails(movieId: number) {
    this.router.navigate([`/movies/${ movieId}`]);
  }

  onBack(): void {
    this.router.navigate(['/search']);
  }
}
