import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Issue, IssueServiceService } from '../issue-service.service'; 

@Component({
  selector: 'app-issue-display',
  templateUrl: './issue-display.component.html',
  styleUrls: ['./issue-display.component.css']
})
export class IssueDisplayComponent implements OnInit, OnDestroy {

  issues: Issue[] = [];
  private issueSubscription!: Subscription;

  constructor(public issueService: IssueServiceService) { }

  ngOnInit() {
    this.issueService.getissue_service();
    this.issueSubscription = this.issueService.getUpdateListener()
      .subscribe((issues: Issue[]) => {
        this.issues = issues;
      });
  }

  ngOnDestroy() {
    this.issueSubscription.unsubscribe();
  }

  ondelete(issueId: string) {
    this.issueService.deleteissue_service(issueId);
  }
}
