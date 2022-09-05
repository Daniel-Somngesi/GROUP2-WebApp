import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsumablesService {
  endpointBase = environment.apiUrl;
  headers = {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }

  constructor(private _httpClient: HttpClient) {
  }

  getAllReceivedConsumables() {
    return this._httpClient.get(
      this.endpointBase.concat("Consumables/ReceiveConsumables/All"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  getAllRequestedConsumablesByChildId(childId:number) {
    return this._httpClient.get(
      this.endpointBase.concat("Consumables/RequestedConsumables/" + childId),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  getAllRequestedConsumables() {
    return this._httpClient.get(
      this.endpointBase.concat("Consumables/RequestedConsumables/All"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  getAllConsumables() {
    return this._httpClient.get(
      this.endpointBase.concat("Consumables"),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  createConsumable(payload: any) {
    return this._httpClient.post(
      this.endpointBase.concat("Consumables"), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  addRequestedConsumables(payload: any) {
    return this._httpClient.post(
      this.endpointBase.concat("Consumables/RequestedConsumables"), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  receiveConsumables(payload: any) {
    return this._httpClient.post(
      this.endpointBase.concat("Consumables/ReceiveConsumables"), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  updateConsumable(id: number, payload: any) {
    return this._httpClient.put(
      this.endpointBase.concat("Consumables/" + id), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

  deleteConsumable(id: number) {
    return this._httpClient.delete(
      this.endpointBase.concat("Consumables/" + id),
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }
}
