import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EventService } from './../../../services/event.service';
import { Component, ViewChild, TemplateRef,} from '@angular/core';
import { isSameDay, isSameMonth} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-event-calender',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }
      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  templateUrl: './event-calender.component.html',
})
export class EventCalenderComponent {

  events!: CalendarEvent[];
  refresh: Subject<any> = new Subject();

  @ViewChild('picker') picker: any;

  title!: string;

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  public eventForm!: FormGroup;
  minDate:any = new Date().toISOString().slice(0, 10);

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
        this.events = this.events.filter((iEvent:any) => iEvent !== event);
        this.handleEvent('Deleted', event);

      },
    },
  ];

  message:string = 'meeeeee';

  activeDayIsOpen: boolean = true;
  start: any;
  end: any;

  constructor(private modal: NgbModal, private router:Router, public service: EventService, private formbulider: FormBuilder, private http:HttpClient,  private _snackBar: MatSnackBar) {}

  ngOnInit(): void {

    this.getCalendarEvents();

    this.eventForm = this.formbulider.group({
      title: ['', [Validators.required, this.noWhitespaceValidator, Validators.pattern('[a-zA-Z ]*')]],
      start: [null, [Validators.required]],
      end: [null, [Validators.required ]],
    })
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  get g(){
    return this.eventForm.controls;
  }

  loopThroughEvents(res:any){
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

  getCalendarEvents() {
    return this.service.getAllEvents()
      .subscribe( data => {
        this.loopThroughEvents(data);
      })
  }

  addNewEvent() {
    this.newEvent.title = this.title;
    this.newEvent.start = this.start;
    this.newEvent.end = this.end;
    this.events.push(this.newEvent);
    this.service.createEvent(this.newEvent);
    window.location.reload();
  }

  newEvent:any = {
    title: '',
    start: new Date(),
    end: new Date(),

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
    this.events = this.events.map((iEvent:any) => {
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

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event:any) => event !== eventToDelete);
    this.service.deleteEvent(eventToDelete.id);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
