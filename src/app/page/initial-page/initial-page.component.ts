import { Component, OnInit } from '@angular/core';
import { PokemonListModel } from 'src/app/models/pokemon-list';
import { PokemonListService } from 'src/app/service/pokemon-list.service';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit {

  maxElement: number;
  currentPage: number = 1;
  pageInEndpoint: number = 0;
  totalPages: number;
  itensPerPage: number = 20;
  totalPagesNotRound: number;
  inSearch: boolean = false;
  search: string;
  pokemonList: PokemonListModel = new PokemonListModel();
  pokemonListAll: PokemonListModel = new PokemonListModel();
  pokemonImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png';

  constructor(private service: PokemonListService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.service.getList(this.pageInEndpoint).subscribe(
      result => {
        this.pokemonList = result;
        this.maxElement = this.pokemonList.count;

        this.totalPagesNotRound = this.maxElement / 20;
        var roundNumber = Math.round(this.maxElement / 20);
        this.totalPages = roundNumber < this.totalPagesNotRound ? roundNumber + 1 : roundNumber;

        this.getAllList();
      }
    );
  }

  getAllList() {
    this.service.getAll(this.maxElement).subscribe(
      result => {
        this.pokemonListAll = result;

        // mantendo apenas os números na url, para poder realizar a busca
        this.pokemonListAll.results.forEach(x => {
          x.url = x.url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/','');
        });
      }
    );
  }

  changePage(page: string) {
    page == 'previous' ? this.pageInEndpoint -= 20 : this.pageInEndpoint += 20;
    
    this.service.getList(this.pageInEndpoint).subscribe(
      result => {
        this.pokemonList = result;
        this.maxElement = this.pokemonList.count;
      }
    );

    if(page == 'previous') {
      this.currentPage -= 1;
    } else {
      this.currentPage += 1;
    }
  }

  firstOrLastPage(page: string) {
    page == 'first' ? this.pageInEndpoint = 0 : this.pageInEndpoint = this.maxElement - this.getDecimalNumber(this.totalPagesNotRound);
    
    this.service.getList(this.pageInEndpoint).subscribe(
      result => {
        this.pokemonList = result;
        this.maxElement = this.pokemonList.count;
      }
    );

    if(page == 'last') {
      this.currentPage = this.totalPages;
    } else {
      this.currentPage = 1;
    }
  }

  getDecimalNumber(item: number): number {
    let itemString = String(item);
    
    const getDecimal = itemString.substring(itemString.indexOf('.'), itemString.length);
    item = Number(getDecimal.replace('.', ''));

    return item;
  }

  getSearch(item: string) {
    this.inSearch = true;
    item = item.toLocaleLowerCase().trim();

    this.pokemonList.results = this.pokemonListAll.results.filter(x => x.name.includes(item) ||
      x.url.includes(item));

    this.itensPerPage = this.pokemonList.results.length;

    if(!this.search || this.search == '') {
      this.inSearch = false;
      this.itensPerPage = 20;
      this.getList();
    }
  }
}
