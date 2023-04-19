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
  dtOptions: DataTables.Settings = {};
  pageTitle = 'Product List';
  errorMessage = '';
  sub!: Subscription;

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
