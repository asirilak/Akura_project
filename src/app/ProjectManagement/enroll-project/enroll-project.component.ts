import { Component, OnInit } from '@angular/core';

import { EnrollProject } from '../../model/enroll-project';
import { ProjectService } from '../../services/project.service';
import { ToApply } from 'src/app/model/to-apply';

@Component({
  selector: 'app-enroll-project',
  templateUrl: './enroll-project.component.html',
  styleUrls: ['./enroll-project.component.css']
})
export class EnrollProjectComponent implements OnInit {

  myDate = new Date();
  districts: any;
  searchData = {district:-1,date:null};
  show = false;

  toapplys:ToApply[];

  enroll_projectModel = new EnrollProject(null,null);

  constructor(
    private _projectService: ProjectService,
    
  ) { }

  ngOnInit() {
    this._projectService. districtGetService().subscribe(
      ress => {
        this.districts = ress;
        //console.log(this.districts);
      },
      error => {
        if (error.status == 404) {
          //console.log(error);
        }
      }
    );

    this._projectService.allProjectService().subscribe(
      ress => {
        console.log(ress);
        this.toapplys = ress;
        this.show = false;
      },
      error=>{
        this.show = true;
      }
      
      );
  }

  onSearch(){
    console.log(this.searchData);
    this._projectService.projectSearchService(this.searchData).subscribe( 
      ress => {
        //response code
        console.log(ress);
        if(ress.length==0){
          this.show = true;
          this.toapplys = ress;
        }else{
          this.toapplys = ress;
          this.show = false;
        }
      });
  }

}
