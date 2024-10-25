import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category.model';
import { AuthService } from '../../Service/auth.service';
import { CategoryService } from '../../Service/category.service';
 
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})

export class CategoriesComponent implements OnInit{

  // profileImageUrl: string | ArrayBuffer | null = null;

  // constructor(public objs:CategoriesService, private csrv : CategoriesService){}

  // ngOnInit(): void {
  //   this.resetForm();
  //   this.objs.getCategoriesList();
  //   this.csrv.getCategoriesList();
 
  // }

  // resetForm(form?:NgForm){
    
  //   if(form != null){
  //     form.form.reset();
  //   }else{
  //     this.objs.cData={CategoryId:0,Name:'',ImageUrl:'',IsActive:'',CreatedDate:''}
  //   }
  // }


  // fillData(selectedCL)
  // {
  //  this.objs.cData=Object.assign({},selectedCL);
  // }


  // insertRecord(form: NgForm) {
  //   //  this.objService.cData = form.value; // Set cData from the form values
  //    this.objs.createCategory(this.profileImageUrl).subscribe(res => {
  //      this.resetForm(form);
  //      alert('New Categories Creation Success');
  //      this.objs.getCategoriesList(); // Refresh the list
  //    },
  //    err => {
  //      alert('Error: ' + err);
  //    });
  //  }




  //  updateCategories(form:NgForm){
  //   this.objs.updateCategory().subscribe(res => {
  //     this.resetForm(form);
  //     alert('Categories Updation Success');
  //     this.objs.getCategoriesList();
  //   },
  //   err => {alert('Error !!!' + err);}
  // )
  // }
  

  // onSubmit(form: NgForm)
  // { 
  //   if(this.objs.cData.CategoryId==0){
  //     this.insertRecord(form);
  //   }else{
  //     this.updateCategories(form);
  //   }
  // }

  // onFileSelected(event: any): void {
  //   const file: File = event.target.files[0];
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     this.profileImageUrl = reader.result; // This is the Base64 string
  //     console.log(  this.profileImageUrl);
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file); // Converts to Base64
  //   }
  // }






  // onDelete(categoryID)
  // {
  //  if(confirm("Are you sure? you wanna delete this  Categories?"))
  //  {
  //    this.objs.deleteCategory(categoryID).subscribe(
  //      res=>{this.objs.getCategoriesList()
  //        alert("Record Deleted!!!")
  //      },
  //     err=>{alert("Error!!!"+err);})
  //  }
  // }


  profileImageUrl: string | ArrayBuffer | null = null;

  constructor(public objs: CategoryService) {}

  ngOnInit(): void {
    this.resetForm();
    this.objs.getCategoryList();
  }

  resetForm(form?: NgForm) {
      this.objs.cData.CategoryId = 0;
  }

  fillData(p) {
     this.objs.cData.Name = p.Name;
     this.objs.cData.CategoryId = p.CategoryId;
  }

  insertRecord(form: NgForm) {

    this.objs.createCategory(this.profileImageUrl,form).subscribe(
      () => {
        alert('New Categories Creation Success');
        this.objs.getCategoryList(); // Refresh the list
      },
      (err) => {
        alert('Error: ' + err);
      }
    );

  }

  updateCategories(form: NgForm) {
    this.objs.updateCategory(this.profileImageUrl).subscribe(
      () => {
        this.resetForm(form);
        alert('Categories Updation Success');
        this.objs.getCategoryList();
      },
      (err) => {
        alert('Error !!!' + err);
      }
    );
  }

  onSubmit(form: NgForm,fileInput : any) {
    if (this.objs.cData.CategoryId === 0) {
      this.insertRecord(form);
    } else {
      this.updateCategories(form);
    }
    form.reset();
    this.objs.cData.CategoryId = 0;
    fileInput.value = '';
    this.profileImageUrl = '';

  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.profileImageUrl = reader.result; // This is the Base64 string
    };

    if (file) {
      reader.readAsDataURL(file); // Converts to Base64
    }
  }

  onDelete(categoryID) {
    if (confirm('Are you sure? you want to delete this category?')) {
      this.objs.deleteCategory(categoryID).subscribe(
        () => {
          this.objs.getCategoryList();
          alert('Record Deleted!!!');
        },
        (err) => {
          alert('Error!!!' + err);
        }
      );
    }
  }



}
