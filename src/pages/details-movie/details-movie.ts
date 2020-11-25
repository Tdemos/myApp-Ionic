import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';


/**
 * Generated class for the DetailsMoviePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-details-movie',
	templateUrl: 'details-movie.html',
	providers: [
		MovieProvider
	]
})
export class DetailsMoviePage {

	public movie;
	public movieId;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private movieProvider: MovieProvider
	) {
	}


	loadMovies(movieId) {

		this.movieProvider.getMovieDetails(movieId).subscribe(data => {

			this.movie = data;

		}, error => {
			console.log(error);
		}
		)
	}


	ionViewDidEnter() {
		this.movieId = this.navParams.get('id');

		this.loadMovies(this.movieId);

	}

}
