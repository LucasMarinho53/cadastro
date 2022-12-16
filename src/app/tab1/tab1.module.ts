import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';


import { Tab1PageRoutingModule } from './tab1-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseprodutoService } from '../services/firebaseproduto.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page],
  providers: [FirebaseprodutoService]
})
export class Tab1PageModule {}
