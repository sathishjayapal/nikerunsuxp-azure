import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {RunInfo, NikeData} from '../nike-data';
import {NikerundataService} from '../nikerundata.service';

@Component({
  selector: 'pm-nikerunslist',
  templateUrl: './nikerunslist.component.html',
  styleUrls: ['./nikerunslist.component.css'],
})
export class NikerunslistComponent implements OnInit, OnDestroy {
  datas= [
    {
      "id": 1751,
      "name": "302b105b-d129-4b93-966c-9e7c0234d76a",
      "run_start_time_str": "2023-02-10T16:55:52.307",
      "run_end_time_str": "2023-02-10T17:36:11.688",
      "run_active_duration_str": "38"
    },
    {
      "id": 1701,
      "name": "768fb8ab-f578-4191-b1bf-0ee1a062f456",
      "run_start_time_str": "2023-01-25T06:13:28.135",
      "run_end_time_str": "2023-01-25T07:12:37.891",
      "run_active_duration_str": "13"
    },
    {
      "id": 1651,
      "name": "fd0dd1b0-2af1-4f56-a2f3-bba1a42e704b",
      "run_start_time_str": "2022-08-31T05:48:41.020",
      "run_end_time_str": "2022-08-31T07:19:46.287",
      "run_active_duration_str": "90"
    },
    {
      "id": 1601,
      "name": "442486b6-c75a-4d7d-a6e7-ebd83c9c127e",
      "run_start_time_str": "2022-08-22T19:56:22.674",
      "run_end_time_str": "2022-08-22T20:44:27.783",
      "run_active_duration_str": "47"
    },
    {
      "id": 1551,
      "name": "c922ee28-48be-445f-9740-7b6884a7386c",
      "run_start_time_str": "2022-05-22T10:59:53.442",
      "run_end_time_str": "2022-05-22T13:02:50.612",
      "run_active_duration_str": "117"
    },
    {
      "id": 1501,
      "name": "9ffcf7cc-fd84-48bb-8e0a-f61e2731cd3b",
      "run_start_time_str": "2022-05-21T10:16:51.922",
      "run_end_time_str": "2022-05-21T10:52:01.043",
      "run_active_duration_str": "34"
    },
    {
      "id": 1451,
      "name": "9237a93b-b838-4b04-9dab-5e6e46e4a943",
      "run_start_time_str": "2022-05-20T06:00:28.157",
      "run_end_time_str": "2022-05-20T07:11:45.527",
      "run_active_duration_str": "71"
    },
    {
      "id": 1401,
      "name": "f3671fcb-9613-481f-9c77-7daa74b26c5d",
      "run_start_time_str": "2022-05-18T05:54:59.533",
      "run_end_time_str": "2022-05-18T06:39:32.046",
      "run_active_duration_str": "44"
    },
    {
      "id": 1351,
      "name": "74f017af-83b1-41fd-92f2-095bb130f8e3",
      "run_start_time_str": "2022-05-17T18:48:18.531",
      "run_end_time_str": "2022-05-17T19:34:23.235",
      "run_active_duration_str": "45"
    },
    {
      "id": 1301,
      "name": "302b105b-d129-4b93-966c-9e7c0234d76a",
      "run_start_time_str": "2023-02-10T16:55:52.307",
      "run_end_time_str": "2023-02-10T17:36:11.688",
      "run_active_duration_str": "38"
    }
  ];
  pageTitle = 'Product List';
  errorMessage = '';
  sub!: Subscription;
  displayedColums = ['id',"name","run_start_time_str","run_end_time_str","run_active_duration_str"]
  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: RunInfo[] = [];
  products: RunInfo[] = [];

  constructor(private productService: NikerundataService) {
  }

  performFilter(filterBy: string): RunInfo[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: RunInfo) =>
      product.name.toLocaleLowerCase().includes(filterBy)
    );
  }


  ngOnInit(): void {

    this.sub = this.productService.getProducts().subscribe({
      next: (nikeData: NikeData) => {
        this.products = nikeData.data;
        this.filteredProducts = this.products;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
