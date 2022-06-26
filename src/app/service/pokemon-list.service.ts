import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PokemonListModel } from "../models/pokemon-list";

@Injectable({
    providedIn: 'root'
})
export class PokemonListService {
    private readonly API = 'https://pokeapi.co/api/v2/';

    constructor(private http: HttpClient) { }

    getList(page: number) {
        return this.http.get<PokemonListModel>(`${this.API}pokemon/?offset=${page}&limit=20`);
    }

    getPokemonByNameOrId(nameOrId: string) {
        return this.http.get(`${this.API}pokemon/${nameOrId}`);
    }
}