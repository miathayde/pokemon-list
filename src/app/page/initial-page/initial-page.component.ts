import { Component, OnInit } from '@angular/core';
import { PokemonListModel } from 'src/app/models/pokemon-list';
import { PokemonListService } from 'src/app/service/pokemon-list.service';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.scss']
})
export class InitialPageComponent implements OnInit {

  minElement: number = 20;
  maxElement: number;
  pokemonList: PokemonListModel = new PokemonListModel();
  pokemonImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png';

  constructor(private service: PokemonListService) { }

  ngOnInit(): void {
    this.getList(0);
  }

  getList(quantity: number) {
    this.service.getList(quantity).subscribe(
      result => {
        this.pokemonList = result;
        this.maxElement = this.pokemonList.count;
        console.log(this.pokemonList)
      }
    );
  }
}
