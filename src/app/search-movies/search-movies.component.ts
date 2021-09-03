import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '../model/movie';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})
export class SearchMoviesComponent implements OnInit {
  title = 'search movies';
  placeholderText = "Enter movie name";
  sessionId = '';
  listId = '';
  movies: Movie[] = [];
  matchedMovies: Movie[] = [];
  searchString = '';
  totalResults = 0;
  results: any[] = [];
  success = 0;
  watchedMovies: Movie[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem(`movies:${localStorage.getItem("apiKey")}`) !== null)
    {
      this.movies = JSON.parse(localStorage.getItem(`movies:${localStorage.getItem("apiKey")}`) as string);
    }
    else
    {
      this.createSessionId();
    }
    if(localStorage.getItem(`searchString:${localStorage.getItem("apiKey")}`) !== null)
    {
      this.searchString = localStorage.getItem(`searchString:${localStorage.getItem("apiKey")}`);
      (<HTMLInputElement>document.getElementById("searchInputId")).value = this.searchString;
      this.movies.forEach(movie => {
        if(movie.name?.toLowerCase().includes(this.searchString))
        {      
          this.matchedMovies.push({id: movie.id, name: movie.name, 
            shortName: movie.name.length > 30 ? movie.name?.substring(0, 30) + "..." : movie.name, 
            isWatched: movie.isWatched, dateWatched: movie.dateWatched, dateAddedToWatched: movie.dateAddedToWatched,
            hideDateWatchedValue: movie.hideDateWatchedValue, hideDatePicker: movie.hideDatePicker});
        }
      });
    }
    if(localStorage.getItem(`watchedMovies:${localStorage.getItem("apiKey")}`) !== null) 
    {
      this.watchedMovies = JSON.parse(localStorage.getItem(`watchedMovies:${localStorage.getItem("apiKey")}`));
    }
  }

  createSessionId() {
    this.http.post<any>(`https://api.themoviedb.org/3/authentication/session/new?api_key=${localStorage.getItem("apiKey")}`, 
    {
      "request_token": localStorage.getItem("requestToken")
    })
    .subscribe(data => {
        this.sessionId = data.session_id;
        localStorage.setItem("sessionId", this.sessionId);
        this.createMoviesList();
    })
  }

  createMoviesList() {
    this.http.post<any>(`https://api.themoviedb.org/3/list?api_key=${localStorage.getItem("apiKey")}&session_id=${localStorage.getItem("sessionId")}`, 
    {
      "name": "Movies",
      "description": "List of movies",
      "language": "en"
    })
    .subscribe(data => {
        this.listId = data.list_id;
        localStorage.setItem("listId", this.listId);
        this.populateMovies();
    })
  }

  populateMovies() {
    for (let i = 1; i < 11; i++) {
      this.http.post<any>(`https://api.themoviedb.org/3/list/${localStorage.getItem("listId")}/add_item?api_key=e51c419bb4879a7be2478ff225c19029&session_id=${localStorage.getItem("sessionId")}`, 
      {
        "media_id": i
      }).subscribe(data => {
        this.success = data.status_code; 
        if(i == 10)
        {
          this.populateLocalStorage();
        }
      }) 
    }
  }

  populateLocalStorage() {
    this.http.get<any>(`https://api.themoviedb.org/4/list/${localStorage.getItem("listId")}?page=1&api_key=${localStorage.getItem("apiKey")}`)
    .subscribe(data => {
      this.results = data.results;
      this.results.forEach(movie => {
        this.movies.push({id: movie.id, name: movie.title, 
          shortName: movie.title.length > 30 ? movie.title?.substring(0, 30) + "..." : movie.title, 
          isWatched: false, hideDateWatchedValue: true, hideDatePicker: true})
      })
      this.movies.sort((a, b) => (a.name > b.name) ? 1 : -1);
      localStorage.setItem(`movies:${localStorage.getItem("apiKey")}`, JSON.stringify(this.movies));
    })
  }

  searchMovie(event: any){
    this.matchedMovies = [];
    this.searchString = event.target.value.toLowerCase();
    localStorage.setItem(`searchString:${localStorage.getItem("apiKey")}`, this.searchString);
    this.movies.forEach(movie => {
      if(movie.name?.toLowerCase().includes(this.searchString))
      {      
        this.matchedMovies.push({id: movie.id, name: movie.name, 
          shortName: movie.name.length > 30 ? movie.name?.substring(0, 30) + "..." : movie.name, 
          isWatched: movie.isWatched, dateWatched: movie.dateWatched, dateAddedToWatched: movie.dateAddedToWatched,
          hideDateWatchedValue: movie.hideDateWatchedValue, hideDatePicker: movie.hideDatePicker});
      }
    });
  }

  addToWatched(movieId: number) {
    this.matchedMovies.forEach(movie => {
      if(movie.id == movieId)
      {
        movie.isWatched = true;
        movie.hideDatePicker = false;
      }
    })
    this.movies.forEach(movie => {
      if(movie.id == movieId)
      {
        movie.isWatched = true;
        movie.hideDatePicker = false;
      }
    })
  }

  pickDate(event: any, movieId: number) {
    this.matchedMovies.forEach(movie => {
      if(movie.id == movieId)
      {
        movie.dateWatched = new Date(event.target.value).toDateString();
        movie.hideDateWatchedValue = false;
        movie.hideDatePicker = true;
      }
    })
    this.movies.forEach(movie => {
      if(movie.id == movieId)
      {
        movie.dateWatched = new Date(event.target.value).toDateString();
        movie.dateAddedToWatched = new Date(Date.now()).toDateString();
        movie.hideDateWatchedValue = false;
        movie.hideDatePicker = true;
        this.watchedMovies.push(movie);
      }
    })
    localStorage.setItem(`movies:${localStorage.getItem("apiKey")}`, JSON.stringify(this.movies));
    this.watchedMovies.sort((a, b) => (a.name > b.name) ? 1 : -1);
    localStorage.setItem(`watchedMovies:${localStorage.getItem("apiKey")}`, JSON.stringify(this.watchedMovies));
  }

  seeWatchedMovies() {
    this.router.navigate(['/watched']);
  }

  seeDetails(movieId: number) {
    this.router.navigate([`/movies/${ movieId}`]);
  }
}
