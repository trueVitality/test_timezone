import { Component, inject, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { TableComponent } from './table/table.component';
import { TimezoneService } from './services/timezone.service';
import { TimezoneInterface } from './interfaces/timezone.interface';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [TableComponent, MatButtonModule, MatDialogModule, CommonModule],
  templateUrl: 'app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'test timezones';
  dataSource: TimezoneInterface[] = [];
  timezones: string[] = [];
  readonly dialog = inject(MatDialog);
  
  constructor(private timezoneService: TimezoneService,
              private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
   this.getLocalTimezone();
   this.getTimezones();
  }

  private getTimezones() {
    this.timezoneService.getTimezones().subscribe(data => {
      this.timezones = data;
    })
  }

  private getLocalTimezone() {
    this.timezoneService.getLocalTimeZone().subscribe(localZone => {
      this.dataSource = JSON.parse(localStorage.getItem('timezones') || '[]');
      this.dataSource = [...[localZone], ...this.dataSource.filter((tz) => tz.timeZone !== localZone.timeZone)];
      this.changeDetectorRef.detectChanges();
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(
      AddDialogComponent, {data: this.timezones}
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTimezone(result);
      }
    });
  }

  addTimezone(zone: string) {
    this.timezoneService.getTimezoneInfo(zone).subscribe(data => {
      this.dataSource = [...this.dataSource.filter((tz) => tz.timeZone !== data.timeZone), data];
      localStorage.setItem('timezones', JSON.stringify(this.dataSource));
      this.changeDetectorRef.detectChanges();
    })
  }

  deleteTimezone(zone: TimezoneInterface) {
    this.dataSource = [...this.dataSource.filter((tz) => tz.timeZone !== zone.timeZone)];
    localStorage.setItem('timezones', JSON.stringify(this.dataSource));
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    
  }
}
