import { HttpService } from './services/http.service';
import { AppMaterialModule } from './app.material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BaseLayoutComponent } from './screens/base-layout.component';
import { PdpPageComponent } from './screens/pdp-page/pdp-page.component';
import { HomeComponent } from './screens/home/home.component';
import { PlpPageComponent } from './screens/plp-page/plp-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MoviesDbService } from './services/movies-db.service';
import { LoaderService } from './services/loader.service';
import { ErrorHttpServiceClass } from './services/error.http.service';
import { RequestInterceptor } from './interceptors/request.interceptors';
import { CorouselGridComponent } from './components/corousel-grid/corousel-grid.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MoviesCardComponent } from './components/movies-card/movies-card.component';
import { TrimLengthPipe } from './pipes/trim.length.pipe';
import { NgbModule, NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { LoginModalComponent } from './login-modal/login-modal.component';
import { UserDataService } from './services/user.data.service';
import { MyRatedMoviesListComponent } from './screens/my-rated-movies-list/my-rated-movies-list.component';
import { AuthGuard } from './gaurds/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    PdpPageComponent,
    HomeComponent,
    PlpPageComponent,
    FooterComponent,
    LoaderComponent,
    ModalComponent,
    CorouselGridComponent,
    MoviesCardComponent,
    TrimLengthPipe,
    LoginModalComponent,
    MyRatedMoviesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    SlickCarouselModule,
    NgbModule, NgbPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    HttpService,
    MoviesDbService,
    LoaderService,
    ErrorHttpServiceClass,
    UserDataService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent, LoginModalComponent]
})
export class AppModule { }
