import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { SearchMoviesComponent } from './search-movies/search-movies.component';

const routes: Routes = [
    { path: 'search', component: SearchMoviesComponent },
    { path: 'authenticate', component: AuthenticationComponent },
    { path: '', redirectTo: 'authenticate', pathMatch: 'full' },
    { path: 'movies/:id', component: MovieDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
