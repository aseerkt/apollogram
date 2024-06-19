import { AiFillHeart } from 'react-icons/ai'
import { RiChat3Fill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { Post } from '../gql/graphql'

const PostsGrid: React.FC<{ posts: Post[] }> = ({ posts }) => {
  return (
    <section className='mt-2 grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-4'>
      {posts.length === 0 && (
        <div className='col-span-full rounded-sm border p-5 text-center'>
          <strong className='py-4 text-gray-500'>No Posts Uploaded</strong>
        </div>
      )}
      {posts.map(({ imgURL, comments, likeCount, id }) => (
        <Link
          id={id}
          key={id}
          className='relative h-44 w-full sm:h-56 md:h-80'
          to={`/p/${id}`}
        >
          <img
            className='z-10 h-full w-full object-cover'
            src={imgURL}
            alt=''
          />
          <div className='absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-30 text-lg text-white text-opacity-100 opacity-0 hover:opacity-100'>
            <div className='flex items-center'>
              <div className='z-30 mr-2 flex items-center'>
                <AiFillHeart />
                <strong className='ml-1'>{likeCount}</strong>
              </div>
              <div className='z-30 ml-2 flex items-center'>
                <RiChat3Fill />
                <strong className='ml-1'>{comments.length}</strong>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </section>
  )
}

export default PostsGrid
