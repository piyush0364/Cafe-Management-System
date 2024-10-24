import { Component } from '@angular/core';
import { ProductService } from '../../Service/product.service';
import { AuthService } from '../../Service/auth.service';
import { CategoriesService } from '../../Service/categories.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  profileImageUrl: string | ArrayBuffer | null = null;

  obj: any = {
   
    pData: {},
    categoryList :[] 
  };
  // categoryList: Category[] = []; // Array to hold categories
 

  constructor(public objs:ProductService,private auth:AuthService,public cat:CategoriesService){}

  

  ngOnInit(): void {
    this.resetForm();
    this.fetchCategories();
    this.objs.getProductList();
 }


  fetchCategories() {
    this.cat.getcategoryList1().subscribe((categories) => {
      this.obj.categoryList = categories;
    });
  }

  resetForm(form?:NgForm){
    
    if(form != null){
      form.form.reset();
    }else{
      this.objs.pData={ProductId:0,Name:'',Description:'',Price:'',ImageUrl:'',CategoryId:''}
    }
  }


  fillData(selectedPL)
  {
   this.objs.pData=Object.assign({},selectedPL);
  }


  insertRecord(form: NgForm) {
     this.objs.pData = form.value; // Set cData from the form values
     this.objs.createProduct(this.profileImageUrl).subscribe(res => {
       this.resetForm(form);
       alert('New Product Creation Success');
       this.objs.getProductList(); // Refresh the list
     },
     err => {
       alert('Error: ' + err);
       this.resetForm(form);
     });
   }




   updateCategories(form:NgForm){
    this.objs.updateProduct().subscribe(res => {
      this.resetForm(form);
      alert('Product Updation Success');
      this.objs.getProductList();
    },
    err => {alert('Error !!!' + err);
      this.resetForm(form);
    }
  )
  }
  

  onSubmit(form: NgForm)
  {

    
    if(this.objs.pData.ProductId==0){
      this.insertRecord(form);
    }else{
      this.updateCategories(form);
    }
  }





  onDelete(ProductId)
  {
   if(confirm("Are you sure? you wanna delete this Product?"))
   {
     this.objs.deleteProduct(ProductId).subscribe(
       res=>{this.objs.getProductList()
         alert("Record Deleted!!!")
       },
      err=>{alert("Error!!!"+err);})
   }
  }

  logout()
  {
    this.auth.signOut();
  }

  
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.profileImageUrl = reader.result; // This is the Base64 string
      console.log(  this.profileImageUrl);
    };

    if (file) {
      reader.readAsDataURL(file); // Converts to Base64
    }
  }

}
