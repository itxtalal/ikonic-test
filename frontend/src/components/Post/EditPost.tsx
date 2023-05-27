import { PostType } from './Post'
import { useState } from 'react'
import axios from '../../config/axios'
import { useNavigate } from 'react-router-dom'

const EditPost = ({
  post,
  setPost,
  setIsEditing
}: {
  post: PostType
  setPost: React.Dispatch<React.SetStateAction<PostType | null>>
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const [published, setPublished] = useState(post.published)

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await axios.put('/post/' + post.id, {
      title,
      content,
      published
    })

    if (res.status === 200) {
      console.log('Post updated successfully')
      setPost((prev) => ({ ...prev, ...res.data.post }))
      setIsEditing(false)
    }

    console.log(res)
  }

  return (
    <div>
      <h2 className="text-3xl font-bold py-2 text-center">Edit Post</h2>
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
          Save
        </button>
      </form>
    </div>
  )
}

export default EditPost
