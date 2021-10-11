import * as C from "./styles";

type Props = {
    url: string;
    name: string;
}

export const PhotoItem = ({url, name}: Props) => {
    const handleClick = async () =>{
        console.log('clicou' + name)
      }
  return (
      <C.Container>
          <img src={url} alt={name} />
          {name}
          <button onClick={handleClick}>Apagar</button>
      </C.Container>
  );
}

