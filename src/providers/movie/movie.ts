import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {

	private baseURL = 'https://api.themoviedb.org/3';
	private api_key = 'b0f1758f74da527597687df873402870';

	constructor(public http: HttpClient) {
		console.log('Hello MoovieProvider Provider');
	}

	getLastMovies() {
		return this.http.get(this.baseURL + '/movie/popular?api_key=' + this.api_key);
	}

}
