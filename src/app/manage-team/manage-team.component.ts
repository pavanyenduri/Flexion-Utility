import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage-team',
  templateUrl: './manage-team.component.html',
  styleUrls: ['./manage-team.component.scss']
})
export class ManageTeamComponent implements OnInit {

  team: String;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('/.netlify/functions/team',
      {}).subscribe(response => {
        console.log('this is the response from backend', JSON.stringify(response));
        this.team = JSON.stringify(response);
      });
  }

}
