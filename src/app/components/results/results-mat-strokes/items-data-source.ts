import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { waitForAsync } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Results } from 'src/app/models/results';
import { StrokesService } from 'src/app/services/strokes.service';

export class ItemsDataSource extends DataSource<Results> {  //DataSource requires a connect and disconnect method

  constructor(private _strokesService: StrokesService) {   //injected service requires a call to super()
    super();
  }


  public connect(collectionViewer: CollectionViewer): Observable<Results[]> {  //connect method returns an observable of the data as a DataSource
    return this._strokesService.matchResultSubject.asObservable();             //data is a BehaviorSubject on strokes.service.ts.  Data is shaped in strokes service
  }

  public disconnect(collectionViewer: CollectionViewer): void {}
}
