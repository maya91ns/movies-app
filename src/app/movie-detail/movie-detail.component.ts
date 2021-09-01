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
  errorMessage = '';
  movie: Movie | undefined;
  movies: Movie[] = []
  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getMovie(id);
    }
  }

  getMovie(movieId: number): void {
    this.movies = JSON.parse(localStorage.getItem("movies") as string);
    this.movies.forEach(element => {
      if(element.id == movieId)
      {
        this.movie = element;
      }
    });
  }

  onBack(): void {
    this.router.navigate(['/search']);
  }
}
