import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Parent } from 'src/app/helpers/types/parent.types';
import { Child } from 'src/app/Interface/child.types';
import { ChildService } from 'src/app/services/child/child.service';
import { ParentService } from 'src/app/services/parent/parent.service';

@Component({
  selector: 'app-view-parent-child-details',
  templateUrl: './view-parent-child-details.component.html',
  styleUrls: ['./view-parent-child-details.component.css']
})
export class ViewParentChildDetailsComponent implements OnInit {

  parentEmail: string = "";
  parent: Parent = null;
  child: Child = null;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _parentService: ParentService,
    private _childService: ChildService
  ) {
    this._activatedRoute.params.subscribe(params => {
      this.parentEmail = params['email'];
    });

  }

  ngOnInit(): void {
    this._getParentFromServer();
  }

  private _getParentFromServer() {
    this._parentService.getByParentEmailAddress(this.parentEmail)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Parent;
            this.parent = res;
            this._getChildFromServer();
          }
        },
        error: (error) => {
        },
        complete: () => {
        }
      });
  }

  private _getChildFromServer() {
    this._childService.getByParentEmailAddress(this.parentEmail)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as Child;
            this.child = res;
          }
        },
        error: (error) => {
        },
        complete: () => {
        }
      });
  }

}
