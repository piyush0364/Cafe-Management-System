import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../Service/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  constructor(public objs:CategoriesService){}

  ngOnInit(): void {
    this.objs.getCategoriesList();
 
  }
  fillData(selectedCL)
  {
   this.objs.cData=Object.assign({},selectedCL);
  }
  onDelete(categoryID)
  {
   if(confirm("Are you sure? you wanna delete this passport?"))
   {
     this.objs.deletePassport(categoryID).subscribe(
       res=>{this.objs.getCategoriesList()
         alert("Record Deleted!!!")
       },
      err=>{alert("Error!!!"+err);})
   }
  }

}