import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type Comment = {
  __typename?: 'Comment';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  text: Scalars['String'];
  postId: Scalars['String'];
  userId: Scalars['String'];
  username: Scalars['String'];
  user: User;
  post: Post;
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
  postId: Scalars['String'];
  user: User;
  post: Post;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  caption: Scalars['String'];
  imgURL: Scalars['String'];
  user: User;
  comments: Array<Comment>;
  likes: Array<Like>;
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  imgURL: Scalars['String'];
  name: Scalars['String'];
  website: Scalars['String'];
  bio: Scalars['String'];
  gender: Scalars['String'];
};

export type Follow = {
  __typename?: 'Follow';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  follower: User;
  following: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
  email: Scalars['String'];
  posts: Array<Post>;
  profile: Profile;
  followers: Array<Follow>;
  followings: Array<Follow>;
};

export type FieldError = {
  __typename?: 'FieldError';
  path: Scalars['String'];
  message: Scalars['String'];
};

export type CreatePostResponse = {
  __typename?: 'CreatePostResponse';
  ok: Scalars['Boolean'];
  post?: Maybe<Post>;
  error?: Maybe<FieldError>;
};

export type EditProfileResponse = {
  __typename?: 'EditProfileResponse';
  ok: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  ok: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  ok: Scalars['Boolean'];
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  getComments: Array<Comment>;
  getFollowSuggestions: Array<User>;
  getLikes: Array<Like>;
  getPosts: Array<Post>;
  getSinglePost?: Maybe<Post>;
  me?: Maybe<User>;
  getUser?: Maybe<User>;
};


export type QueryGetCommentsArgs = {
  postId: Scalars['String'];
};


export type QueryGetLikesArgs = {
  postId: Scalars['String'];
};


export type QueryGetSinglePostArgs = {
  postId: Scalars['String'];
};


export type QueryGetUserArgs = {
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addComment: Scalars['Boolean'];
  deleteComment: Scalars['Boolean'];
  toggleFollow: Scalars['Boolean'];
  toggleLike: Scalars['Boolean'];
  addPost: CreatePostResponse;
  changeProfilePhoto: Scalars['Boolean'];
  removeProfilePhoto: Scalars['Boolean'];
  editProfile: EditProfileResponse;
  register: RegisterResponse;
  login: LoginResponse;
  logout: Scalars['Boolean'];
};


export type MutationAddCommentArgs = {
  text: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['String'];
};


export type MutationToggleFollowArgs = {
  userId: Scalars['String'];
};


export type MutationToggleLikeArgs = {
  postId: Scalars['String'];
};


export type MutationAddPostArgs = {
  file: Scalars['Upload'];
  caption: Scalars['String'];
};


export type MutationChangeProfilePhotoArgs = {
  file?: Maybe<Scalars['Upload']>;
};


export type MutationEditProfileArgs = {
  name: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  website: Scalars['String'];
  bio: Scalars['String'];
  gender: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type RegularCommentFragment = (
  { __typename?: 'Comment' }
  & Pick<Comment, 'id' | 'text' | 'createdAt' | 'updatedAt' | 'username'>
  & { user: (
    { __typename?: 'User' }
    & UserWithProfileFragment
  ) }
);

export type RegularFollowFragment = (
  { __typename?: 'Follow' }
  & { follower: (
    { __typename?: 'User' }
    & UserFieldFragment
  ), following: (
    { __typename?: 'User' }
    & UserFieldFragment
  ) }
);

export type RegualarPostFragment = (
  { __typename?: 'Post' }
  & Pick<Post, 'id' | 'caption' | 'imgURL' | 'createdAt' | 'updatedAt'>
  & { user: (
    { __typename?: 'User' }
    & UserWithProfileFragment
  ), likes: Array<(
    { __typename?: 'Like' }
    & Pick<Like, 'id' | 'userId'>
  )>, comments: Array<(
    { __typename?: 'Comment' }
    & RegularCommentFragment
  )> }
);

export type RegularProfileFragment = (
  { __typename?: 'Profile' }
  & Pick<Profile, 'id' | 'name' | 'website' | 'bio' | 'gender' | 'imgURL'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & { followings: Array<(
    { __typename?: 'Follow' }
    & { following: (
      { __typename?: 'User' }
      & UserFieldFragment
    ) }
  )>, followers: Array<(
    { __typename?: 'Follow' }
    & { follower: (
      { __typename?: 'User' }
      & UserFieldFragment
    ) }
  )> }
  & UserWithProfileFragment
);

export type UserFieldFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username' | 'email'>
);

export type UserWithProfileFragment = (
  { __typename?: 'User' }
  & { profile: (
    { __typename?: 'Profile' }
    & RegularProfileFragment
  ) }
  & UserFieldFragment
);

export type AddCommentMutationVariables = Exact<{
  text: Scalars['String'];
  postId: Scalars['String'];
}>;


export type AddCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addComment'>
);

