import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type BaseColumns = {
  __typename?: 'BaseColumns';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  postId: Scalars['String'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  username: Scalars['String'];
};

export type CreatePostResponse = {
  __typename?: 'CreatePostResponse';
  error?: Maybe<FieldError>;
  ok: Scalars['Boolean'];
  post?: Maybe<Post>;
};


export type EditProfileResponse = {
  __typename?: 'EditProfileResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  message: Scalars['String'];
  path: Scalars['String'];
};

export type Follow = {
  __typename?: 'Follow';
  followingUsername: Scalars['String'];
  username: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  errors?: Maybe<Array<FieldError>>;
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment?: Maybe<Comment>;
  addPost: CreatePostResponse;
  changeProfilePhoto: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  editCaption?: Maybe<Scalars['String']>;
  editProfile: EditProfileResponse;
  login: LoginResponse;
  logout: Scalars['Boolean'];
  register: RegisterResponse;
  removeProfilePhoto?: Maybe<Scalars['String']>;
  toggleFollow: Scalars['Boolean'];
  toggleLike: Scalars['Boolean'];
};


export type MutationAddCommentArgs = {
  postId: Scalars['String'];
  text: Scalars['String'];
};


export type MutationAddPostArgs = {
  caption: Scalars['String'];
  file: Scalars['Upload'];
};


export type MutationChangeProfilePhotoArgs = {
  file?: Maybe<Scalars['Upload']>;
};


export type MutationDeletePostArgs = {
  postId: Scalars['ID'];
};


export type MutationEditCaptionArgs = {
  caption: Scalars['String'];
  postId: Scalars['ID'];
};


export type MutationEditProfileArgs = {
  bio: Scalars['String'];
  email: Scalars['String'];
  gender: Scalars['String'];
  name: Scalars['String'];
  website: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationToggleFollowArgs = {
  followingUsername: Scalars['ID'];
};


export type MutationToggleLikeArgs = {
  postId: Scalars['String'];
};

export type PaginatedPost = {
  __typename?: 'PaginatedPost';
  hasMore: Scalars['Boolean'];
  posts: Array<Post>;
};

export type Post = {
  __typename?: 'Post';
  caption: Scalars['String'];
  comments: Array<Comment>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  imgURL: Scalars['String'];
  likeCount: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userLike: Scalars['Boolean'];
  username: Scalars['String'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  error?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
};

export type Profile = {
  __typename?: 'Profile';
  bio: Scalars['String'];
  createdAt: Scalars['DateTime'];
  followers: Array<User>;
  followings: Array<User>;
  gender: Scalars['String'];
  id: Scalars['ID'];
  imgURL: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  website: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getExplorePosts: PaginatedPost;
  getFollowSuggestions: Array<User>;
  getPosts: PaginatedPost;
  getSinglePost?: Maybe<Post>;
  getUser?: Maybe<User>;
  me?: Maybe<User>;
};


export type QueryGetExplorePostsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryGetPostsArgs = {
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
};


export type QueryGetSinglePostArgs = {
  postId: Scalars['String'];
};


export type QueryGetUserArgs = {
  username: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  errors?: Maybe<Array<FieldError>>;
  ok: Scalars['Boolean'];
};


export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['ID'];
  isFollowing: Scalars['Boolean'];
  posts: Array<Post>;
  profile: Profile;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type MinimalPostFragment = { __typename?: 'Post', id: string, caption: string, imgURL: string, createdAt: any, updatedAt: any, likeCount: number, user: { __typename?: 'User', username: string, profile: { __typename?: 'Profile', imgURL: string } }, comments: Array<{ __typename?: 'Comment', text: string, username: string, user: { __typename?: 'User', profile: { __typename?: 'Profile', imgURL: string } } }> };

export type MinimalProfileFragment = { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string };

export type MinimalUserFragment = { __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } };

export type RegularCommentFragment = { __typename?: 'Comment', id: string, text: string, username: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } } };

export type RegularPostFragment = { __typename?: 'Post', id: string, caption: string, imgURL: string, likeCount: number, userLike: boolean, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } }, comments: Array<{ __typename?: 'Comment', id: string, text: string, username: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } } }> };

export type RegularProfileFragment = { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string, followers: Array<{ __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } }>, followings: Array<{ __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } }> };

export type RegularUserFragment = { __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string, followers: Array<{ __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } }>, followings: Array<{ __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } }> } };

export type AddCommentMutationVariables = Exact<{
  text: Scalars['String'];
  postId: Scalars['String'];
}>;


