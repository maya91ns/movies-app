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
  }

  removeFromWatched(movieId: number) {
    // this.movies.forEach(movie => {
    //   if(movie.id == movieId)
    //   {
    //     movie.isWatched = false;
    //     movie.hideDateWatchedValue = true;
    //     movie.hideDatePicker = true;
    //     this.watchedMovies.filter(function(ele){ 
    //       return ele != movie; 
    //   });
    //   }
    // })
  }

  removeFromArray() {

  }

  onBack(): void {
    this.router.navigate(['/search']);
  }
}
