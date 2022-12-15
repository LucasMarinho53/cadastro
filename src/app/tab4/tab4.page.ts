import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalFornecedorDetailsComponent } from '../modal-fornecedor-details/modal-fornecedor-details.component';
import { Fornecedor } from '../model/fornecedor.model';
import { FornecedorService } from '../services/fornecedor.service';
import { OverlayEventDetail } from '@ionic/core'
import { FirebasefornecedorService } from '../services/firebasefornecedor.service';
@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  fornecedores!: Fornecedor[];

  constructor(private service: FornecedorService,
    private modalCtrl: ModalController,
    private firebasefornecedorService: FirebasefornecedorService) {}

  public ionViewWillEnter(){
    this.firebasefornecedorService.listfornecedor().subscribe({
      next: (result) => {this.fornecedores = result},
      error: (err) => {console.error(err)}
    })
  }

  listaFornecedor() {
    this.service.getFornecedores().subscribe({
      next:(result) => this.fornecedores = result,
      error:(err) => console.error(err),
    });
  }

  async openModal(id:string) {
    const fornecedor = this.fornecedores.find(fornecedor => fornecedor.id === id);
    const modal = await this.modalCtrl.create({
      component: ModalFornecedorDetailsComponent,
      componentProps: {
        'fornecedor': fornecedor
      }
    });

    return await modal.present();
  }
}
