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

  removeFromWatched(movieId: number) {
    this.movies.forEach(movie => {
      if(movie.id == movieId)
      {
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

  onBack(): void {
    this.router.navigate(['/search']);
  }
}
