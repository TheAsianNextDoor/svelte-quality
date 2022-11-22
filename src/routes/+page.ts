type Return = {
  hello: string;
};

export const load = async () => {
  const data = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');
  const json: Return = await data.json();

  return json;
};
