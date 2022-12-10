import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from '../model/constants';
import { Fornecedor } from '../model/fornecedor.model';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  fornecedorForm!: FormGroup;
  statusCadastro!:string;

  constructor(private formBuilder: FormBuilder, private fornecedorService: FornecedorService, private router: Router) {}

  ngOnInit(): void{
    this.fornecedorForm = this.formBuilder.group({
      nome: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
      cnpj: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100), Validators.pattern(/^[0-9]+$/)]],
      contato: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]],
      logradouro: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]],
      numero: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100), Validators.pattern(/^[0-9]+$/)]],
      bairro: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]],
      cidade: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]],
      cep: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100), Validators.pattern(/^[0-9]+$/)]],
    });
  }

  addFornecedor(){
    const newFornecedor = this.fornecedorForm.getRawValue() as Fornecedor;

    this.fornecedorService.insertFornecedor(newFornecedor)
        .subscribe({
          next: (result:any) => {
            this.fornecedorForm.reset();
            this.router.navigateByUrl('/tabs/tab4');
          },
          error: (error:any) => { console.log(error)}
        })
  }
}
