import { useEffect, useState } from "react";
import * as C from "./app.styles";
import * as Photos from "./services/photos"
import { Photo } from "./types/photos"
const App = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false);
    }
    getPhotos();

  }, [])
  return (
    <C.Container>
      <C.Area>
        <C.Header> Galeria de fotos </C.Header>

        {/*upload*/}

        {loading &&
          <C.ScreenWarning>
            <div className="emoji">✋</div>
            <div>Carregando...</div>
          </C.ScreenWarning>
        }

      </C.Area>
    </C.Container>
  )
}

export default App;