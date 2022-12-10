import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Produto } from '../model/produto.model';

@Component({
  selector: 'app-modal-produto-details',
  templateUrl: './modal-produto-details.component.html',
  styleUrls: ['./modal-produto-details.component.scss'],
})
export class ModalProdutoDetailsComponent implements OnInit {

  @Input() produto!: Produto;

  constructor(private modalCtrl: ModalController) { }

  cancel(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {}

}
