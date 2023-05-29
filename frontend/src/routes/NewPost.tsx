import { useAppSelector } from '../redux/hooks'
import { userSelector } from '../redux/slices/userSlice'
import checkAuthToken from '../hooks/checkAuth'
import CreatePost from '../components/Post/CreatePost'
import Layout from '../layout/Layout'

const NewPost = () => {
  const user = useAppSelector(userSelector)

  checkAuthToken()

  if (user.id === '') return <div>Loading...</div>

  return (
    <Layout>
      <CreatePost />
    </Layout>
  )
}

export default NewPost
