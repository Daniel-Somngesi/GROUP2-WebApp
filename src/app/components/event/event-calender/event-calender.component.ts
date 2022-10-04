import { ActivatedRoute } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { EventService } from './../../../services/event.service';
import { Component, ViewChild, TemplateRef, } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ScheduleService } from 'src/app/services/schedules/schedule.service';
import { iEvent } from 'src/app/Interface/Interface';
import { SlotService } from 'src/app/services/slots/slot.service';
import { CustomErrorSnackBarComponent } from 'src/app/shared/components/custom-error-snack-bar/custom-error-snack-bar.component';
import { Company } from 'src/app/Interface/company.types';
import { CompanyService } from 'src/app/services/company/company.service';
import { ActivitiesService } from 'src/app/services/activities/activities.service';


@Component({
  selector: 'app-event-calender',
  styleUrls: ['./event-calender.component.css'],
  templateUrl: './event-calender.component.html',
})
export class EventCalenderComponent {
  displayProgressSpinner = false;
  companies: Company[] = [];

  academicYear: string = "";
  events!: CalendarEvent[];
  scheduleEntries: iEvent[] = [];
  refresh: Subject<any> = new Subject();

  @ViewChild('picker') picker: any;

  title!: string;

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  public eventForm!: FormGroup;
  activityFormGroup: FormGroup;
  minDate: any = new Date().toISOString().slice(0, 10);

  public slotForm!: FormGroup;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  visibleForm = '';
  activeDayIsOpen: boolean = true;
  start: any;
  end: any;

  constructor(
    private modal: NgbModal,
    public _eventService: EventService,
    private _scheduleService: ScheduleService,
    private _slotService: SlotService,
    private _companyService: CompanyService,
    private _activitiesServie: ActivitiesService,
    private formbulider: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this._activatedRoute.params.subscribe(params => {

      this.academicYear = params['academic-year'];
    });
  }

  ngOnInit(): void {
    this._getCompaniesFromServer();
    this._buildEventForm();
    this._buildSlotForm();
    this._buildActivityForm();
  }

  onShowAddForm(formToShow: string) {
    this.visibleForm = formToShow;
  }

  private _buildEventForm() {
    this.eventForm = this.formbulider.group({
      title: ['', [Validators.required, this.noWhitespaceValidator, Validators.pattern('[a-zA-Z ]*')]],
      start: [null, [Validators.required]],
      end: [null, [Validators.required]],
    });
  }

  private _buildSlotForm() {
    this.slotForm = this.formbulider.group({
      start: [null, [Validators.required]],
      end: [null, [Validators.required]],
    });
  }

  private _buildActivityForm() {
    this.activityFormGroup = this.formbulider.group({
      ActivityName: ['', [Validators.required, this.noWhitespaceValidator, Validators.pattern('[a-zA-Z ]*')]],
      CompanyId: ['', [Validators.required]],
      start: [null, [Validators.required]],
      end: [null, [Validators.required]],
    });
  }

  get ActivityName() { return this.activityFormGroup.get('ActivityName'); }
  get CompanyId() { return this.activityFormGroup.get('CompanyId'); }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  get g() {
    return this.eventForm.controls;
  }

  loopThroughEvents(res: any) {
    var obj: Array<any> = [];
    for (var i = 0; i < res.length; i++) {
      var event: Object = {
        id: res[i]['id'],
        title: res[i]['title'],
        repeating: res[i]['repeating'],
        start: new Date(res[i]['start']),
        end: new Date(res[i]['end']),
      }
      obj.push(event)
    }
    this.events = obj;
    this.refresh.next();
    this.displayProgressSpinner = false;
  }

