import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { constants } from 'buffer';
import { Constants } from '../model/constants';
import { Produto } from '../model/produto.model';
import { Router } from '@angular/router';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  produtoForm!: FormGroup;
  statusCadastro!:string;

  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService, private router: Router) {}

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
            this.router.navigateByUrl('/tabs/tab2');
          },
          error: (error:any) => { console.log(error)}
        })
  }
}
