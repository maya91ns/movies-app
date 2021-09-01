import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MoviePickDateWatchedModalComponent } from './movie-pick-date-watched-modal/movie-pick-date-watched-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchMoviesComponent,
    AuthenticationComponent,
    MovieDetailComponent,
    MoviePickDateWatchedModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
