import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { COLUMN_TYPE, DataGridColumnHeader } from './data-grid.service';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit, OnChanges {
  
  @Input() gridSettings: DataGridColumnHeader[];
  @Input() dataSource: any;
  @Input() loading: boolean;
  @Input() pageIndex: number;
  @Input() totalRecordCount: number;
  @Input() nodataMessage: any;
  @Input() pageSize: number = 10;
  @Input() sortBy = '';
  @Input() sortDirection = '';
  @Input() enableRowClick = false;
  @Input() showPagination = true;
  @Input() t: (args: any) => void;

  displayedColumns: string[];
  columnType = COLUMN_TYPE;

  @Output() fetchPageData: EventEmitter<any> = new EventEmitter<any>();
  @Output() linkClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() buttonClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() checkboxClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() sortChangeClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() rowClick: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {
    this.displayedColumns = new Array();
    for (const colObj of this.gridSettings) {
      this.displayedColumns.push(colObj.columnName);
    }
  }
  
  ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
    if (this.dataSource) {
      if (changes['gridSettings']) {
        // console.log('changed');
        this.displayedColumns = new Array();
        for (const colObj of this.gridSettings) {
          if (colObj.show)
            this.displayedColumns.push(colObj.columnName);
        }
      }
      if (changes['dataSource'] || changes['loading']) {
        this.displayedColumns = new Array();
        for (const colObj of this.gridSettings) {
          this.displayedColumns.push(colObj.columnName);
        }
      }
    }
    // console.log(this.gridSettings, this.displayedColumns, this.dataSource);
  }


  getPageData(event) {
    this.fetchPageData.emit(event);
  }

  handleButtonClick(item, column) {
    this.buttonClick.emit({item: item, buttonAction: column.button.buttonAction});
  }

  handleLinkClick(item) {
    this.linkClick.emit({item: item});
  }

  handleCheckBoxClick(item, parameter) {
    this.checkboxClick.emit({item: item, checkedList: this.dataSource.filter(obj => obj[parameter])});
  }

  handleRowClick(item) {
    this.rowClick.emit({item: item});
  }
}
