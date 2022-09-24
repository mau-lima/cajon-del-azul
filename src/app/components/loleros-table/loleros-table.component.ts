import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { concatMap } from 'rxjs';
import { IMarjalero } from 'src/app/models/IMarjalero';
import { RiotApiService } from 'src/app/services/riot-api.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const marjalerosList: IMarjalero[] = [
  { name: 'Fercho', username: 'Ferchito', gameStatus: 'Cargando...' },
  { name: 'Tosti', username: 'Tostadora1', gameStatus: 'Cargando...' },
  { name: 'Berni', username: '0 8', gameStatus: 'Cargando...'},
  { name: 'Gushi', username: 'Lillia Kuryakin', gameStatus: 'Cargando...'},
  { name: 'Covo', username: 'Questo é Boca', gameStatus: 'Cargando...'},
  { name: 'More', username: 'Quien se lo d1ce', gameStatus: 'Cargando...'},
  { name: 'Bera', username: 'Quien se lo dice', gameStatus: 'Cargando...'},
  { name: 'Yama', username: 'Y4MA', gameStatus: 'Cargando...'},
  { name: 'Burro', username: 'yo se lo digo', gameStatus: 'Cargando...'},
];

/**
 * @title Table with sorting
 */
@Component({
  selector: 'app-loleros-table',
  templateUrl: './loleros-table.component.html',
  styleUrls: ['./loleros-table.component.scss'],
})
export class LolerosTableComponent implements AfterViewInit {
  public displayedColumns: string[] = ['name', 'username', 'status'];
  public dataSource = new MatTableDataSource(marjalerosList);
  public whatever = {};

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _riotApi: RiotApiService
  ) {}

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this._riotApi.getTest().subscribe((result) => (this.whatever = result));

    for (const marjalero of marjalerosList) {
      this._riotApi
        .getIdByUsername(marjalero.username)
        .pipe(
          concatMap((usernameResult: any) => {
            console.log('llego el usernamresult');
            console.log(usernameResult);
            marjalero.riotId = usernameResult.id;
            return this._riotApi.getGameStatus(usernameResult.id);
          })
        )
        .subscribe({
          next: (userStatus: any) => {
            console.log(userStatus);
            if (userStatus && userStatus.gameId) {
              const now = new Date().getTime();
              const timeElapsed =
                (now - (userStatus.gameStartTime || now)) / (1000 * 60);
              marjalero.gameStatus = `💀 Jugando al Lol hace ${timeElapsed} minutos`;
            }
          },
          error: (error) => {
            console.log(error);
            marjalero.gameStatus = 'No parece estar jugando al Lol =)';
          },
          complete: () => console.info('complete'),
        });
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
