import { AiOutlineTable } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import FollowButton from '../components/FollowButton'
import FollowModal from '../components/FollowModal'
import UserPosts from '../components/UserPosts'
import { User, useGetUserQuery } from '../generated/graphql'
import Alert from '../shared/Alert'
import Avatar from '../shared/Avatar'
import Container from '../shared/Container'
import Spinner from '../shared/Spinner'

const Profile: React.FC = () => {
  const params = useParams<{ username: string }>()

  const { data, loading, error } = useGetUserQuery({
    variables: { username: params.username! },
  })

  if (loading) {
    return <Spinner />
  } else if (error) {
    // console.log(error);
    return <Alert severity='danger'>{JSON.stringify(error)}</Alert>
  } else if (!data?.getUser) {
    return null
  }

  const {
    username,
    posts,
    name,
    imgURL,
    profile: { bio, website },
  } = data.getUser

  return (
    <Container>
      {/* Profile Header */}
      <header className='grid grid-cols-2 items-center md:w-8/12 md:px-3'>
        <Avatar
          src={imgURL}
          alt=''
          className='col-start-1 row-span-1 ml-3 mr-auto h-28 w-28 self-start md:order-1 md:row-span-3 md:mx-auto md:h-52 md:w-52'
        />
        <div className='col-start-2 -ml-10 flex flex-col pr-3 md:order-2 md:ml-3 md:flex-row md:items-center'>
          <p className='text-3xl font-normal'>{username}</p>
          <FollowButton user={data.getUser as User} />
        </div>
        <div className='col-span-2 col-start-1 mt-3 p-3 md:order-4 md:col-start-2'>
          <strong>{name}</strong>
          <p className='text-lg'>{bio}</p>
          <a
            rel='noreferrer'
            className='font-semibold text-blue-600'
            href={website}
            target='_blank'
          >
            {website.replace('https://', '')}
          </a>
        </div>
        <main className='col-span-2 col-start-1 mt-2 flex justify-between gap-3 border-t border-gray-300 px-3 pt-3 text-center text-lg md:order-3 md:col-span-1 md:col-start-2 md:border-none md:text-left'>
          <div className='md:flex'>
            <strong className='md:mr-1'>{posts.length}</strong>
            <p className='text-gray-600 md:text-black'>posts</p>
          </div>
          <FollowModal modalTitle='Followers' />
          <FollowModal modalTitle='Followings' />
        </main>
      </header>
      {/* Tab | Posts */}
      <section className='mt-4 flex justify-center border-t border-gray-300'>
        <header className='flex items-center justify-center border-t border-gray-800 py-2'>
          <AiOutlineTable />
          <strong className='my-0 ml-2 mt-1 font-bold uppercase text-gray-800'>
            Posts
          </strong>
        </header>
      </section>
      {/* Posts Grid */}
      <UserPosts username={params.username!} />
    </Container>
  )
}

export default Profile
