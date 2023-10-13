import { Component } from '@angular/core';
import {ActivatedRoute, Params, Router } from '@angular/router';
import { disconnectionService } from '../disconnection.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-view-disconnection',
  templateUrl: './view-disconnection.component.html',
  styleUrls: ['./view-disconnection.component.scss']
})
export class ViewDisconnectionComponent {
  disconnectionId: any;
  discuser: any;
  consumer: any;
  dataList: any;
  loading: boolean;
  chh: any;
  ReadOnlyStyleGuideNotes: boolean;
  
  constructor(private _service: disconnectionService,private router: Router,private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.ReadOnlyStyleGuideNotes = true;
    this.chh="checked";
    this.viewDisconnection();
   this.route.params.subscribe((params: Params) => {
      this.disconnectionId = params['id'];
    });
    this. _service.getDisconnectionById(this.disconnectionId).subscribe((data) => {
      this.discuser = data.data['name'];
      this.consumer ="("+ data.data['consumerNo'] +")";
  });

  this.loading = true;
  this. _service.viewDisconnectionById(this.disconnectionId).subscribe((data) => {
    if(data){
      this.dataList = data.data;
      this.loading = false;
    }
});

  }
  handleBack() {
    this.router.navigate(['/apps/disconnection']);
  }
  windowFeatures = [
    // "toolbar=no",
    // "location=no",
    // "directories=no",
    // "status=no",
    // "menubar=no",
    // "scrollbars=no",
    // "resizable=no",
    // "copyhistory=no",
    // "chrome=on"
  ];
  downloadPDF() {
    window.open(`${environment.apiUrl}v1/downloadDisconnection/spdcl/` + this.disconnectionId,"Independent Window",
      this.windowFeatures.join()
    );
  }

viewDisconnection(){
 
}

}