export type AddCommentMutation = { __typename?: 'Mutation', addComment?: Maybe<{ __typename?: 'Comment', id: string, text: string, username: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } } }> };

export type AddPostMutationVariables = Exact<{
  file: Scalars['Upload'];
  caption: Scalars['String'];
}>;


export type AddPostMutation = { __typename?: 'Mutation', addPost: { __typename?: 'CreatePostResponse', ok: boolean, post?: Maybe<{ __typename?: 'Post', id: string, caption: string, imgURL: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', username: string } }>, error?: Maybe<{ __typename?: 'FieldError', path: string, message: string }> } };

export type ChangeProfilePhotoMutationVariables = Exact<{
  file?: Maybe<Scalars['Upload']>;
}>;


export type ChangeProfilePhotoMutation = { __typename?: 'Mutation', changeProfilePhoto: boolean };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['ID'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type EditCaptionMutationVariables = Exact<{
  postId: Scalars['ID'];
  caption: Scalars['String'];
}>;


export type EditCaptionMutation = { __typename?: 'Mutation', editCaption?: Maybe<string> };

export type EditProfileMutationVariables = Exact<{
  name: Scalars['String'];
  website: Scalars['String'];
  bio: Scalars['String'];
  gender: Scalars['String'];
  email: Scalars['String'];
}>;


export type EditProfileMutation = { __typename?: 'Mutation', editProfile: { __typename?: 'EditProfileResponse', user?: Maybe<{ __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } }>, errors?: Maybe<Array<{ __typename?: 'FieldError', path: string, message: string }>> } };

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', ok: boolean, errors?: Maybe<Array<{ __typename?: 'FieldError', path: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', ok: boolean, errors?: Maybe<Array<{ __typename?: 'FieldError', path: string, message: string }>> } };

export type ToggleFollowMutationVariables = Exact<{
  followingUsername: Scalars['ID'];
}>;


export type ToggleFollowMutation = { __typename?: 'Mutation', toggleFollow: boolean };

export type ToggleLikeMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type ToggleLikeMutation = { __typename?: 'Mutation', toggleLike: boolean };

export type GetExplorePostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
}>;


export type GetExplorePostsQuery = { __typename?: 'Query', getExplorePosts: { __typename?: 'PaginatedPost', hasMore: boolean, posts: Array<{ __typename?: 'Post', id: string, caption: string, imgURL: string, likeCount: number, userLike: boolean, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } }, comments: Array<{ __typename?: 'Comment', id: string, text: string, username: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } } }> }> } };

export type GetFollowSuggestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFollowSuggestionsQuery = { __typename?: 'Query', getFollowSuggestions: Array<{ __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } }> };

export type GetPostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
}>;


export type GetPostsQuery = { __typename?: 'Query', getPosts: { __typename?: 'PaginatedPost', hasMore: boolean, posts: Array<{ __typename?: 'Post', id: string, caption: string, imgURL: string, likeCount: number, userLike: boolean, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } }, comments: Array<{ __typename?: 'Comment', id: string, text: string, username: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } } }> }> } };

export type GetSinglePostQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type GetSinglePostQuery = { __typename?: 'Query', getSinglePost?: Maybe<{ __typename?: 'Post', id: string, caption: string, imgURL: string, likeCount: number, userLike: boolean, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } }, comments: Array<{ __typename?: 'Comment', id: string, text: string, username: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } } }> }> };

export type GetUserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: Maybe<{ __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, posts: Array<{ __typename?: 'Post', id: string, caption: string, imgURL: string, likeCount: number, userLike: boolean, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } }, comments: Array<{ __typename?: 'Comment', id: string, text: string, username: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } } }> }>, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string, followers: Array<{ __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } }>, followings: Array<{ __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } }> } }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string, followers: Array<{ __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } }>, followings: Array<{ __typename?: 'User', id: string, username: string, email: string, isFollowing: boolean, profile: { __typename?: 'Profile', id: string, name: string, website: string, bio: string, gender: string, imgURL: string } }> } }> };

export const MinimalPostFragmentDoc = gql`
    fragment MinimalPost on Post {
  id
  caption
  imgURL
  createdAt
  updatedAt
  user {
    username
    profile {
      imgURL
    }
  }
  likeCount
  comments {
    text
    username
    user {
      profile {
        imgURL
      }
    }
  }
}
    `;
export const MinimalProfileFragmentDoc = gql`
    fragment MinimalProfile on Profile {
  id
  name
  website
  bio
  gender
  imgURL
}
    `;
