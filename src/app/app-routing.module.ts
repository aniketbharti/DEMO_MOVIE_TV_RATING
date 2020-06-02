import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './screens/base-layout.component';
import { HomeComponent } from './screens/home/home.component';
import { PlpPageComponent } from './screens/plp-page/plp-page.component';
import { PdpPageComponent } from './screens/pdp-page/pdp-page.component';
import { MyRatedMoviesListComponent } from './screens/my-rated-movies-list/my-rated-movies-list.component';
import { AuthGuard } from './gaurds/auth.guard';


const routes: Routes = [
  {
    path: '', component: BaseLayoutComponent, children: [
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'search', component: PlpPageComponent
      },
      {
        path: 'movie-description', component: PdpPageComponent
      },
      {
        path: 'my-rated', component: MyRatedMoviesListComponent, canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
