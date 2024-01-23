import { useState } from "react"
import "./CreateAlbum.css"

export default function CreateAlbum() {
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

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
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button
        type="submit"
      > Submit </button>
      {(imageLoading) && <p>Loading...</p>}
    </form>
  )
}
