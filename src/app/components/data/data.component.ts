import { Component, Input,  OnChanges,    OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, OnChanges {

  @Input() tableBody: Array<object>;
  @Input() tableHead: Array<string>;
  @Input() errMsg: string;
  public searchFormControl = new FormControl();
  public searchObs: Observable<Object[]>;

  constructor() { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.searchObs = this.searchFormControl.valueChanges.pipe(
      startWith(''),
      map(searchKey => searchKey ? this.filterData(searchKey) : this.tableBody)
    );
  }

  private filterData(name: string) {
    const filterValue = name.toString().toLowerCase();
    if (name !== undefined && name !== "" && name !== null) {
      const tempArr = [];
      this.tableBody.forEach((obj) => {
        this.tableHead.forEach((arr) => {
          if (obj[arr].toString().toLowerCase().indexOf(filterValue) === 0) {
            tempArr.push(obj);
          }
        });
      });
      return tempArr;
    }
  }

  public sortColumn(colIndex: number) {
    this.tableBody.filter((obj) => {
      obj[this.tableHead[colIndex]]
    })
  }
}