import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  data: any=[];

  constructor(private dataService:DataService){}
  ngOnInit() {
    this.dataService.fetchData().subscribe((response: any) => {
      this.data = response;
      console.log(response);
    });
  }
  async confirmDelete(userId: number) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    });

    if (result.isConfirmed) {
      this.dataService.deleteItem(userId).subscribe(() => {
        // refresh the data
        this.dataService.fetchData().subscribe((response: any) => {
          this.data = response;
          console.log(response);
          
        });
        Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
      });
    } else {
      Swal.fire('Cancelled', 'Your item is safe :)', 'info');
    }
  }
}
