import { Component } from '@angular/core';
import { UserService } from '../../Service/user.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  constructor(public objs : UserService){}

  ngOnInit(): void {
    this.objs.getUserList();
 
  }

  onDelete(Id)
  {
   if(confirm("Are you sure? you wanna delete this Customer?"))
   {
     this.objs.deleteUser(Id).subscribe(
       res=>{this.objs.getUserList()
         alert("Record Deleted!!!")
       },
      err=>{alert("Error!!!"+err);})
   }
  }

}
