import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../model/movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})

export class MovieDetailComponent implements OnInit {
  pageTitle = 'Movie detail';
  movie: any;
  movies: Movie[] = [];
  showEditButton = true;
  watchedMovies: Movie[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getMovie(id);
    }
  }

  getMovie(movieId: number): void {
    if(localStorage.getItem(`movies:${localStorage.getItem("apiKey")}`) !== null)
    {
      this.movies = JSON.parse(localStorage.getItem(`movies:${localStorage.getItem("apiKey")}`) as string);
      this.movies.forEach(element => {
        if(element.id == movieId)
        {
          this.movie = element;
        }
      });
    }
    this.http.get<any>(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${localStorage.getItem("apiKey")}&language=en-US`)
    .subscribe(data => {
      this.movie.originalLanguage = data.original_language;
      this.movie.overview = data.overview;
      this.movie.popularity = data.popularity;
      this.movie.releaseDate = new Date(data.release_date).toDateString();
      this.movie.genres = '';
      this.populateGenres(data.genres);
    })
  }

  populateGenres(genres: any): any {
    let counter = genres.length;
    genres.forEach(genre => {
      if(counter != 1) {
        this.movie.genres += genre.name + " | ";
        counter--;
      }
      else {
        this.movie.genres += genre.name;
      }
    });
  }

  editDateWatched(): void {
    if(this.movie != undefined)
    {
      this.movie.isWatched = true;
      this.showEditButton = false;
      localStorage.setItem(`movies:${localStorage.getItem("apiKey")}`, JSON.stringify(this.movies));
    }
  }

  pickDate(event: any): void {
    if(this.movie != undefined)
    {
      this.movie.dateWatched = new Date(event.target.value).toDateString();
      this.movie.dateAddedToWatched = new Date(Date.now()).toDateString();
      this.showEditButton = true;
      this.movie.hideDateWatchedValue = false;
      localStorage.setItem(`movies:${localStorage.getItem("apiKey")}`, JSON.stringify(this.movies));
    }
    this.editDateWatchedInWatchedMovies();
  }

  editDateWatchedInWatchedMovies() {
    if(localStorage.getItem(`watchedMovies:${localStorage.getItem("apiKey")}`) !== null) 
    {
      this.watchedMovies = JSON.parse(localStorage.getItem(`watchedMovies:${localStorage.getItem("apiKey")}`));
    }
    this.watchedMovies.forEach(movie => {
      if(movie.id = this.movie.id)
      {
        movie.dateWatched = this.movie.dateWatched;
        movie.dateAddedToWatched = this.movie.dateAddedToWatched;
      }
    })
    localStorage.setItem(`watchedMovies:${localStorage.getItem("apiKey")}`, JSON.stringify(this.watchedMovies));
  }

  onBack(): void {
    this.router.navigate(['/search']);
  }
}
 