export type AddPostMutationVariables = Exact<{
  file: Scalars['Upload'];
  caption: Scalars['String'];
}>;


export type AddPostMutation = (
  { __typename?: 'Mutation' }
  & { addPost: (
    { __typename?: 'CreatePostResponse' }
    & Pick<CreatePostResponse, 'ok'>
    & { post?: Maybe<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'caption' | 'imgURL' | 'createdAt' | 'updatedAt'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
      ) }
    )>, error?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'path' | 'message'>
    )> }
  ) }
);

export type ChangeProfilePhotoMutationVariables = Exact<{
  file?: Maybe<Scalars['Upload']>;
}>;


export type ChangeProfilePhotoMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeProfilePhoto'>
);

export type EditProfileMutationVariables = Exact<{
  name: Scalars['String'];
  website: Scalars['String'];
  bio: Scalars['String'];
  gender: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
}>;


export type EditProfileMutation = (
  { __typename?: 'Mutation' }
  & { editProfile: (
    { __typename?: 'EditProfileResponse' }
    & Pick<EditProfileResponse, 'ok'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'path' | 'message'>
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'ok'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'path' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserFieldFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'RegisterResponse' }
    & Pick<RegisterResponse, 'ok'>
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'path' | 'message'>
    )>> }
  ) }
);

export type ToggleLikeMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type ToggleLikeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'toggleLike'>
);

export type GetCommentsQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type GetCommentsQuery = (
  { __typename?: 'Query' }
  & { getComments: Array<(
    { __typename?: 'Comment' }
    & RegularCommentFragment
  )> }
);

export type GetFollowSuggestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFollowSuggestionsQuery = (
  { __typename?: 'Query' }
  & { getFollowSuggestions: Array<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = (
  { __typename?: 'Query' }
  & { getPosts: Array<(
    { __typename?: 'Post' }
    & RegualarPostFragment
  )> }
);

export type GetSinglePostQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type GetSinglePostQuery = (
  { __typename?: 'Query' }
  & { getSinglePost?: Maybe<(
    { __typename?: 'Post' }
    & RegualarPostFragment
  )> }
);

export type GetUserQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserQuery = (
  { __typename?: 'Query' }
  & { getUser?: Maybe<(
    { __typename?: 'User' }
    & { posts: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'caption' | 'imgURL' | 'createdAt' | 'updatedAt'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'username'>
        & { profile: (
          { __typename?: 'Profile' }
          & Pick<Profile, 'imgURL'>
        ) }
      ), likes: Array<(
        { __typename?: 'Like' }
        & Pick<Like, 'id' | 'userId'>
      )>, comments: Array<(
        { __typename?: 'Comment' }
        & Pick<Comment, 'text' | 'userId'>
        & { user: (
          { __typename?: 'User' }
          & { profile: (
            { __typename?: 'Profile' }
            & Pick<Profile, 'imgURL'>
          ) }
        ) }
      )> }
    )> }
    & RegularUserFragment
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export const UserFieldFragmentDoc = gql`
    fragment UserField on User {
  id
  username
  email
}
    `;
export const RegularFollowFragmentDoc = gql`
    fragment RegularFollow on Follow {
  follower {
    ...UserField
  }
  following {
    ...UserField
  }
}
    ${UserFieldFragmentDoc}`;
export const RegularProfileFragmentDoc = gql`
    fragment RegularProfile on Profile {
  id
  name
  website
  bio
  gender
  imgURL
}
    `;
export const UserWithProfileFragmentDoc = gql`
    fragment UserWithProfile on User {
  ...UserField
  profile {
    ...RegularProfile
  }
}
    ${UserFieldFragmentDoc}
${RegularProfileFragmentDoc}`;
export const RegularCommentFragmentDoc = gql`
    fragment RegularComment on Comment {
  id
  text
  createdAt
  updatedAt
  username
  user {
    ...UserWithProfile
  }
}
    ${UserWithProfileFragmentDoc}`;
export const RegualarPostFragmentDoc = gql`
    fragment RegualarPost on Post {
  id
  caption
  imgURL
  createdAt
  updatedAt
  user {
    ...UserWithProfile
  }
  likes {
    id
    userId
  }
  comments {
    ...RegularComment
  }
}
    ${UserWithProfileFragmentDoc}
${RegularCommentFragmentDoc}`;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  ...UserWithProfile
  followings {
    following {
      ...UserField
    }
  }
  followers {
    follower {
      ...UserField
    }
  }
}
    ${UserWithProfileFragmentDoc}
${UserFieldFragmentDoc}`;
export const AddCommentDocument = gql`
    mutation AddComment($text: String!, $postId: String!) {
  addComment(text: $text, postId: $postId)
}
    `;
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
        return Apollo.useMutation<AddCommentMutation, AddCommentMutationVariables>(AddCommentDocument, baseOptions);
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
        return Apollo.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, baseOptions);
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
        return Apollo.useMutation<ChangeProfilePhotoMutation, ChangeProfilePhotoMutationVariables>(ChangeProfilePhotoDocument, baseOptions);
      }
export type ChangeProfilePhotoMutationHookResult = ReturnType<typeof useChangeProfilePhotoMutation>;
export type ChangeProfilePhotoMutationResult = Apollo.MutationResult<ChangeProfilePhotoMutation>;
export type ChangeProfilePhotoMutationOptions = Apollo.BaseMutationOptions<ChangeProfilePhotoMutation, ChangeProfilePhotoMutationVariables>;
export const EditProfileDocument = gql`
    mutation EditProfile($name: String!, $website: String!, $bio: String!, $gender: String!, $email: String!, $username: String!) {
  editProfile(
    name: $name
    website: $website
    bio: $bio
    gender: $gender
    username: $username
    email: $email
  ) {
    ok
    errors {
      path
      message
    }
  }
}
    `;
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
 *      username: // value for 'username'
 *   },
 * });
 */
export function useEditProfileMutation(baseOptions?: Apollo.MutationHookOptions<EditProfileMutation, EditProfileMutationVariables>) {
        return Apollo.useMutation<EditProfileMutation, EditProfileMutationVariables>(EditProfileDocument, baseOptions);
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
      ...UserField
    }
  }
}
    ${UserFieldFragmentDoc}`;
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
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
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
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
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
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
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
        return Apollo.useMutation<ToggleLikeMutation, ToggleLikeMutationVariables>(ToggleLikeDocument, baseOptions);
      }
