import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy} from '@angular/core';
import { MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { TimezoneInterface } from '../interfaces/timezone.interface';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { shareReplay, map, timer} from 'rxjs';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {

  _dataSource: TimezoneInterface[] = [];

  @Input() set dataSource(value: TimezoneInterface[]) {
    this._dataSource = value.map(item => {
      item.liveTime = timer(0, 1000)
      .pipe(map(() => new Date()), shareReplay(1));
      return item;
    })
  }

  @Output() action: EventEmitter<TimezoneInterface> = new EventEmitter();

  get datasource() {
    return this._dataSource;
  }

  colums: string[] = ['timeZone', 'abbreviation_offset', 'localTime', 'localDate', 'activeDaylight', 'action'];

  public remove(item: TimezoneInterface) {
    this.action.emit(item);
  }

  public readableTimeZone(offset: number): string {
    return (offset >= 0 ? '+' : '') + (offset / 60 / 60);
  }
}

