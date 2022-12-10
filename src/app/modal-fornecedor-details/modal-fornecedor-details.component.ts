import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Fornecedor } from '../model/fornecedor.model';

@Component({
  selector: 'app-modal-fornecedor-details',
  templateUrl: './modal-fornecedor-details.component.html',
  styleUrls: ['./modal-fornecedor-details.component.scss'],
})
export class ModalFornecedorDetailsComponent implements OnInit {

  @Input() fornecedor!: Fornecedor;

  constructor(private modalCtrl: ModalController) {}

  cancel(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {}

}
