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

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.createSessionId();
    this.createMoviesList();
    this.populateMovies();
  }

  createSessionId() {
    this.http.post<any>(`https://api.themoviedb.org/3/authentication/session/new?api_key=${localStorage.getItem("apiKey")}`, 
    {
      "request_token": localStorage.getItem("requestToken")
    })
    .subscribe(data => {
        this.sessionId = data.session_id;
    })
    localStorage.setItem("sessionId", this.sessionId);
  }

  createMoviesList() {
    this.http.post<any>(`https://api.themoviedb.org/3/list?api_key=${localStorage.getItem("apiKey")}`, 
    {
      "name": "Movies",
      "description": "List of movies",
      "language": "en"
    })
    .subscribe(data => {
        this.listId = data.list_id;
    })
    localStorage.setItem("listId", this.listId);
  }

  populateMovies() {
    for(var i = 1; i <= 3; i++){
      this.http.post<any>(`https://api.themoviedb.org/3/list/${this.listId}/add_item?api_key=${localStorage.getItem("apiKey")}`, 
      {
        "id": i,
        "media_id": i,
        "name": `Harry Potter ${i}`
      })
      this.movies.push({id: i, name: `Harry Potter ${i}`, isWatched: false})
      this.movies.forEach(element => {
        if(element.isWatched)
        {
          element.watched = "YES";
        }
        else
        {
          element.watched = "NO";
        }  
      });
      localStorage.setItem("movies", JSON.stringify(this.movies));
    }
  }

  searchMovie(event: any){
    this.movies.forEach(element => {
      if(element.name?.toLowerCase().includes(event.target.value.toLowerCase()))
      {
        if(element.isWatched)
        {
          element.watched = "YES";
        }
        else
        {
          element.watched = "NO";
        }       
        this.matchedMovies.push({id: element.id, name: element.name, isWatched: element.isWatched, watched: element.watched});
      }
    });
  }

  seeMovieDetails(movieId: number) {
    this.router.navigate(['/movies', movieId]);
  }

  addToWatched(movieId: number) {
    this.matchedMovies.forEach(element => {
      if(element.id == movieId)
      {
        element.isWatched = true;
      }
    })
    //localStorage.setItem("movies", JSON.stringify(this.movies));
  }

  pickDate(event: any) {
    
  }
}
