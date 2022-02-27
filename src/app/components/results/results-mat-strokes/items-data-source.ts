import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { waitForAsync } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Results } from 'src/app/models/results';
import { StrokesService } from 'src/app/services/strokes.service';

// import { Item } from './item';
class Item {
  color: string;
  name: string;
  score: any[];
}

export class ItemsDataSource extends DataSource<Results> {

  constructor(private _strokesService: StrokesService) {
    super();
  }

  public connect(collectionViewer: CollectionViewer): Observable<Results[]> {
    return this._strokesService.matchResultSubject.asObservable();
  }

  public disconnect(collectionViewer: CollectionViewer): void {}

  // myData() {
  //   var a: Results[] = [];
  //   for (var i = 0; i < 10; i++) {
  //     a.push(new Results());

  //     a[i].name = 'name ' + i + 1;
  //     a[i].scores = [1, 2, 3, 4, 5, '6/7', '7xx', '8/' + i.toString(), 9, 10];
  //   }

  //   return of(a);
  // }
  //   class Item {
  //   color: string;
  //   name: string;
  //   score: any[];
  // }

  // export class ItemsDataSource extends DataSource<Item> {

  //   public connect(collectionViewer: CollectionViewer): Observable<Item[]> {
  //     return (this.myData())
  //   }

  //   public disconnect(collectionViewer: CollectionViewer): void {}

  //   myData(){

  //     var a: Item[] = [];
  //     for (var i = 0; i < 10; i++) {
  //       a.push(new Item());
  //       a[i].color = 'ff0000';
  //       a[i].name = 'name ' + i+1;
  //       a[i].score = [1,2,3,4,5,"6/7","7xx","8/"+i.toString(),9,10];
  //     }

  //     return of(a);
  //   }
}
