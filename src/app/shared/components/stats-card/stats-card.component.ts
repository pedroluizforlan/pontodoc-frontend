import { Component , Input, OnInit} from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrendingDown , lucideTrendingUp } from '@ng-icons/lucide';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-stats-card',
  imports: [HlmCardImports,  NgIcon, HlmIcon, CommonModule],
  templateUrl: './stats-card.component.html',
  styleUrl: './stats-card.component.css',
  providers: [provideIcons({lucideTrendingDown, lucideTrendingUp})]
})
export class StatsCardComponent implements OnInit{
  ngOnInit(): void {
    this.calcStats();
  }

  @Input() title: string | null = "Título";
  @Input() stats: string | null = "NA";
  @Input() data!: number | string;
  percent: string = "-"
  dataGrowing: boolean = false;
  showIcon: boolean = false;
  icon:string = "lucideTrendingDown";
  color:string = "text-gray-400";


  private calcStats(){

    const n  = this.data as number;
    if (n > 0){
      this.showIcon = true;
      this.dataGrowing = true;
      this.percent = `${this.data}%`;
      this.icon = 'lucideTrendingUp';
      this.color = "text-lime-500"
    } else if (n < 0){
      this.showIcon = true;
      this.percent = `${this.data}%`;
      this.color = "text-orange-500"
    }
  }
}
