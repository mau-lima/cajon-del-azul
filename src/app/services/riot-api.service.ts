import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RiotApiService {
  private riotApiKey = ''; //APIKEY HERE
  private riotUrl = 'https://la2.api.riotgames.com/lol/';

  constructor(private http: HttpClient) {}

  getGameStatus(riotId: string) {
    return this.http.get(this.riotUrl + 'spectator/v4/active-games/by-summoner/'+ encodeURI(riotId), {
      params: {
        api_key: this.riotApiKey
      },
    });
  }

  getIdByUsername(riotUsername: string) {
    return this.http.get(this.riotUrl + 'summoner/v4/summoners/by-name/' + encodeURI(riotUsername), {
      params: {
        api_key: this.riotApiKey
      },
    });
  }
}
