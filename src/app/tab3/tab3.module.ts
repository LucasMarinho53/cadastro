import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';


import { Tab3PageRoutingModule } from './tab3-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FornecedorService } from '../services/fornecedor.service';
import { CorreiosService } from '../services/correios.service';
import { FirebasefornecedorService } from '../services/firebasefornecedor.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Tab3PageRoutingModule
  ],
  declarations: [Tab3Page],
  providers: [FornecedorService, CorreiosService, FirebasefornecedorService]
})
export class Tab3PageModule {}
