import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../Service/categories.service';
import { AuthService } from '../../Service/auth.service';
 
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})

export class CategoriesComponent implements OnInit{
  constructor(public objs:CategoriesService,private auth : AuthService){}

  ngOnInit(): void {
    this.resetForm();
    this.objs.getCategoriesList();
 
  }

  resetForm(form?:NgForm){
    
    if(form != null){
      form.form.reset();
    }else{
      this.objs.cData={CategoryId:0,Name:'',ImageUrl:'',IsActive:'',CreatedDate:''}
    }
  }


  fillData(selectedCL)
  {
   this.objs.cData=Object.assign({},selectedCL);
  }


  insertRecord(form: NgForm) {
    //  this.objService.cData = form.value; // Set cData from the form values
     this.objs.createCategory().subscribe(res => {
       this.resetForm(form);
       alert('New Categories Creation Success');
       this.objs.getCategoriesList(); // Refresh the list
     },
     err => {
       alert('Error: ' + err);
     });
   }




   updateCategories(form:NgForm){
    this.objs.updateCategory().subscribe(res => {
      this.resetForm(form);
      alert('Categories Updation Success');
      this.objs.getCategoriesList();
    },
    err => {alert('Error !!!' + err);}
  )
  }
  

  onSubmit(form: NgForm)
  {
    if(this.objs.cData.CategoryId==0){
      this.insertRecord(form);
    }else{
      this.updateCategories(form);
    }
  }





  onDelete(categoryID)
  {
<<<<<<< HEAD
   if(confirm("Are you sure? you wanna delete this Category?"))
=======
   if(confirm("Are you sure? you wanna delete this  Categories?"))
>>>>>>> 479b0e4ffb23e19f64110193d493555b30a9fd70
   {
     this.objs.deleteCategory(categoryID).subscribe(
       res=>{this.objs.getCategoriesList()
         alert("Record Deleted!!!")
       },
      err=>{alert("Error!!!"+err);})
   }
  }

  logout()
  {
    this.auth.signOut();
  }

}
