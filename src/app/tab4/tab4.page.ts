import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalFornecedorDetailsComponent } from '../modal-fornecedor-details/modal-fornecedor-details.component';
import { Fornecedor } from '../model/fornecedor.model';
import { FornecedorService } from '../services/fornecedor.service';
import { OverlayEventDetail } from '@ionic/core'
@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  fornecedores!: Fornecedor[];

  constructor(private service: FornecedorService, private modalCtrl: ModalController) {}

  public ionViewWillLeave(): void {
    this.listaFornecedor();
  };

  listaFornecedor() {
    this.service.getFornecedores().subscribe({
      next:(result) => this.fornecedores = result,
      error:(err) => console.error(err),
    });
  }

  async openModal(id:number) {
    const fornecedor = this.fornecedores.find(fornecedor => fornecedor.id === id);
    const modal = await this.modalCtrl.create({
      component: ModalFornecedorDetailsComponent,
      componentProps: {
        'fornecedor': fornecedor
      }
    });

    modal.onWillDismiss().then(
      event => {
        if(event.role === 'cancel'){
          this.listaFornecedor();
        }
      }
    );

    return await modal.present();
  }
}
