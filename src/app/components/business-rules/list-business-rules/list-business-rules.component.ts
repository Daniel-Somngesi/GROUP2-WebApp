import { HttpEventType } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { BsModalRef, ModalDirective, BsModalService } from 'ngx-modal-bootstrap';
import { BusinessRule } from 'src/app/Interface/business-rules.types';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { BusinessRulesService } from 'src/app/services/business-rules/business-rules.service';
import { MixpanelService } from 'src/app/services/mixpanel/mixpanel.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { AddBusinessRuleComponent } from '../add-business-rule/add-business-rule.component';
import { DeleteBusinessRuleComponent } from '../delete-business-rule/delete-business-rule.component';
import { UpdateBusinessRuleComponent } from '../update-business-rule/update-business-rule.component';

@Component({
  selector: 'app-list-business-rules',
  templateUrl: './list-business-rules.component.html',
  styleUrls: ['./list-business-rules.component.css']
})
export class ListBusinessRulesComponent implements OnInit {
  displayProgressSpinner = false;
  dataSource;

  displayedColumns: string[] = ['name', 'description', 'value', 'actions'];

  rules: BusinessRule[] = [];
  rule: BusinessRule;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  idleState = 'Not started.';
  timedOut = false;
  timeOutValue = null;
  timeValue
  lastPing?: Date = null;
  public modalRef: BsModalRef;
  @ViewChild('childModal', { static: false }) childModal: ModalDirective;

  constructor(
    private _matSnackBar: MatSnackBar,
    private _matDialog: MatDialog,
    private _businessRulesService: BusinessRulesService,
    private idle: Idle, private keepalive: Keepalive,
    private router: Router,
    private modalService: BsModalService,
    private _authService: AuthService,
    private _mixpanel: MixpanelService
  ) {
    this._mixpanel.track("View Settings")
    this._getTimeOut();
    this._getDataFromServer();

    setTimeout(() => {
      this.timeValue = this.timeOutValue;
      this.prepTimer();
    }, 5000);



  }

  ngOnInit(): void {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAdd() {
    let dialogRef = this._matDialog.open(AddBusinessRuleComponent, {
      width: "900px",
      height: "auto"
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    })
  }

  onUpdateValue(value: BusinessRule) {
    let dialogRef = this._matDialog.open(UpdateBusinessRuleComponent, {
      width: "80%",
      height: "auto",
      data: {
        record: value
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    });
  }

  onDeleteValue(value: BusinessRule) {
    let dialogRef = this._matDialog.open(DeleteBusinessRuleComponent, {
      width: "80%",
      height: "auto",
      data: {
        record: value
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      this._getDataFromServer();
    });
  }

  logout(): void {
    this._authService.signOut();
  }

  private _getDataFromServer() {
    this._businessRulesService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as BusinessRule[];
            this.rules = res;
            this.dataSource = new MatTableDataSource<BusinessRule>(this.rules);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
            this.displayProgressSpinner = false;

          }
        },
        error: (error) => {
          this.displayProgressSpinner = false;
          this._openErrorMessageSnackBar(error.error.message);
        },
        complete: () => {
          this.displayProgressSpinner = false;
        }
      });
  }

  private _getTimeOut() {
    this._businessRulesService.getTimeOut()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            const res = event.body as number;
            this.timeOutValue = res;
            console.log(this.timeOutValue);

          }
        },
        error: (error) => {
          this.displayProgressSpinner = false;
          this._openErrorMessageSnackBar(error.error.message);
        },
        complete: () => {
          this.displayProgressSpinner = false;
        }
      });
  }

  openSnackBar(message: string, action: string) {
    this._matSnackBar.open(message, action, {
      duration: 2000,
    });
  }

  private _openErrorMessageSnackBar(errorMessage: string) {
    const snackBar = this._matSnackBar.openFromComponent(CustomErrorSnackBarComponent, {
      data: {
        preClose: () => { snackBar.dismiss() },
        parent: errorMessage
      }
    });
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  stay() {
    this.childModal.hide();
    this.reset();
  }

  prepTimer() {
    // sets an idle timeout of 5 seconds, for testing purposes.
    this.idle.setIdle(this.timeValue);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.'
      console.log(this.idleState);
      this.reset();
    });

    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      this._authService.signOut();
    });

    this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!'
      console.log(this.idleState);
      this.childModal.show();
    });

    this.idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!'
      console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    this.keepalive.interval(15);

    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }


}


