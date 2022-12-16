import { Injectable } from '@angular/core';
import { collection,collectionData,deleteDoc,doc,docSnapshots,Firestore,setDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Produto } from '../model/produto.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseprodutoService {

  constructor(private firestore: Firestore) { }

  saveproduto(produto: Produto): Promise<void>{
    const document = doc(collection(this.firestore, 'produtos'));
    return setDoc(document, produto);
  }

  listproduto(): Observable<Produto[]> {
    const produtosCollection = collection(this.firestore, 'produtos');
    return collectionData(produtosCollection, {idField: 'id'})
    .pipe(
      map(result => result as Produto[])
    );
  }

  findproduto(id: string): Observable<Produto> {
    const document = doc(this.firestore, `produtos/${id}`);
    return docSnapshots(document)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Produto;
      })
    );
  }

  updateproduto(produto: Produto): Promise<void>{
    const document = doc(this.firestore, 'produtos', produto?.id);
    const { id, ...data } = produto;
    return setDoc(document, data);
  }

  deleteproduto(id: string): Promise<void>{
    const document = doc(this.firestore, 'produtos', id);
    return deleteDoc(document);
  }
}
