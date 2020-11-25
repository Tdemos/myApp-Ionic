import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { DetailsMoviePage } from '../details-movie/details-movie';



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

    public movies = new Array<any>();
    public loading;
    public refresh;
    public isRefresh;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private movieProvider: MovieProvider,
        public loadingController: LoadingController
    ) {
    }

    openLoading() {
        this.loading = this.loadingController.create({
            content: 'Please wait...'
        });

        this.loading.present();

    }

    closeLoading() {
        this.loading.dismiss();
    }

    doRefresh(refresh) {

        this.refresh = refresh;
        this.isRefresh = true;

        this.loadMovies();
    }

    loadMovies() {
        this.openLoading();
        this.movieProvider.getLastMovies().subscribe(data => {
            const response = data as any;

            this.movies = response.results;

            this.closeLoading();
            if (this.refresh) {
                this.refresh.complete();
                this.isRefresh = false;
            }

        }, error => {
            console.log(error);

            this.closeLoading();
            if (this.refresh) {
                this.refresh.complete();
                this.isRefresh = false;
            }
        }
        )

    }

    goToDetails(movie) {
        this.navCtrl.push(DetailsMoviePage, { id: movie.id });
    }

    ionViewDidEnter() {
        this.loadMovies();
    }

}
