import { Link, useParams } from 'react-router-dom';
import Avatar from '../components-ui/Avatar';
import Container from '../components-ui/Container';
import Spinner from '../components-ui/Spinner';
import { useGetUserQuery, useMeQuery, User } from '../generated/graphql';
import { AiOutlineTable } from 'react-icons/ai';
import Button from '../components-ui/Button';
import Alert from '../components-ui/Alert';
import UserPosts from '../components/UserPosts';
import useToggleFollowHook from '../utils/useToggleFollowHook';
import { FaCheck, FaUser } from 'react-icons/fa';
import FollowModal from '../components/FollowModal';

const Profile: React.FC = () => {
  const { data: meData } = useMeQuery();
  const me = meData!.me!;

  const params = useParams<{ username: string }>();

  const { data, loading, error } = useGetUserQuery({
    variables: { username: params.username },
  });

  const { onToggle, toggling } = useToggleFollowHook(data?.getUser as User);

  if (loading) {
    return <Spinner />;
  } else if (error) {
    // console.log(error);
    <Alert severity='danger'>{JSON.stringify(error)}</Alert>;
  }
  if (data && data.getUser) {
    const {
      username,
      posts,
      isFollowing,
      profile: { imgURL, name, bio, website },
    } = data.getUser;
    return (
      <Container>
        {/* Profile Header */}
        <header className='grid items-center grid-cols-2 md:px-3 md:w-8/12'>
          <Avatar
            src={imgURL}
            alt=''
            className='self-start col-start-1 row-span-1 ml-3 mr-auto w-28 h-28 md:order-1 md:mx-auto md:w-52 md:h-52 md:row-span-3'
          />
          <div className='flex flex-col col-start-2 pr-3 -ml-10 md:order-2 md:ml-3 md:items-center md:flex-row'>
            <p className='text-3xl font-normal'>{username}</p>
            {me.username === username ? (
              <Link to='/edit-profile'>
                <Button className='mt-3 md:ml-4 md:mt-0'>Edit Profile</Button>
              </Link>
            ) : isFollowing ? (
              <Button
                className='mt-3 md:ml-4 md:mt-0'
                isLoading={toggling}
                onClick={onToggle}
              >
                {!toggling && (
                  <span className='flex items-center py-1'>
                    <FaUser className='mr-1' />
                    <FaCheck />
                  </span>
                )}
              </Button>
            ) : (
              <Button
                color='dark'
                className='mt-3 md:ml-4 md:mt-0'
                isLoading={toggling}
                onClick={onToggle}
              >
                {!toggling && 'Follow'}
              </Button>
            )}
          </div>
          <div className='col-span-2 col-start-1 p-3 mt-3 md:order-4 md:col-start-2'>
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
          <main className='flex justify-between col-span-2 col-start-1 gap-3 px-3 pt-3 mt-2 text-lg text-center border-t border-gray-300 md:order-3 md:text-left md:col-start-2 md:col-span-1 md:border-none'>
            <div className='md:flex'>
              <strong className='md:mr-1'>{posts.length}</strong>
              <p className='text-gray-600 md:text-black'>posts</p>
            </div>
            <FollowModal modalTitle='Followers' />
            <FollowModal modalTitle='Followings' />
          </main>
        </header>
        {/* Tab | Posts */}
        <section className='flex justify-center mt-4 border-t border-gray-300'>
          <header className='flex items-center justify-center py-2 border-t border-gray-800'>
            <AiOutlineTable />
            <strong className='my-0 mt-1 ml-2 font-bold text-gray-800 uppercase'>
              Posts
            </strong>
          </header>
        </section>
        {/* Posts Grid */}
        <UserPosts username={params.username} />
      </Container>
    );
  }

  return null;
};

export default Profile;
