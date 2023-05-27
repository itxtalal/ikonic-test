import { PostType } from './Post'
import { useState } from 'react'
import axios from '../../config/axios'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [published, setPublished] = useState(false)
  const navigate = useNavigate()

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await axios.post('/post/', {
      title,
      content,
      published
    })

    if (res.status === 201) {
      console.log('Post created successfully')
      navigate(`/post/${res.data.post.id}`)
    }

    console.log(res)
  }

  return (
    <div>
      <h2 className="text-3xl font-bold py-2 text-center">Create Post</h2>
      <form
        onSubmit={submitHandler}
        className="flex flex-col gap-2 border-2 border-gray-400 p-5"
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="content">Content</label>
        <textarea
          name="content"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex items-center gap-4">
          <label htmlFor="published">Published</label>
          <input
            type="checkbox"
            name="published"
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
        </div>

        <button className="text-lg font-light bg-primary-500 text-white px-4 py-2 rounded-lg">
          Create
        </button>
      </form>
    </div>
  )
}

export default CreatePost
