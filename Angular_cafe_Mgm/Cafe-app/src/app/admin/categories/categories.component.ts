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

  constructor(public objs: CategoriesService) {}

  ngOnInit(): void {
    this.resetForm();
    this.objs.getCategoriesList();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    } else {
      this.objs.cData = { CategoryId: 0, Name: '', ImageUrl: '', CreatedDate: '' };
    }
  }

  fillData(selectedCL) {
    this.objs.cData = Object.assign({}, selectedCL);
  }

  insertRecord(form: NgForm) {
    this.objs.createCategory(this.profileImageUrl).subscribe(
      () => {
        this.resetForm(form);
        alert('New Categories Creation Success');
        this.objs.getCategoriesList(); // Refresh the list
      },
      (err) => {
        alert('Error: ' + err);
      }
    );
  }

  updateCategories(form: NgForm) {
    this.objs.updateCategory().subscribe(
      () => {
        this.resetForm(form);
        alert('Categories Updation Success');
        this.objs.getCategoriesList();
      },
      (err) => {
        alert('Error !!!' + err);
      }
    );
  }

  onSubmit(form: NgForm) {
    if (this.objs.cData.CategoryId === 0) {
      this.insertRecord(form);
    } else {
      this.updateCategories(form);
    }
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
          this.objs.getCategoriesList();
          alert('Record Deleted!!!');
        },
        (err) => {
          alert('Error!!!' + err);
        }
      );
    }
  }



}
