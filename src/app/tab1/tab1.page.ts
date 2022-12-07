import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { constants } from 'buffer';
import { Constants } from '../model/constants';
import { Produto } from '../model/produto.model';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  produtoForm!: FormGroup;
  statusCadastro!:string;

  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService) {}

  ngOnInit(): void{
    this.produtoForm = this.formBuilder.group({
      nome: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
      quantidade: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100), Validators.pattern(/^[0-9]+$/)]],
      precoCompra: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100), Validators.pattern(/^[0-9]+$/)]],
      precoVenda: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100), Validators.pattern(/^[0-9]+$/)]],
      fornecedor: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]],
    });
  }

  addProduto(){
    const newProduto = this.produtoForm.getRawValue() as Produto;

    this.produtoService.insertProduto(newProduto)
        .subscribe({
          next: (result:any) => {
            this.produtoForm.reset();
            console.info('[AddProduto]', result);
            this.statusCadastro = Constants.MSG_SUCESSO;
          },
          error: (error:any) => { console.log(error)}
        })
  }
}
