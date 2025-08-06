// import { Component } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { StatusService } from '../../../_services/status.service';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';
import { ITotalStatues } from '../../../interfaces/ITotalsStaues';

@Component({
  selector: 'app-admin-home',
  imports: [ChartModule, RippleModule, BadgeModule],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css',
})
export class AdminHomeComponent {
  data: any;
  data2: any;
  data3: any;

  options: any;
  options2: any;
  options3: any;

  totalNumbers: ITotalStatues | null = null;

  platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef, private dash: StatusService) {}

  ngOnInit() {
    this.dash.GetUsersPerMonth().subscribe({
      next: (res) => {
        const labels = res.data.users.map((u) => u.month);
        const data = res.data.users.map((u) => u.userCount);
        this.initChart1(labels, data);
      },
    });

    this.dash.GetTopExamsSubjects().subscribe({
      next: (res) => {
        console.log(res);
        const labels = res.data.map((y) => y.subjectName);
        const data = res.data.map((y) => y.examCount);
        this.initChart2(labels, data);
      },
    });

    this.dash.GetSuccessFailStatus().subscribe({
      next: (res) => {
        console.log(res);
        const data = res.data;
        this.initChart3(data);
      },
    });

    this.dash.GetTotals().subscribe({
      next: (res) => {
        this.totalNumbers = res.data;
      },
    });
  }

  initChart1(labels: string[], data: any) {
    if (isPlatformBrowser(this.platformId)) {
      const textColor = 'black';
      const textColorSecondary = 'black';
      const surfaceBorder = 'black';

      this.data = {
        labels: labels,
        datasets: [
          {
            label: 'New Users / Month',
            data: data,
            fill: false,
            borderColor: 'green',
            tension: 0.4,
          },
        ],
      };

      this.options = {
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
          y: {
            beginAtZero: false,
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
              drawBorder: false,
            },
          },
        },
      };
      this.cd.markForCheck();
    }
  }

  initChart2(labels: string[], data: any) {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = 'black';
      const surfaceBorder = documentStyle.getPropertyValue(
        '--p-content-border-color'
      );

      this.data2 = {
        labels: labels,
        datasets: [
          {
            type: 'bar',
            label: 'Top Subjects Exams',
            backgroundColor: 'green',
            data: data,
          },
        ],
      };

      this.options2 = {
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
      this.cd.markForCheck();
    }
  }

  initChart3(data: any) {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.data3 = {
        labels: ['Success Rate', 'Failure Rate'],
        datasets: [
          {
            data: [data?.['success'], data?.['fail']],
            backgroundColor: ['green', 'red'],
          },
        ],
      };

      this.options3 = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor,
            },
          },
        },
      };
      this.cd.markForCheck();
    }
  }
}
