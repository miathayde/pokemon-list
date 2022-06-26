import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PokemonListService {
    private readonly API = 'https://pokeapi.co/docs/v2/';

    constructor(private http: HttpClient) { }

    getList(quantityPerPage: number) {
        return this.http.get(`${this.API}pokemon/${quantityPerPage}`);
    }

    getPokemonByNameOrId(nameOrId: string) {
        return this.http.get(`${this.API}pokemon/${nameOrId}`);
    }
}