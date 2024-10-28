import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category.model';
import { AuthService } from '../../Service/auth.service';
import { CategoryService } from '../../Service/category.service';
 
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})

export class CategoriesComponent implements OnInit{

  profileImageUrl: string | ArrayBuffer | null = null;

  constructor(public objs: CategoryService,private toastr:ToastrService) {}

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
       
        this.toastr.success('Success','New Category Creation Success')
        this.objs.getCategoryList(); // Refresh the list
      },
      (err) => {
        this.toastr.error('Error',err);
      }
    );

  }

  updateCategories(form: NgForm) {
    this.objs.updateCategory(this.profileImageUrl).subscribe(
      () => {
        this.resetForm(form);
      
        this.toastr.success('Success','Categories Updation Success')
        this.objs.getCategoryList();
      },
      (err) => {
        
        this.toastr.error('Error','Error !!!' +err)
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


  onDelete(ProductId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this category?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.objs.deleteCategory(ProductId).subscribe({
          next: () => {
            this.toastr.success('Record Deleted Successfully!', 'Success');
            this.objs.getCategoryList(); // Update the product list
          },
          error: (err) => {
            this.toastr.error('An error occurred while deleting the record.', 'Error');
            console.error('Error deleting product:', err);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.toastr.info('Deletion canceled', 'Info');
      }
    });
  }



}
