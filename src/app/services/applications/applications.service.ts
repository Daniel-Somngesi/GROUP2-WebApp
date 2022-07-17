import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  endpointBase = environment.endpointBase;

  constructor(private _httpClient: HttpClient) {
  }


  getAll() {
    return this._httpClient.get(
      this.endpointBase.concat("Applications/All"),
      { reportProgress: true, observe: 'events' }
    );
  }

  accept(applicationId:number){
    return this._httpClient.get(
      this.endpointBase.concat("Applications/Accept/"+applicationId),
      { reportProgress: true, observe: 'events' }
    );
  }

  rejected(applicationId:number){
    return this._httpClient.get(
      this.endpointBase.concat("Applications/Reject/"+applicationId),
      { reportProgress: true, observe: 'events' }
    );
  }

}
