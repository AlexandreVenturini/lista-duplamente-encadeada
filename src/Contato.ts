import { IComparable } from "./IComparable.js";

export class Contato implements IComparable{
    private _nome: string;
    private _telefone: string;
    private _email: string;

    constructor(nome: string, telefone: string, email?: string) {
        this._nome = nome.toUpperCase();
        this._telefone = telefone;
        if (email) {
            this._email = email;
        } else {
            this._email = "Não informado";
        }
    }

    public get nome(): string {
        return this._nome;
    }

    public set nome(name: string) {
        this._nome = name.toUpperCase();
    }

    public get telefone(): string {
        return this._telefone;
    }

    public set telefone(tel: string) {
        this._telefone = tel;
    }

    public get email(): string {
        return this._email;
    }

    public set email(em: string) {
        this._email = em;
    }

    public equals(contato: Contato): boolean {
        return (this._nome == contato.nome && this._telefone == contato.telefone);
    }

    public compareTo(contato: Contato): number {
        if (this._nome < contato._nome) {
          return -1;
        } else if (this._nome > contato._nome) {
          return 1;
        } else {
          if (this._telefone < contato._telefone) {
            return -1;
          } else if (this._telefone > contato._telefone) {
            return 1;
          } else {
            return 0;
          }
        }
      }

    public toString() {
        return "Nome: " + this.nome +
            "\nTelefone: " + this.telefone +
            "\nE-mail: " + this.email;
    }
}
