export class PokemonListModel {
    count: number;
    next: string;
    previous: string;
    results: Array<ResultsPokemon> = new Array<ResultsPokemon>();
}

export class ResultsPokemon {
    name: string;
    url: string;
}