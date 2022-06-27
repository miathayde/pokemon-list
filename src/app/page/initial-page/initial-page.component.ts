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
  totalPagesNotRound: number;
  pokemonList: PokemonListModel = new PokemonListModel();
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
        console.log(this.pokemonList)
      }
    );
  }

  changePage(page: string) {
    page == 'previous' ? this.pageInEndpoint -= 20 : this.pageInEndpoint += 20;
    
    this.service.getList(this.pageInEndpoint).subscribe(
      result => {
        this.pokemonList = result;
        this.maxElement = this.pokemonList.count;
        console.log(this.pokemonList)
      }
    );

    if(this.pageInEndpoint % 20 != 0) {
      this.currentPage -= 1;
    } else {
      this.currentPage = this.currentPage + 1;
    }
  }

  firstOrLastPage(page: string) {
    page == 'first' ? this.pageInEndpoint = 0 : this.pageInEndpoint = this.maxElement - this.getDecimalNumber(this.totalPagesNotRound);
    console.log(this.currentPage);
    this.service.getList(this.pageInEndpoint).subscribe(
      result => {
        this.pokemonList = result;
        this.maxElement = this.pokemonList.count;
        console.log(this.pokemonList)
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
}
