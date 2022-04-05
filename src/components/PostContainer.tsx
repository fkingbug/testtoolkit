import React, { useEffect, useState } from 'react'
import { postAPI } from '../services/PostService'
import PostItem from './PostItem'

const PostContainer = () => {
  const [limit, setLimit] = useState(10)

  const { data: posts, error, isLoading, refetch } = postAPI.useFetchAllPostsQuery(limit)

  useEffect(() => {
    setTimeout(() => {
      setLimit(3)
    }, 2000)
  }, [])

  return (
    <div>
      <div className='post__list'>
        <button onClick={() => refetch()}>REFRESH</button>
        {isLoading && <h1>Идет загрузка...</h1>}
        {error && <h1>Произошла ошибка при загрузке</h1>}
        {posts && posts.map((post) => <PostItem key={post.id} post={post} />)}
      </div>
    </div>
  )
}

export default PostContainer
