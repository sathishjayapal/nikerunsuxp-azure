import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {catchError, tap, throwError} from 'rxjs';
import {NikeData, RunInfo} from '../nike-data';
import {NikerundataService} from '../nikerundata.service';
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'pm-nikerunslist',
  templateUrl: './nikerunslist.component.html',
  styleUrls: ['./nikerunslist.component.css'],
})
export class NikerunslistComponent implements OnInit, AfterViewInit {
  pageTitle = 'Run List';
  errorMessage = '';
  displayedColums = ['id', "name", "run_start_time_str", "run_end_time_str", "run_active_duration_str"]

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  private _listFilter = ' ';
  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: RunInfo[] = [];
  nikeRunDataList: RunInfo[] = [];
  nikeRunData: NikeData;
  defaultPage: number = 1;
  pageSize = 5;

  constructor(private nikerundataService: NikerundataService) {
  }

  performFilter(filterBy: string): RunInfo[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.nikeRunDataList.filter((product: RunInfo) =>
      product.name.toLocaleLowerCase().includes(filterBy)
    );
  }


  ngOnInit(): void {
    this.loadDefaultRun()
  }

  loadDefaultRun() {
    this.nikerundataService.getProducts(this.paginator?.pageIndex ?? 1, this.paginator?.pageSize ?? 5).pipe(
      tap(nikeRunData => this.nikeRunData = nikeRunData),
      catchError(err => {
        console.log("Error loading data", err);
        alert("Error loading runs");
        return throwError(err);
      }),).subscribe()
  }

  ngAfterViewInit(): void {
    this.paginator.page.pipe(
      tap(() => this.loadDefaultRun())
    ).subscribe()
  }
}
