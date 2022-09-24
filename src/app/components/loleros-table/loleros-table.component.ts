import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { IMarjalero } from 'src/app/models/IMarjalero';
import { RiotApiService } from 'src/app/services/riot-api.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const marjalerosList: IMarjalero[] = [
  {name: 'Tosti', usernames: ['Tostadora1'], gameStatus: 'test'},
  {name: 'Berni', usernames: ['0 8'], gameStatus: 'test'},
  {name: 'Gushi', usernames: ['Lillia Kuryakin'], gameStatus: 'test'},
  {name: 'Fercho', usernames: ['Ferchito'], gameStatus: 'test'},
  {name: 'Covo', usernames: ['Questo é Boca'], gameStatus: 'test'},
  {name: 'Tosti', usernames: ['Tostadora1'], gameStatus: 'test'},
  {name: 'More', usernames: ['Quien se lo d1ce'], gameStatus: 'test'},
  {name: 'Bera', usernames: ['Quien se lo dice'], gameStatus: 'test'},
];

/**
 * @title Table with sorting
 */
 @Component({
  selector: 'app-loleros-table',
  templateUrl: './loleros-table.component.html',
  styleUrls: ['./loleros-table.component.scss']
})
export class LolerosTableComponent implements AfterViewInit {
  public displayedColumns: string[] = ['name', 'usernames', 'status'];
  public dataSource = new MatTableDataSource(marjalerosList);

  constructor(private _liveAnnouncer: LiveAnnouncer, private _riotApi :RiotApiService) {}

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;

    for(const marjalero of marjalerosList) {
      const marjaleroStatus = this._riotApi.getGameStatus(marjalero.usernames[0]);
      marjalero.gameStatus = marjaleroStatus;

    }
  }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
