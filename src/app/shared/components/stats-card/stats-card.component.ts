import { Component , Input, OnInit} from '@angular/core';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideTrendingDown , lucideTrendingUp } from '@ng-icons/lucide';


@Component({
  selector: 'app-stats-card',
  imports: [HlmCardImports,  NgIcon, HlmIcon],
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
  @Input() data!: number;
  percent: string = "-"
  dataGrowing: boolean = false;
  showIcon: boolean = false;
  icon:string = "lucideTrendingDown";


  private calcStats(){
    if (this.data > 0){
      this.showIcon = true;
      this.dataGrowing = true;
      this.percent = `${this.data}%`;
      this.icon = 'lucideTrendingUp';
    } else if (this.data < 0){
      this.showIcon = true;
      this.percent = `${this.data}%`;
    }
  }
}
