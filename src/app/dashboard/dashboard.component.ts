import { Component, OnInit } from '@angular/core';
import { Thread } from '../models/thread';
import { Response } from '../models/Response';
import { DataService } from '../Services/data.service';
import { AuthService } from '../Services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    threads: Thread[] = [];
    thread: Thread;
    searchTerm: String;
    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.getAllThreads().pipe(first()).subscribe(data => {
            this.threads = data.threads;
        });

        // this.dataService.getOneThread().subscribe(thread => {
        //     this.thread = thread;
        // });
    }

}
