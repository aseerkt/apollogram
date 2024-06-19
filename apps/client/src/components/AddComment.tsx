import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useToast } from '../context/toast'
import { AddCommentMutationDocument } from '../graphql/mutations'
import { GetPostsQueryDocument } from '../graphql/queries'
import Spinner from '../shared/Spinner'
import { getCacheKey, getQueryKey, useGqlMutation } from '../utils/react-query-gql'

interface AddCommentProps {
  postId: string
  customRef: React.RefObject<HTMLInputElement>
  className?: string
}

const AddComment: React.FC<AddCommentProps> = ({
  postId,
  customRef,
  className,
}) => {
  const toast = useToast()
  const [text, setText] = useState('')

  const queryClient = useQueryClient()

  const { mutate: addComment, isPending: submitting } = useGqlMutation(
    AddCommentMutationDocument,
    {
      onSuccess: (data) => {
        if (!data.addComment) {
          return
        }
        queryClient.invalidateQueries({
          queryKey: [getCacheKey(GetPostsQueryDocument)],
        })
        setText('')
        toast('Comment Added')
      },

      // update: (cache, { data }) => {
      //   const newComment = data?.addComment
      //   if (newComment) {
      //     cache.modify({
      //       id: 'Post:' + postId,
      //       broadcast: false,
      //       fields: {
      //         comments(existingCommentRefs = [], { readField }) {
      //           const newCommentRef = cache.writeFragment<RegularCommentFragment>(
      //             {
      //               fragmentName: 'RegularComment',
      //               data: newComment,
      //               fragment: RegularCommentFragmentDoc,
      //               broadcast: false,
      //             }
      //           )

      //           // Quick safety check - if the new comment is already
      //           // present in the cache, we don't need to add it again.
      //           if (
      //             existingCommentRefs.some(
      //               (ref: any) => readField('id', ref) === newComment.id
      //             )
      //           ) {
      //             return existingCommentRefs
      //           }

      //           return [newCommentRef, ...existingCommentRefs]
      //         },
      //       },
      //     })
      //     setText('')
      //     toast('Comment Added')
      //   }
      // },
    }
  )

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (!text) throw new Error('Comment Text is Empty')
      addComment({ postId, text })
    } catch (err) {
      // console.log(err);
    }
  }

  return (
    <div
      className={`relative justify-items-end border-t-2 px-3 py-3 ${className}`}
    >
      {submitting && (
        <div className='absolute left-0 top-0 flex h-full w-full items-center bg-white bg-opacity-80'>
          <Spinner size='small' />
        </div>
      )}
      <form className='flex w-full items-center' onSubmit={onSubmit}>
        <input
          ref={customRef}
          type='text'
          placeholder='Add Comment...'
          className='flex-1 border-none outline-none'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className='pl-2 font-bold text-blue-800 disabled:cursor-default disabled:opacity-20'
          disabled={!text}
        >
          Post
        </button>
      </form>
    </div>
  )
}

export default AddComment
