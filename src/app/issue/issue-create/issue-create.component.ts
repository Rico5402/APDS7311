import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IssueServiceService } from '../issue-service.service';

@Component({
  selector: 'app-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.css']
})
export class IssueCreateComponent {
  
  constructor(public issueservice: IssueServiceService) { }

  onaddissue(issueform: NgForm) {
    if (issueform.invalid) {
      // You may want to display a more user-friendly error message or use form validation feedback
      alert('Invalid form! Please fill all required fields correctly.');
      return;
    }
    // Assume addissue_service takes an object with title, description, and department properties
    this.issueservice.addissue_service({
      title: issueform.value.title,
      description: issueform.value.description,
      department: issueform.value.department
    });
    issueform.resetForm(); // Reset the form after successful submission
  }
}
