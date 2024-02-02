import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

// Define an interface for the Issue
export interface Issue {
  _id: string;
  title: string;
  description: string;
  department: string;
  // Any additional properties like __v if needed
}

@Injectable({
  providedIn: 'root'
})
export class IssueServiceService {

  private issues: Issue[] = [];
  private issuesUpdated = new Subject<Issue[]>();

  constructor(private http: HttpClient) { }

  addissue_service(issueData: { title: string, description: string, department: string }) {
    this.http.post<{ message: string, issue: Issue }>('http://localhost:3000/api/issues', issueData)
      .subscribe({
        next: (responseData) => {
          this.issues.push(responseData.issue);
          this.issuesUpdated.next([...this.issues]);
          // Handle successful response, e.g., display a success message
        },
        error: (error) => {
          // Handle errors here, e.g., display an error message
          console.error('Error adding issue:', error);
        }
      });
  }

  getissue_service() {
    this.http.get<{ message: string, issues: Issue[] }>('http://localhost:3000/api/issues')
      .subscribe((responseData) => {
        this.issues = responseData.issues;
        this.issuesUpdated.next([...this.issues]);
      });
  }

  deleteissue_service(issueId: string) {
    this.http.delete<{ message: string }>('http://localhost:3000/api/issues/' + issueId)
      .subscribe(() => {
        const updatedIssues = this.issues.filter(issue => issue._id !== issueId);
        this.issues = updatedIssues;
        this.issuesUpdated.next([...this.issues]);
      });
  }

  getUpdateListener() {
    return this.issuesUpdated.asObservable();
  }
}