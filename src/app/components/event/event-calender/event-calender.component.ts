import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { EventService } from './../../../services/event.service';
import { Component, ViewChild, TemplateRef, } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ScheduleService } from 'src/app/services/schedules/schedule.service';
import { iEvent } from 'src/app/Interface/Interface';


@Component({
  selector: 'app-event-calender',
  styleUrls: ['./event-calender.component.css'],
  templateUrl: './event-calender.component.html',
})
export class EventCalenderComponent {
  academicYear: string = "";
  events!: CalendarEvent[];
  scheduleEntries: iEvent[] = [];
  refresh: Subject<any> = new Subject();

  @ViewChild('picker') picker: any;

  title!: string;

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  public eventForm!: FormGroup;
  minDate: any = new Date().toISOString().slice(0, 10);

  public slotForm!: FormGroup;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent: any) => iEvent !== event);
        this.handleEvent('Deleted', event);

      },
    },
  ];

  activeDayIsOpen: boolean = true;
  start: any;
  end: any;

  constructor(
    private modal: NgbModal,
    public _eventService: EventService,
    private _scheduleService: ScheduleService,
    private formbulider: FormBuilder,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.params.subscribe(params => {

      this.academicYear = params['academic-year'];
    });
  }

  ngOnInit(): void {

    this._getCalenderEntries();

    this._buildEventForm();
    this._buildSlotForm();
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

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  get g() {
    return this.eventForm.controls;
  }

  _getCalenderEntries() {
    return this._scheduleService.getAllEntriesByYear(this.academicYear)
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Sent) {
            // this.displayProgressSpinner = true;
          }
          if (event.type == HttpEventType.Response) {
            let res = event.body as iEvent[];
            this.scheduleEntries = res;
            this.loopThroughEvents(this.scheduleEntries);

          }
        },
        error: (error) => {
          // this.displayProgressSpinner = false;
        },
        complete: () => {
          // this.displayProgressSpinner = false;
        }
      });

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
  }

  addNewEvent() {
    let newEvent: any = {
      title: '',
      start: new Date(),
      end: new Date(),

    }

    newEvent.title = this.title;
    newEvent.start = this.start;
    newEvent.end = this.end;

    this.events.push(newEvent);

    let payload: any = {};
    payload['Title'] = this.title;
    payload['Start'] = this.start.toJSON();
    payload['End'] = this.end.toJSON();

    this._eventService.createEvent(payload).subscribe({
      next: (event => {
        if (event.type === HttpEventType.Sent) {
        }

        if (event.type === HttpEventType.Response) {
          this.addEvent()
          window.location.reload();
        }
      }),
      error: (error => {

      })
    });

  }

  onCreateSlot() {
    let newEvent: any = {
      title: '',
      start: new Date(),
      end: new Date(),

    }

    newEvent.title = this.title;
    newEvent.start = this.start;
    newEvent.end = this.end;

    this.events.push(newEvent);

    let payload: any = {};
    payload['Title'] = 'Open Slot'; //This gets populated on the back end
    payload['Start'] = this.start.toJSON();
    payload['End'] = this.end.toJSON();

    this._eventService.createSlot(payload).subscribe({
      next: (event => {
        if (event.type === HttpEventType.Sent) {
        }

        if (event.type === HttpEventType.Response) {
          this.addEvent()
          window.location.reload();
        }
      }),
      error: (error => {

      })
    });

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

  deleteEvent(entryToDelete: any) {

    let calenderEvent = entryToDelete as CalendarEvent;
    let scheduleEntry = entryToDelete as iEvent;
    this.events = this.events.filter((event: any) => event !== calenderEvent);

    //Call the correct entry point to delete a schedule entry
    if (scheduleEntry.type.toLowerCase() == 'Slot'.toLowerCase()) {

    }
    if (scheduleEntry.type.toLowerCase() == 'Event'.toLowerCase()) {
      this._eventService.deleteEvent(scheduleEntry.id);
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
