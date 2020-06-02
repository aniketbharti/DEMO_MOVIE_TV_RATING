import { Subject, Observable } from 'rxjs';
import { LoaderDataModel } from '../global-model/loader.data.model';

export class LoaderService {
  loaderSubject: Subject<any>;
  
  constructor() {
    this.loaderSubject = new Subject();
  }
  
  changeLoaderState(loaderOptions:LoaderDataModel) {
    this.loaderSubject.next(loaderOptions);
  }

  loaderListener(): Observable<any> {
    return this.loaderSubject.asObservable();
  }
}

