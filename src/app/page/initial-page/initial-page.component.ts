import { Component, OnInit } from '@angular/core';
import { PokemonListModel } from 'src/app/models/pokemon-list';
import { PokemonListService } from 'src/app/service/pokemon-list.service';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit {

  minElement: number = 1;
  maxElement: number;
  currentPage: number = 0;
  totalPages: number;
  totalPagesNotRound: number;
  pokemonList: PokemonListModel = new PokemonListModel();
  pokemonImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png';

  constructor(private service: PokemonListService) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.service.getList(this.currentPage).subscribe(
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
    page == 'previous' ? this.currentPage -= 20 : this.currentPage += 20;
    
    this.service.getList(this.currentPage).subscribe(
      result => {
        this.pokemonList = result;
        this.maxElement = this.pokemonList.count;
        console.log(this.pokemonList)
      }
    );
  }

  firstOrLastPage(page: string) {
    page == 'first' ? this.currentPage = 0 : this.currentPage = this.maxElement - this.getDecimalNumber(this.totalPagesNotRound);

    this.service.getList(this.currentPage).subscribe(
      result => {
        this.pokemonList = result;
        this.maxElement = this.pokemonList.count;
        console.log(this.pokemonList)
      }
    );
  }

  getDecimalNumber(item: number): number {
    let itemString = String(item);
    
    const getDecimal = itemString.substring(itemString.indexOf('.'), itemString.length);
    item = Number(getDecimal.replace('.', ''));

    return item;
  }
  
}
