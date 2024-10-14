import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../service/categories.service';
// import { AuthService } from '../../Service/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
 


  constructor (public objService:CategoriesService){

  }
  ngOnInit(): void {
    this.resetForm();
  }



  resetForm(form?:NgForm){
    
    if(form != null){
      form.form.reset();
    }else{
      this.objService.cData={CategoryId:0,Name:'',ImageUrl:'',IsActive:'',CreatedDate:''}
    }
  }

  onSubmit(form: NgForm)
  {
    if(this.objService.cData.CategoryId==0){
      this.insertRecord(form);
    }else{
      this.updateCategories(form);
    }
  }


 updateCategories(form:NgForm){
   this.objService.updateCategories().subscribe(res => {
     this.resetForm(form);
     alert('Categories Updation Success');
     this.objService.getCategoriesList();
   },
   err => {alert('Error !!!' + err);}
 )
 }

 insertRecord(form: NgForm) {
  //  this.objService.cData = form.value; // Set cData from the form values
   this.objService.createCategories().subscribe(res => {
     this.resetForm(form);
     alert('New Categories Creation Success');
     this.objService.getCategoriesList(); // Refresh the list
   },
   err => {
     alert('Error: ' + err);
   });
 }



  

  // ngOnInit(): void {
  //   this.objs.getCategoriesList();
 
  // }
  // fillData(selectedCL)
  // {
  //  this.objs.cData=Object.assign({},selectedCL);
  // }
  // onDelete(categoryID)
  // {
  //  if(confirm("Are you sure? you wanna delete this passport?"))
  //  {
  //    this.objs.deleteCategories(categoryID).subscribe(
  //      res=>{this.objs.getCategoriesList()
  //        alert("Record Deleted!!!")
  //      },
  //     err=>{alert("Error!!!"+err);})
  //  }
  // }

  // logout()
  // {
  //   this.auth.signOut();
  // }

}
