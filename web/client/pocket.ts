import axios from 'axios';

const ENDPOINT = 'https://pokeapi.co/api/v2/pokemon';

export interface IPokemon {
  count: number;
  next: string;
  previous?: string;
  results: IPokemonResult[];
}

export interface IPokemonResult {
  name: string;
  url: string;
}

export type Params = {
  limit?: number;
  offset?: number;
};

export async function getPocket(params?: Params) {
  const { data } = await axios.get<IPokemon>(`${ENDPOINT}`, {
    params,
  });

  return data;
}
