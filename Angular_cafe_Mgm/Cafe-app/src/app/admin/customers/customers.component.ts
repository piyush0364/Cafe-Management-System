import { Component } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {
  constructor(public objs : UserService,private toastr: ToastrService){}

  ngOnInit(): void {
    this.objs.getUserList();
 
  }

  onDelete(Id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this Customer?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.objs.deleteUser(Id).subscribe({
          next: () => {
            this.toastr.success('Record Deleted Successfully!', 'Success');
            this.objs.getUserList();
          },
          error: (err) => {
            this.toastr.error('An error occurred while deleting the record.', 'Error');
            console.error('Error deleting feedback:', err);
          }
        });
      } else {
        this.toastr.info('Deletion canceled', 'Info');
      }
    });
  }

}
