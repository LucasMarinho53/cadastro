import { Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, docSnapshots, Firestore, setDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Fornecedor } from '../model/fornecedor.model';

@Injectable({
  providedIn: 'root'
})
export class FirebasefornecedorService {

  constructor(private firestore: Firestore) { }

  savefornecedor(produto: Fornecedor): Promise<void>{
    const document = doc(collection(this.firestore, 'fornecedores'));
    return setDoc(document, produto);
  }

  listfornecedor(): Observable<Fornecedor[]> {
    const fornecedoresCollection = collection(this.firestore, 'fornecedores');
    return collectionData(fornecedoresCollection, {idField: 'id'})
    .pipe(
      map(result => result as Fornecedor[])
    );
  }

  findfornecedor(id: string): Observable<Fornecedor> {
    const document = doc(this.firestore, `fornecedores/${id}`);
    return docSnapshots(document)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Fornecedor;
      })
    );
  }

  updatefornecedor(fornecedor: Fornecedor): Promise<void>{
    const document = doc(this.firestore, 'fornecedores', fornecedor?.id);
    const { id, ...data } = fornecedor;
    return setDoc(document, data);
  }

  deletefornecedor(id: string): Promise<void>{
    const document = doc(this.firestore, 'fornecedores', id);
    return deleteDoc(document);
  }
}
