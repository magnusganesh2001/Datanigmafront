import { Component, OnInit } from '@angular/core';
import { AngularFileUploaderModule } from "angular-file-uploader";

@Component({
  selector: 'app-modal-resume',
  templateUrl: './modal-resume.component.html',
  styleUrls: ['./modal-resume.component.scss']
})
export class ModalResumeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  afuConfig = {
    uploadAPI: {
      url:"https://example-file-upload-api"
    }
    
};
}