export const MinimalUserFragmentDoc = gql`
    fragment MinimalUser on User {
  id
  username
  email
  isFollowing
  profile {
    ...MinimalProfile
  }
}
    ${MinimalProfileFragmentDoc}`;
export const RegularCommentFragmentDoc = gql`
    fragment RegularComment on Comment {
  id
  text
  username
  createdAt
  updatedAt
  user {
    ...MinimalUser
  }
}
    ${MinimalUserFragmentDoc}`;
export const RegularPostFragmentDoc = gql`
    fragment RegularPost on Post {
  id
  caption
  imgURL
  likeCount
  userLike
  createdAt
  updatedAt
  user {
    ...MinimalUser
  }
  comments {
    ...RegularComment
  }
}
    ${MinimalUserFragmentDoc}
${RegularCommentFragmentDoc}`;
export const RegularProfileFragmentDoc = gql`
    fragment RegularProfile on Profile {
  id
  name
  website
  bio
  gender
  imgURL
  followers {
    ...MinimalUser
  }
  followings {
    ...MinimalUser
  }
}
    ${MinimalUserFragmentDoc}`;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  email
  isFollowing
  profile {
    ...RegularProfile
  }
}
    ${RegularProfileFragmentDoc}`;
export const AddCommentDocument = gql`
    mutation AddComment($text: String!, $postId: String!) {
  addComment(text: $text, postId: $postId) {
    ...RegularComment
  }
}
    ${RegularCommentFragmentDoc}`;
export type AddCommentMutationFn = Apollo.MutationFunction<AddCommentMutation, AddCommentMutationVariables>;

/**
 * __useAddCommentMutation__
 *
 * To run a mutation, you first call `useAddCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCommentMutation, { data, loading, error }] = useAddCommentMutation({
 *   variables: {
 *      text: // value for 'text'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useAddCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddCommentMutation, AddCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, options);
      }
export type AddCommentMutationHookResult = ReturnType<typeof useAddCommentMutation>;
export type AddCommentMutationResult = Apollo.MutationResult<AddCommentMutation>;
export type AddCommentMutationOptions = Apollo.BaseMutationOptions<AddCommentMutation, AddCommentMutationVariables>;
export const AddPostDocument = gql`
    mutation AddPost($file: Upload!, $caption: String!) {
  addPost(file: $file, caption: $caption) {
    ok
    post {
      id
      caption
      imgURL
      createdAt
      updatedAt
      user {
        username
      }
    }
    error {
      path
      message
    }
  }
}
    `;
export type AddPostMutationFn = Apollo.MutationFunction<AddPostMutation, AddPostMutationVariables>;

/**
 * __useAddPostMutation__
 *
 * To run a mutation, you first call `useAddPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostMutation, { data, loading, error }] = useAddPostMutation({
 *   variables: {
 *      file: // value for 'file'
 *      caption: // value for 'caption'
 *   },
 * });
 */
export function useAddPostMutation(baseOptions?: Apollo.MutationHookOptions<AddPostMutation, AddPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, options);
      }
export type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>;
export type AddPostMutationResult = Apollo.MutationResult<AddPostMutation>;
export type AddPostMutationOptions = Apollo.BaseMutationOptions<AddPostMutation, AddPostMutationVariables>;
export const ChangeProfilePhotoDocument = gql`
    mutation ChangeProfilePhoto($file: Upload) {
  changeProfilePhoto(file: $file)
}
    `;
export type ChangeProfilePhotoMutationFn = Apollo.MutationFunction<ChangeProfilePhotoMutation, ChangeProfilePhotoMutationVariables>;

/**
 * __useChangeProfilePhotoMutation__
 *
 * To run a mutation, you first call `useChangeProfilePhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProfilePhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProfilePhotoMutation, { data, loading, error }] = useChangeProfilePhotoMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useChangeProfilePhotoMutation(baseOptions?: Apollo.MutationHookOptions<ChangeProfilePhotoMutation, ChangeProfilePhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeProfilePhotoMutation, ChangeProfilePhotoMutationVariables>(ChangeProfilePhotoDocument, options);
      }
export type ChangeProfilePhotoMutationHookResult = ReturnType<typeof useChangeProfilePhotoMutation>;
export type ChangeProfilePhotoMutationResult = Apollo.MutationResult<ChangeProfilePhotoMutation>;
export type ChangeProfilePhotoMutationOptions = Apollo.BaseMutationOptions<ChangeProfilePhotoMutation, ChangeProfilePhotoMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: ID!) {
  deletePost(postId: $postId)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const EditCaptionDocument = gql`
    mutation EditCaption($postId: ID!, $caption: String!) {
  editCaption(postId: $postId, caption: $caption)
}
    `;
export type EditCaptionMutationFn = Apollo.MutationFunction<EditCaptionMutation, EditCaptionMutationVariables>;

/**
 * __useEditCaptionMutation__
 *
 * To run a mutation, you first call `useEditCaptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCaptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCaptionMutation, { data, loading, error }] = useEditCaptionMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      caption: // value for 'caption'
 *   },
 * });
 */
export function useEditCaptionMutation(baseOptions?: Apollo.MutationHookOptions<EditCaptionMutation, EditCaptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditCaptionMutation, EditCaptionMutationVariables>(EditCaptionDocument, options);
      }
export type EditCaptionMutationHookResult = ReturnType<typeof useEditCaptionMutation>;
export type EditCaptionMutationResult = Apollo.MutationResult<EditCaptionMutation>;
export type EditCaptionMutationOptions = Apollo.BaseMutationOptions<EditCaptionMutation, EditCaptionMutationVariables>;
export const EditProfileDocument = gql`
    mutation EditProfile($name: String!, $website: String!, $bio: String!, $gender: String!, $email: String!) {
  editProfile(
    name: $name
    website: $website
    bio: $bio
    gender: $gender
    email: $email
  ) {
    user {
      ...MinimalUser
    }
    errors {
      path
      message
    }
  }
}
    ${MinimalUserFragmentDoc}`;
export type EditProfileMutationFn = Apollo.MutationFunction<EditProfileMutation, EditProfileMutationVariables>;

/**
 * __useEditProfileMutation__
 *
 * To run a mutation, you first call `useEditProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProfileMutation, { data, loading, error }] = useEditProfileMutation({
 *   variables: {
 *      name: // value for 'name'
 *      website: // value for 'website'
 *      bio: // value for 'bio'
 *      gender: // value for 'gender'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useEditProfileMutation(baseOptions?: Apollo.MutationHookOptions<EditProfileMutation, EditProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument, options);
      }
export type EditProfileMutationHookResult = ReturnType<typeof useEditProfileMutation>;
export type EditProfileMutationResult = Apollo.MutationResult<EditProfileMutation>;
export type EditProfileMutationOptions = Apollo.BaseMutationOptions<EditProfileMutation, EditProfileMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    ok
    errors {
      path
      message
    }
    user {
      ...MinimalUser
    }
  }
}
    ${MinimalUserFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $username: String!, $password: String!) {
  register(email: $email, username: $username, password: $password) {
    ok
    errors {
      path
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ToggleFollowDocument = gql`
    mutation ToggleFollow($followingUsername: ID!) {
  toggleFollow(followingUsername: $followingUsername)
}
    `;
export type ToggleFollowMutationFn = Apollo.MutationFunction<ToggleFollowMutation, ToggleFollowMutationVariables>;

/**
 * __useToggleFollowMutation__
 *
 * To run a mutation, you first call `useToggleFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleFollowMutation, { data, loading, error }] = useToggleFollowMutation({
 *   variables: {
 *      followingUsername: // value for 'followingUsername'
 *   },
 * });
 */
export function useToggleFollowMutation(baseOptions?: Apollo.MutationHookOptions<ToggleFollowMutation, ToggleFollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleFollowMutation, ToggleFollowMutationVariables>(ToggleFollowDocument, options);
      }
export type ToggleFollowMutationHookResult = ReturnType<typeof useToggleFollowMutation>;
export type ToggleFollowMutationResult = Apollo.MutationResult<ToggleFollowMutation>;
export type ToggleFollowMutationOptions = Apollo.BaseMutationOptions<ToggleFollowMutation, ToggleFollowMutationVariables>;
export const ToggleLikeDocument = gql`
    mutation ToggleLike($postId: String!) {
  toggleLike(postId: $postId)
}
    `;
export type ToggleLikeMutationFn = Apollo.MutationFunction<ToggleLikeMutation, ToggleLikeMutationVariables>;

/**
 * __useToggleLikeMutation__
 *
 * To run a mutation, you first call `useToggleLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleLikeMutation, { data, loading, error }] = useToggleLikeMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useToggleLikeMutation(baseOptions?: Apollo.MutationHookOptions<ToggleLikeMutation, ToggleLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleLikeMutation, ToggleLikeMutationVariables>(ToggleLikeDocument, options);
      }
export type ToggleLikeMutationHookResult = ReturnType<typeof useToggleLikeMutation>;
export type ToggleLikeMutationResult = Apollo.MutationResult<ToggleLikeMutation>;
export type ToggleLikeMutationOptions = Apollo.BaseMutationOptions<ToggleLikeMutation, ToggleLikeMutationVariables>;
export const GetExplorePostsDocument = gql`
    query GetExplorePosts($limit: Int!, $offset: Int) {
  getExplorePosts(limit: $limit, offset: $offset) {
    posts {
      ...RegularPost
    }
    hasMore
  }
}
    ${RegularPostFragmentDoc}`;

/**
 * __useGetExplorePostsQuery__
 *
 * To run a query within a React component, call `useGetExplorePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExplorePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExplorePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetExplorePostsQuery(baseOptions: Apollo.QueryHookOptions<GetExplorePostsQuery, GetExplorePostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExplorePostsQuery, GetExplorePostsQueryVariables>(GetExplorePostsDocument, options);
      }
export function useGetExplorePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExplorePostsQuery, GetExplorePostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExplorePostsQuery, GetExplorePostsQueryVariables>(GetExplorePostsDocument, options);
        }
export type GetExplorePostsQueryHookResult = ReturnType<typeof useGetExplorePostsQuery>;
export type GetExplorePostsLazyQueryHookResult = ReturnType<typeof useGetExplorePostsLazyQuery>;
export type GetExplorePostsQueryResult = Apollo.QueryResult<GetExplorePostsQuery, GetExplorePostsQueryVariables>;
export const GetFollowSuggestionsDocument = gql`
    query GetFollowSuggestions {
  getFollowSuggestions {
    ...MinimalUser
  }
}
    ${MinimalUserFragmentDoc}`;

/**
 * __useGetFollowSuggestionsQuery__
 *
 * To run a query within a React component, call `useGetFollowSuggestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFollowSuggestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFollowSuggestionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFollowSuggestionsQuery(baseOptions?: Apollo.QueryHookOptions<GetFollowSuggestionsQuery, GetFollowSuggestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFollowSuggestionsQuery, GetFollowSuggestionsQueryVariables>(GetFollowSuggestionsDocument, options);
      }
export function useGetFollowSuggestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFollowSuggestionsQuery, GetFollowSuggestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFollowSuggestionsQuery, GetFollowSuggestionsQueryVariables>(GetFollowSuggestionsDocument, options);
        }
export type GetFollowSuggestionsQueryHookResult = ReturnType<typeof useGetFollowSuggestionsQuery>;
export type GetFollowSuggestionsLazyQueryHookResult = ReturnType<typeof useGetFollowSuggestionsLazyQuery>;
export type GetFollowSuggestionsQueryResult = Apollo.QueryResult<GetFollowSuggestionsQuery, GetFollowSuggestionsQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts($limit: Int!, $offset: Int) {
  getPosts(limit: $limit, offset: $offset) {
    posts {
      ...RegularPost
    }
    hasMore
  }
}
    ${RegularPostFragmentDoc}`;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetSinglePostDocument = gql`
    query GetSinglePost($postId: String!) {
  getSinglePost(postId: $postId) {
    ...RegularPost
  }
}
    ${RegularPostFragmentDoc}`;

/**
 * __useGetSinglePostQuery__
 *
 * To run a query within a React component, call `useGetSinglePostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSinglePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSinglePostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetSinglePostQuery(baseOptions: Apollo.QueryHookOptions<GetSinglePostQuery, GetSinglePostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSinglePostQuery, GetSinglePostQueryVariables>(GetSinglePostDocument, options);
      }
export function useGetSinglePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSinglePostQuery, GetSinglePostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSinglePostQuery, GetSinglePostQueryVariables>(GetSinglePostDocument, options);
        }
export type GetSinglePostQueryHookResult = ReturnType<typeof useGetSinglePostQuery>;
export type GetSinglePostLazyQueryHookResult = ReturnType<typeof useGetSinglePostLazyQuery>;
export type GetSinglePostQueryResult = Apollo.QueryResult<GetSinglePostQuery, GetSinglePostQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($username: String!) {
  getUser(username: $username) {
    ...RegularUser
    posts {
      ...RegularPost
    }
  }
}
    ${RegularUserFragmentDoc}
${RegularPostFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;