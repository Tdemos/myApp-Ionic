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
    public page = 1;
    public infiniteScroll;

    public loading;
    public refresh;
    public isRefresh: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private movieProvider: MovieProvider,
        public loadingController: LoadingController
    ) {
    }


    loadMovies(newPage: boolean = false) {
        this.openLoading();
        this.movieProvider.getLastMovies(this.page).subscribe(data => {
            const response = data as any;

            if (newPage) {

                this.movies = this.movies.concat(response.results);
                this.infiniteScroll.complete();

            } else {

                this.movies = response.results;

            }

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

    loadMoreMovies(infiniteScroll) {
        this.page++;
        this.infiniteScroll = infiniteScroll;
        this.loadMovies(true);

        infiniteScroll.complete();

        /*  setTimeout(() => {
           console.log('Done');
           event.complete();
     
           // App logic to determine if all data is loaded
           // and disable the infinite scroll
           if (this.movies.length == 20) {
             event.disabled = true;
           }
         }, 500); */
    }

    goToDetails(movie) {
        this.navCtrl.push(DetailsMoviePage, { id: movie.id });
    }

    ionViewDidEnter() {
        this.loadMovies();
    }

}
