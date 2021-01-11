import Avatar from '../components-ui/Avatar';
import Card from '../components-ui/Card';
import { Post, RegularUserFragment } from '../generated/graphql';

interface PostCardProps {
  post: {
    __typename?: 'Post' | undefined;
  } & Pick<Post, 'caption' | 'id' | 'imgURL' | 'createdAt' | 'updatedAt'> & {
      user: {
        __typename?: 'User' | undefined;
      } & {
        __typename?: 'User' | undefined;
      } & RegularUserFragment;
    };
}

const PostCard: React.FC<PostCardProps> = ({ post: { user, imgURL } }) => {
  return (
    <Card className='mb-4'>
      <div className='flex flex-col'>
        <div className='flex items-center justify-between px-4 border-b border-gray-300'>
          <div className='flex items-center'>
            <Avatar className='p-2 cursor-pointer' src={user.imgURL} />
            <strong className='ml-2'>{user.username}</strong>
          </div>
        </div>
        <img
          style={{ width: '100%' }}
          src={`${process.env.REACT_APP_EXPRESS_URI}${imgURL}`}
          alt=''
        />
      </div>
    </Card>
  );
};

export default PostCard;
