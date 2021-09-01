import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  title = 'movies-app';
  placeholderText = "Please enter API key";
  requestToken = '';
  buttonClickCounter = 0;
  sessionId = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  authenticate(): void {
    const apiKey = (<HTMLInputElement>document.getElementById("appKeyInputId")).value;
    localStorage.setItem("apiKey", apiKey);

    this.http.get<any>(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`).subscribe(data => {
        this.requestToken = data.request_token;
    })
    localStorage.setItem("requestToken", this.requestToken);

    this.buttonClickCounter++;
    
    if( this.requestToken!= '' || this.buttonClickCounter == 2 )
    {
      window.location.href = `https://www.themoviedb.org/authenticate/${this.requestToken}?redirect_to=http://localhost:61928/search`;
    }
  }
}
