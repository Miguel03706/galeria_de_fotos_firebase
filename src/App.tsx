import { useEffect, useState, FormEvent } from "react";
import * as C from "./app.styles";
import * as Photos from "./services/photos"
import { Photo } from "./types/photos"
import { PhotoItem } from "./components/PhotoItem";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false);
    }
    getPhotos();

  }, [])

 
  const handleSubmit = async (evt : FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.currentTarget);
    const file = formData.get('image') as File;

    if(file && file.size > 0){
      setUploading(true);
      const result = await Photos.insert(file);
      setUploading(false);
    
      if(result instanceof Error){
        alert(`${result.name} - ${result.message}`)
      }else{
        let newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList); 
      }

    }
  }

  return (
    <C.Container>
      <C.Area>
        <C.Header> Galeria de fotos </C.Header>

        <C.UploadForm method="POST" onSubmit={handleSubmit}>
          <input type="file" name="image"/>
          <input type="submit" value="enviar"/>
          {uploading && "Enviando..."}
        </C.UploadForm>

        {loading &&
          <C.ScreenWarning>
            <div className="emoji">✋</div>
            <div>Carregando...</div>
          </C.ScreenWarning>
        }
        {!loading && photos.length > 0 &&
          <C.PhotoList>
            {photos.map((item, index) => (
              <PhotoItem key={index} name={item.name} url={item.url} />
            ))}
          </C.PhotoList>
        }
        {!loading && photos.length === 0 &&
          <C.ScreenWarning>
            <div className="emoji">😅</div>
            <div>Não há fotos na sua galeria</div>
          </C.ScreenWarning>
        }


      </C.Area>
    </C.Container>
  )
}

export default App;