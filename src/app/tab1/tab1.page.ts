import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { constants } from 'buffer';
import { Constants } from '../model/constants';
import { Produto } from '../model/produto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  produtoForm!: FormGroup;
  statusCadastro!:string;
  produto!:Produto;
  editable:boolean = false;

  constructor(private formBuilder: FormBuilder, private produtoService: ProdutoService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void{
    this.produtoForm = this.formBuilder.group({
      nome: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
      quantidade: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100), Validators.pattern(/^[0-9]+$/)]],
      precoCompra: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100), Validators.pattern(/^[0-9]+$/)]],
      precoVenda: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100), Validators.pattern(/^[0-9]+$/)]],
      fornecedor: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]],
      lucro: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]],
    });


  this.route.paramMap.subscribe(params => {
    const produtoId = +params.get('id')!;

    if(produtoId){
      this.produtoService.getProduto(produtoId).subscribe({
        next: (produtoDB:Produto) => {
          this.produto = produtoDB;
          this.editable = true;
          this.loadForm();
        },
        error: (err) => console.log(err)
      });
    }
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

  loadForm(){
    this.produtoForm.patchValue({
      nome: this.produto.nome,
      quantidade: this.produto.quantidade,
      precoCompra: this.produto.precoCompra,
      precoVenda: this.produto.precoVenda,
      fornecedor: this.produto.fornecedor,
      lucro: this.produto.lucro
    });
  }

  editProduto(){
    const editProduto = this.produtoForm.getRawValue() as Produto;
    editProduto.id = this.produto.id;

    this.produtoService.updateProduto(editProduto).subscribe({
      next: () => {
        this.router.navigateByUrl('/tabs/tab2');
        this.produtoForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.produtoForm.reset();
      }
    });

  }
}
