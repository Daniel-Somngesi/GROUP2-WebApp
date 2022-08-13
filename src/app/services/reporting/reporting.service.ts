  getApplications(payload) {
    return this._httpClient.post(
      this.endpointBase.concat("Reporting/Applications"), payload,
      { reportProgress: true, observe: 'events', headers: this.headers }
    );
  }

}