  onCreateEvent() {

    let payload: any = {};
    payload['Title'] = this.title;
    payload['Start'] = this.start.toJSON();
    payload['End'] = this.end.toJSON();

    let valid = true;
    let currentDateTime = new Date().toJSON();

    if (this.end.toJSON() <= this.start.toJSON()) {
      this._openSnackBar("To date time should be greater than From date time", "Error", 3000);
      valid = false;
    }

    if (this.start.toJSON() < currentDateTime) {
      this._openSnackBar("From date time should be greater than current date time", "Error", 3000);
      valid = false;
    }

    if (this.end.toJSON() < currentDateTime) {
      this._openSnackBar("To date time should be greater than current date time", "Error", 3000);
      valid = false;
    }

    if (valid) {
      this._eventService.create(payload)
        .subscribe({
          next: (event => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }

            if (event.type === HttpEventType.Response) {
              this._openSnackBar("Add Event", "Success", 3000);
              this.displayProgressSpinner = false;
              window.location.reload();
            }
          }),
          error: (error => {
            this.displayProgressSpinner = false;
            this._openErrorMessageSnackBar(error.error.message);
          }),
          complete: () => {
            this.displayProgressSpinner = false;
          }
        });
    }
  }

  onCreateSlot() {
    let payload: any = {};
    payload['Title'] = 'Open Slot'; //This gets populated on the back end
    payload['Start'] = this.start.toJSON();
    payload['End'] = this.end.toJSON();

    let valid = true;
    let currentDateTime = new Date().toJSON();

    if (this.end.toJSON() <= this.start.toJSON()) {
      this._openSnackBar("To date time should be greater than From date time", "Error", 3000);
      valid = false;
    }

    if (this.start.toJSON() < currentDateTime) {
      this._openSnackBar("From date time should be greater than current date time", "Error", 3000);
      valid = false;
    }

    if (this.end.toJSON() < currentDateTime) {
      this._openSnackBar("To date time should be greater than current date time", "Error", 3000);
      valid = false;
    }

    if (valid) {
      this._slotService.create(payload)
        .subscribe({
          next: (event => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }

            if (event.type === HttpEventType.Response) {
              this._openSnackBar("Add Slot", "Success", 3000);
              this.displayProgressSpinner = false;
              window.location.reload();
            }
          }),
          error: (error => {
            this.displayProgressSpinner = false;
            this._openErrorMessageSnackBar(error.error.message);
          }),
          complete: () => {
            this.displayProgressSpinner = false;
          }
        });
    }

  }

  onCreateActivity() {
    let payload: any = {};
    payload['Name'] = this.ActivityName.value;
    payload['CompanyId'] = this.CompanyId.value;
    payload['Start'] = this.start.toJSON();
    payload['End'] = this.end.toJSON();

    let valid = true;
    let currentDateTime = new Date().toJSON();

    if (this.end.toJSON() <= this.start.toJSON()) {
      this._openSnackBar("To date time should be greater than From date time", "Error", 3000);
      valid = false;
    }

    if (this.start.toJSON() < currentDateTime) {
      this._openSnackBar("From date time should be greater than current date time", "Error", 3000);
      valid = false;
    }

    if (this.end.toJSON() < currentDateTime) {
      this._openSnackBar("To date time should be greater than current date time", "Error", 3000);
      valid = false;
    }

    if (valid) {
      this._activitiesServie.create(payload)
        .subscribe({
          next: (event => {
            if (event.type === HttpEventType.Sent) {
              this.displayProgressSpinner = true;
            }

            if (event.type === HttpEventType.Response) {
              this._openSnackBar("Add Activity", "Success", 3000);
              this.displayProgressSpinner = false;
              window.location.reload();
            }
          }),
          error: (error => {
            this.displayProgressSpinner = false;
            this._openErrorMessageSnackBar(error.error.message);
          }),
          complete: () => {
            this.displayProgressSpinner = false;
          }
        });
    }
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent: any) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
    ];

  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  private _getCalenderEntries() {
    return this._scheduleService.getAllEntriesByYear(this.academicYear)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            let res = event.body as iEvent[];
            this.scheduleEntries = res;
            this.loopThroughEvents(this.scheduleEntries);

          }
        },
        error: (error) => {
          this.displayProgressSpinner = false;
          this._openErrorMessageSnackBar(error.error.message);
        }
      });

  }

  private _getCompaniesFromServer() {
    this._companyService.getAll()
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            this.companies = event.body as Company[];
            this.displayProgressSpinner = false;
            this._getCalenderEntries();
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

  private _openSnackBar(message: string, action: string, _duration: number) {
    this._snackBar.open(message, action, {
      duration: _duration,
    });
  }

  private _openErrorMessageSnackBar(errorMessage: string) {
    const snackBar = this._snackBar.openFromComponent(CustomErrorSnackBarComponent, {
      data: {
        preClose: () => { snackBar.dismiss() },
        parent: errorMessage
      }
    });
  }
}
