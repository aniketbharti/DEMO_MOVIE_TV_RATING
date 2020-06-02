import { Component, ElementRef, Renderer2, ViewEncapsulation, OnInit } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loaderSubscription: any;
  state: any;
  location: any;
  
  title = 'flockui';
  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderSubscription = this.loaderService.loaderListener().subscribe((res) => {
      this.state = res.state
      this.location = res.location
    })
  }
}
