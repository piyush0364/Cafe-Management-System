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
    this.loadCustomers();
  }

  private loadCustomers(): void {
    this.objs.getUserList().subscribe({
      next: () => {
        // `uList` is updated inside the service
      },
      error: () => {
        this.toastr.error('Error', 'Failed to load customers');
      }
    });
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
            this.loadCustomers();
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
