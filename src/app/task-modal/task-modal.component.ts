import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterDataService } from '../master-data.service'; // Import the master data service

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements OnInit {
  @Input() task: any;
  masterProjects: any[] = []; // Array to hold master projects
  masterActivities: any[] = []; // Array to hold master activities

  constructor(
    private dataService: DataService,
    private masterDataService: MasterDataService, // Inject the master data service
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    if (!this.task) {
      this.task = {
        id: null,
        slno: null,
        projectId: null,
        activityId: null,
        starttime: "",
        endtime: "",
        status: "",
        priority: 0,
        remarks: "",
        important: false
      };
    }

    // Fetch the master data for projects
    this.masterDataService.getMasterProjects().subscribe(
      (projects: any[]) => {
        this.masterProjects = projects;
      },
      (error: any) => {
        console.error('Error fetching master projects:', error);
      }
    );

    // Fetch the master data for activities
    this.masterDataService.getMasterActivities().subscribe(
      (activities: any[]) => {
        this.masterActivities = activities;
      },
      (error: any) => {
        console.error('Error fetching master activities:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.task.id) {
      this.dataService.updateTask(this.task).subscribe(
        () => {
          this.activeModal.close('Task updated');
        },
        (error: any) => {
          console.error('Error updating task:', error);
        }
      );
    } else {
      this.dataService.createTask(this.task).subscribe(
        () => {
          this.activeModal.close('Task created');
        },
        (error: any) => {
          console.error('Error creating task:', error);
        }
      );
    }
  }
}
