import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RiotApiService {

  constructor() { }

  getGameStatus(riotUsername: string) {
    console.log(' om!')
    return 'zapallo';

  }
}
