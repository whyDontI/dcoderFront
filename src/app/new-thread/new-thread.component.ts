import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { DataService } from '../Services/data.service';

@Component({
  selector: 'app-new-thread',
  templateUrl: './new-thread.component.html',
  styleUrls: ['./new-thread.component.css']
})
export class NewThreadComponent implements OnInit {

  newThreadForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  tags: Array<string> = [];
  newTag: string;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
  ) { }


  ngOnInit() {
    this.newThreadForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.returnUrl = (this.route.snapshot.queryParams['returnUrl'] || '/dashboard');

  }

  get f() { return this.newThreadForm.controls; }

  addToTags() {
    this.tags.push(this.newTag);
    this.newTag = ""
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.newThreadForm.invalid) {
      return;
    }

    this.loading = true;
    
    this.dataService.addNewThread(this.f.title.value, this.f.description.value, this.tags)
      .pipe(first())
      .subscribe(
        data => {
          // console.log("component.ts DATA =====> ", data)
          console.log(data.message);
          this.message = data.message;
          // this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          this.error = error;
          this.loading = false;
        });

  }

}
