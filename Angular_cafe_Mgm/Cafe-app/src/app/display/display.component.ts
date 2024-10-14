import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../service/categories.service';
import { Categories } from '../Models/categories.model';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrl: './display.component.css'
})
export class DisplayComponent implements OnInit{


  constructor (public objs:CategoriesService){}
 
  ngOnInit(): void {
    this.objs.getCategoriesList();
  }
 

  fillData(selectedPP) {
    this.objs.cData = Object.assign({}, selectedPP);
  }

 
  
  onDelete(categories: Categories) {
    if (confirm("Are you sure? You want to delete this  Categories?")) {
        this.objs.deleteCategories(categories. CategoryId).subscribe(
            res => {
                this.objs.getCategoriesList(); // Refresh the list after deletion
                alert("Record Deleted!!!");
            },
            err => { alert("Error!!! " + err); }
        );
    }
}
 


}
