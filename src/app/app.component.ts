import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskModalComponent } from './task-modal/task-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
       <div class="container" [attr.inert]="isModalOpen ? true : null">
      <button class="btn btn-success" (click)="openModal()">Add Task</button>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th style="background-color: red;">Important and Urgent</th>
            <th style="background-color: orange;">Important but Not Urgent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <table class="table" border="2px solid black" style="margin-bottom: 40px;width:750px;">
                <thead>
                  <tr style="background-color: lightgray;">
                    <th>sl.NO</th>
                    <th>Project</th>
                    <th>Activity</th>
                    <th>Starttime</th>
                    <th>Endtime</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of importantUrgent; let i = index" class="blue-background" (dblclick)="onTaskDoubleClick(item)">
                    <td>{{getSerialNumber(i, 'importantUrgent')}}</td>
                    <td>{{item.project}}</td>
                    <td>{{item.activity}}</td>
                    <td>{{item.starttime}}</td>
                    <td>{{item.endtime}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.priority}}</td>
                    <td>{{item.remarks}}</td>
                    <td>
                      <button class="btn btn-danger" (click)="deleteTask(item.id)">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td>
              <table class="table" border="2px solid black" style="margin-bottom: 20px;width:600px">
                <thead>
                  <tr style="background-color: lightgray;">
                    <th>sl.NO</th>
                    <th>Project</th>
                    <th>Activity</th>
                    <th>Starttime</th>
                    <th>Endtime</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of importantNotUrgent; let i = index" style="background-color: blue;" (dblclick)="onTaskDoubleClick(item)">
                    <td>{{getSerialNumber(i, 'importantNotUrgent')}}</td>
                    <td>{{item.project}}</td>
                    <td>{{item.activity}}</td>
                    <td>{{item.starttime}}</td>
                    <td>{{item.endtime}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.priority}}</td>
                    <td>{{item.remarks}}</td>
                    <td>
                      <button class="btn btn-danger" (click)="deleteTask(item.id)">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr style="background-color: blueviolet;">
            <th style="background-color: greenyellow;">Not Important but Urgent</th>
            <th style="background-color: green;">Not Important and Not Urgent</th>
          </tr>
          <tr>
            <td>
              <table class="table" border="2px solid black" style="margin-bottom: 30px;width:750px">
                <thead>
                  <tr style="background-color: lightgray;">
                    <th>sl.NO</th>
                    <th>Project</th>
                    <th>Activity</th>
                    <th>Starttime</th>
                    <th>Endtime</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of notImportantUrgent; let i = index" style="background-color: blue;" (dblclick)="onTaskDoubleClick(item)">
                    <td>{{getSerialNumber(i, 'notImportantUrgent')}}</td>
                    <td>{{item.project}}</td>
                    <td>{{item.activity}}</td>
                    <td>{{item.starttime}}</td>
                    <td>{{item.endtime}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.priority}}</td>
                    <td>{{item.remarks}}</td>
                    <td>
                      <button class="btn btn-danger" (click)="deleteTask(item.id)">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td>
              <table class="table" border="2px solid black" style="width: 600px;">
                <thead>
                  <tr style="background-color: lightgray;">
                    <th>sl.NO</th>
                    <th>Project</th>
                    <th>Activity</th>
                    <th>Starttime</th>
                    <th>Endtime</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let item of notImportantNotUrgent; let i = index" style="background-color: blue;" (dblclick)="onTaskDoubleClick(item)">
                    <td>{{getSerialNumber(i, 'notImportantNotUrgent')}}</td>
                    <td>{{item.project}}</td>
                    <td>{{item.activity}}</td>
                    <td>{{item.starttime}}</td>
                    <td>{{item.endtime}}</td>
                    <td>{{item.status}}</td>
                    <td>{{item.priority}}</td>
                    <td>{{item.remarks}}</td>
                    <td>
                      <button class="btn btn-danger" (click)="deleteTask(item.id)">Delete</button>
                    </td>
                  </tr>
                </tbody>
  `,
  styles: [`
    /* In your component's styles (app.component.css or app.component.scss) */
.blue-background {
  background-color: blue !important;
}
  `]
})
export class AppComponent implements OnInit {
  title = 'angular-http-example';
  data: any[] = [];
  importantUrgent: any[] = [];
  importantNotUrgent: any[] = [];
  notImportantUrgent: any[] = [];
  notImportantNotUrgent: any[] = [];
  isModalOpen: boolean = false;

  constructor(private dataService: DataService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.dataService.getData().subscribe(
      (response: any) => {
        console.log('Fetched Data:', response);
        this.data = response;
        this.divideTasks();                 
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  divideTasks(): void {
    const currentDate = new Date();
    this.importantUrgent = this.data.filter(task => task.important && this.isUrgent(task.endtime, currentDate));
    this.importantNotUrgent = this.data.filter(task => task.important && !this.isUrgent(task.endtime, currentDate));
    this.notImportantUrgent = this.data.filter(task => !task.important && this.isUrgent(task.endtime, currentDate));
    this.notImportantNotUrgent = this.data.filter(task => !task.important && !this.isUrgent(task.endtime, currentDate));
  }

  isUrgent(endtime: string, currentDate: Date): boolean {
    const endTime = new Date(endtime);
    const timeDiff = endTime.getTime() - currentDate.getTime();
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff <= 7; // Considering tasks with end date within 7 days as urgent
  }

  openModal(task?: any): void {
    this.isModalOpen = true;
    const modalRef = this.modalService.open(TaskModalComponent);
    modalRef.componentInstance.task = task ? { ...task } : null;
    modalRef.result.then(
      result => {
        if (result === 'Task updated' || result === 'Task created') {
          this.loadTasks();
        }
        this.isModalOpen = false;
      },
      reason => {
        console.log('Dismissed');
        this.isModalOpen = false;
      }
    );
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.dataService.deleteTask(id).subscribe(
        () => {
          console.log('Task deleted');
          this.loadTasks();
        },
        (error: any) => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }

  onTaskDoubleClick(task: any): void {
    this.openModal(task);
  }

  getSerialNumber(index: number, arrayName: string): number {
    switch(arrayName) {
      case 'importantUrgent':
        return index + 1;
      case 'importantNotUrgent':
        return index + 1;
      case 'notImportantUrgent':
        return index + 1;
      case 'notImportantNotUrgent':
        return index + 1;
      default:
        return index + 1;
    }
  }
}
