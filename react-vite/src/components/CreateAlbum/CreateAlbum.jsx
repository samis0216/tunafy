import { useState } from "react"
import { useDispatch } from "react-redux";
import "./CreateAlbum.css"

export default function CreateAlbum() {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("")
  const [imageLoading, setImageLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name)

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);
    await dispatch(createAlbum(formData));
  }

  return (
    <form
      action="/api/albums/new"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div>
        <p>Album Name</p>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
      <p>Upload Cover Art</p>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      </div>

      <button
        type="submit"
      > Submit </button>
      {(imageLoading) && <p>Loading...</p>}
    </form>
  )
}
