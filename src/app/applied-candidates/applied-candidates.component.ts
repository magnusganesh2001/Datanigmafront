import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applied-candidates',
  templateUrl: './applied-candidates.component.html',
  styleUrls: ['./applied-candidates.component.scss']
})
export class AppliedCandidatesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'phone', 'email', 'resume'];
  dataSource = [];

  constructor() { }

  ngOnInit(): void {
  }

}
