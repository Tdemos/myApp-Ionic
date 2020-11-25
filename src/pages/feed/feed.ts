import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-feed',
    templateUrl: 'feed.html',
    providers: [
        MovieProvider
    ]
})
export class FeedPage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private movieProvider: MovieProvider
    ) {
    }

    public movies = new Array<any>();

    public nome_usuario: string = "Cassio Glay";

    ionViewDidLoad() {

        this.movieProvider.getLastMovies().subscribe(data => {
            const response = data as any;

            this.movies = response.results;

            console.log(this.movies);

        }, error => {
            console.log(error);
        }
        )
    }

}
