import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddtocartService } from 'src/app/core/services/addtocart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent {

  constructor(){}

}
