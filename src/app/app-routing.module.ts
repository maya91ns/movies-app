import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { RouteGuardsGuard } from './route-guards/route-guards.guard';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { WatchedMoviesComponent } from './watched-movies/watched-movies.component';

const routes: Routes = [
    { 
      path: 'search', 
      canActivate: [RouteGuardsGuard],
      component: SearchMoviesComponent
    },
    { 
      path: 'authenticate', 
      // canActivate: [RouteGuardsGuard],
      component: AuthenticationComponent 
    },
    // { 
    //   path: '', 
    //   redirectTo: 'authenticate', 
    //   pathMatch: 'full' 
    // },
    { 
      path: 'movies/:id', 
      canActivate: [RouteGuardsGuard],
      component: MovieDetailComponent 
    },
    { 
      path: 'watched', 
      canActivate: [RouteGuardsGuard],
      component: WatchedMoviesComponent 
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
