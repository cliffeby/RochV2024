import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { waitForAsync } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Results } from 'src/app/models/results';
import { Strokes1Service } from 'src/app/services/strokes1.service';

export class SCDataSource extends DataSource<Results> {
         // DataSource requires a connect and disconnect method

         constructor(public _strokes1Service: Strokes1Service) {
           // injected service requires a call to super()
           super();
         }
         public SCSubject = new BehaviorSubject(null); //Shaped datastore for the dataSource table
         public loadingSubject = new BehaviorSubject<boolean>(false);

         // tslint:disable-next-line: max-line-length
         public connect(
           collectionViewer: CollectionViewer
         ): Observable<Results[]> {
           // connect method returns an observable of the data as a DataSource
           // tslint:disable-next-line: max-line-length
           return this._strokes1Service.matchResultSubject.asObservable(); // data is a BehaviorSubject on strokes.service.ts.  Data is shaped in strokes service
         }

         public disconnect(collectionViewer: CollectionViewer): void {}

         loadLessons(x) {
           // this.loadingSubject.next(true);

           this.SCSubject.next(x);
         }
       }
