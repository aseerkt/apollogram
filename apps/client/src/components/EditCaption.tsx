import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useToast } from '../context/toast'
import { GetPostsDocument } from '../gql/graphql'
import { EditCaptionMutationDocument } from '../graphql/mutations'
import Button from '../shared/Button'
import Card from '../shared/Card'
import { getCacheKey, useGqlMutation } from '../utils/react-query-gql'

interface EditCaptionProps {
  postId: string
  postCaption: string
  postImage: string
  close: Function
}

const EditCaption: React.FC<EditCaptionProps> = ({
  postId,
  postCaption,
  postImage,
  close,
}) => {
  const toast = useToast()
  const [caption, setCaption] = useState(postCaption)
  const queryClient = useQueryClient()
  const { mutate: editCaption, isPending: submitting } = useGqlMutation(
    EditCaptionMutationDocument,
    {
      onSuccess: (data) => {
        if (data.editCaption) {
          // TODO: check cache invalidation
          queryClient.invalidateQueries({
            queryKey: [getCacheKey(GetPostsDocument)],
          })
          toast('Post caption updated')
        }
        close()
      },
    }
  )

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    editCaption({ postId, caption })
  }

  return (
    <Card className={`p-5`}>
      <h1 className='mb-3 mt-1 text-xl font-semibold uppercase'>
        Edit Caption
      </h1>
      <form onSubmit={onSubmit}>
        <div className='mb-5'>
          <label className='mb-1 inline-block font-bold' htmlFor='caption'>
            Caption
          </label>
          <div>
            <input
              id='caption'
              name='caption'
              placeholder='Add caption for your post...'
              className='mb-3 w-full rounded-md border border-gray-300 bg-blue-50 px-2 py-1 focus:border-gray-500'
              autoFocus
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <small className='block leading-4 text-gray-500'>
              Give your post a catchy caption
            </small>
            {/* <small className='my-1 text-red-700'>{error}</small> */}
          </div>
          <div className='mt-2' style={{ height: 'calc(100vh - 400px)' }}>
            <img className='h-full' src={postImage} alt='Upload preview' />
          </div>
        </div>

        <Button
          isLoading={submitting}
          className='mx-auto block'
          color='dark'
          type='submit'
          disabled={!caption || postCaption === caption}
        >
          Update caption
        </Button>
      </form>
    </Card>
  )
}

export default EditCaption
