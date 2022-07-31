import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users :any = null;

    constructor(private authenticationService: AuthenticationService) {}

    ngOnInit() {
        // this.authenticationService.getAll()
        //     .pipe(first())
        //     .subscribe((users:any) => this.users = users);
    }

    deleteUser(id: string) {
        // const user = this.users.find((x:any) => x.id === id);
        // user.isDeleting = true;
        // this.authenticationService.delete(id)
        //     .pipe(first())
        //     .subscribe(() => this.users = this.users.filter((x:any) => x.id !== id));
    }
}