export type ToggleLikeMutationHookResult = ReturnType<typeof useToggleLikeMutation>;
export type ToggleLikeMutationResult = Apollo.MutationResult<ToggleLikeMutation>;
export type ToggleLikeMutationOptions = Apollo.BaseMutationOptions<ToggleLikeMutation, ToggleLikeMutationVariables>;
export const GetCommentsDocument = gql`
    query GetComments($postId: String!) {
  getComments(postId: $postId) {
    ...RegularComment
  }
}
    ${RegularCommentFragmentDoc}`;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetCommentsQuery(baseOptions: Apollo.QueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
        return Apollo.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, baseOptions);
      }
export function useGetCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
          return Apollo.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, baseOptions);
        }
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>;
export type GetCommentsLazyQueryHookResult = ReturnType<typeof useGetCommentsLazyQuery>;
export type GetCommentsQueryResult = Apollo.QueryResult<GetCommentsQuery, GetCommentsQueryVariables>;
export const GetFollowSuggestionsDocument = gql`
    query GetFollowSuggestions {
  getFollowSuggestions {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

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
        return Apollo.useQuery<GetFollowSuggestionsQuery, GetFollowSuggestionsQueryVariables>(GetFollowSuggestionsDocument, baseOptions);
      }
export function useGetFollowSuggestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFollowSuggestionsQuery, GetFollowSuggestionsQueryVariables>) {
          return Apollo.useLazyQuery<GetFollowSuggestionsQuery, GetFollowSuggestionsQueryVariables>(GetFollowSuggestionsDocument, baseOptions);
        }
export type GetFollowSuggestionsQueryHookResult = ReturnType<typeof useGetFollowSuggestionsQuery>;
export type GetFollowSuggestionsLazyQueryHookResult = ReturnType<typeof useGetFollowSuggestionsLazyQuery>;
export type GetFollowSuggestionsQueryResult = Apollo.QueryResult<GetFollowSuggestionsQuery, GetFollowSuggestionsQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts {
  getPosts {
    ...RegualarPost
  }
}
    ${RegualarPostFragmentDoc}`;

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
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, baseOptions);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, baseOptions);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetSinglePostDocument = gql`
    query GetSinglePost($postId: String!) {
  getSinglePost(postId: $postId) {
    ...RegualarPost
  }
}
    ${RegualarPostFragmentDoc}`;

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
        return Apollo.useQuery<GetSinglePostQuery, GetSinglePostQueryVariables>(GetSinglePostDocument, baseOptions);
      }
export function useGetSinglePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSinglePostQuery, GetSinglePostQueryVariables>) {
          return Apollo.useLazyQuery<GetSinglePostQuery, GetSinglePostQueryVariables>(GetSinglePostDocument, baseOptions);
        }
export type GetSinglePostQueryHookResult = ReturnType<typeof useGetSinglePostQuery>;
export type GetSinglePostLazyQueryHookResult = ReturnType<typeof useGetSinglePostLazyQuery>;
export type GetSinglePostQueryResult = Apollo.QueryResult<GetSinglePostQuery, GetSinglePostQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($username: String!) {
  getUser(username: $username) {
    ...RegularUser
    posts {
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
      likes {
        id
        userId
      }
      comments {
        text
        userId
        user {
          profile {
            imgURL
          }
        }
      }
    }
  }
}
    ${RegularUserFragmentDoc}`;

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
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, baseOptions);
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
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;