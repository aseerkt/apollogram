/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment MinimalPost on Post {\n    id\n    caption\n    imgURL\n    createdAt\n    updatedAt\n    \n    user {\n      username\n      imgURL\n    }\n    likeCount\n    comments {\n      text\n      user {\n        username\n        imgURL\n      }\n    }\n  }\n": types.MinimalPostFragmentDoc,
    "\n  fragment MinimalProfile on Profile {\n    id\n    website\n    bio\n    gender\n  }\n": types.MinimalProfileFragmentDoc,
    "\n  fragment MinimalUser on User {\n    id\n    username\n    email\n    imgURL\n    name\n  }\n": types.MinimalUserFragmentDoc,
    "\n  fragment RegularComment on Comment {\n    id\n    text\n    createdAt\n    updatedAt\n    user {\n      ...MinimalUser\n    }\n  }\n": types.RegularCommentFragmentDoc,
    "\n  fragment RegularPost on Post {\n    id\n    caption\n    imgURL\n    likeCount\n    userLike\n    createdAt\n    updatedAt\n    user {\n      ...MinimalUser\n    }\n    comments {\n      ...RegularComment\n    }\n  }\n": types.RegularPostFragmentDoc,
    "\n  fragment RegularUser on User {\n    id\n    username\n    email\n    name\n    imgURL\n    isFollowing\n    profile {\n      ...MinimalProfile\n    }\n  }\n": types.RegularUserFragmentDoc,
    "\n  mutation AddComment($text: String!, $postId: ID!) {\n    addComment(text: $text, postId: $postId) {\n      ...RegularComment\n    }\n  }\n": types.AddCommentDocument,
    "\n  mutation AddPost($caption: String!, $uploadResult: CloudinaryUploadResult!) {\n    addPost(caption: $caption, uploadResult: $uploadResult) {\n      ok\n      post {\n        id\n        caption\n        imgURL\n        createdAt\n        updatedAt\n        user {\n          username\n        }\n      }\n      error {\n        path\n        message\n      }\n    }\n  }\n": types.AddPostDocument,
    "\n  mutation ChangeProfilePhoto($uploadResult: CloudinaryUploadResult!) {\n    changeProfilePhoto(uploadResult: $uploadResult)\n  }\n": types.ChangeProfilePhotoDocument,
    "\n  mutation DeletePost($postId: ID!) {\n    deletePost(postId: $postId)\n  }\n": types.DeletePostDocument,
    "\n  mutation EditCaption($postId: ID!, $caption: String!) {\n    editCaption(postId: $postId, caption: $caption)\n  }\n": types.EditCaptionDocument,
    "\n  mutation EditProfile(\n    $name: String!\n    $website: String!\n    $bio: String!\n    $gender: String!\n    $email: String!\n  ) {\n    editProfile(\n      name: $name\n      website: $website\n      bio: $bio\n      gender: $gender\n      email: $email\n    ) {\n      user {\n        ...MinimalUser\n        profile {\n          ...MinimalProfile\n        }\n      }\n      errors {\n        path\n        message\n      }\n    }\n  }\n": types.EditProfileDocument,
    "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      ok\n      errors {\n        path\n        message\n      }\n      user {\n        ...MinimalUser\n      }\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Register($email: String!, $username: String!, $password: String!) {\n    register(email: $email, username: $username, password: $password) {\n      ok\n      errors {\n        path\n        message\n      }\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation ToggleFollow($followingId: ID!) {\n    toggleFollow(followingId: $followingId)\n  }\n": types.ToggleFollowDocument,
    "\n  mutation ToggleLike($postId: ID!) {\n    toggleLike(postId: $postId)\n  }\n": types.ToggleLikeDocument,
    "\n  query Me {\n    me {\n      ...MinimalUser\n      profile {\n        ...MinimalProfile\n      }\n    }\n  }\n": types.MeDocument,
    "\n  query GetUser($username: String!) {\n    getUser(username: $username) {\n      ...RegularUser\n      posts {\n        ...RegularPost\n      }\n    }\n  }\n": types.GetUserDocument,
    "\n  query GetExplorePosts($limit: Int!, $offset: Int) {\n    getExplorePosts(limit: $limit, offset: $offset) {\n      posts {\n        ...RegularPost\n      }\n      hasMore\n    }\n  }\n": types.GetExplorePostsDocument,
    "\n  query GetPosts($limit: Int!, $offset: Int) {\n    getPosts(limit: $limit, offset: $offset) {\n      posts {\n        ...RegularPost\n      }\n      hasMore\n    }\n  }\n": types.GetPostsDocument,
    "\n  query GetSinglePost($postId: ID!) {\n    getSinglePost(postId: $postId) {\n      ...RegularPost\n    }\n  }\n": types.GetSinglePostDocument,
    "\n  query GetFollows($userId: ID!) {\n    getFollows(userId: $userId) {\n      followers {\n        ...MinimalUser\n        isFollowing\n      }\n      followings {\n        ...MinimalUser\n        isFollowing\n      }\n    }\n  }\n": types.GetFollowsDocument,
    "\n  query GetFollowSuggestions {\n    getFollowSuggestions {\n      ...MinimalUser\n      isFollowing\n    }\n  }\n": types.GetFollowSuggestionsDocument,
    "\n  query GetUploadSignature($pathPrefix: EnumFilePathPrefix!) {\n    getUploadSignature(pathPrefix: $pathPrefix) {\n      publicId\n      signature\n      timestamp\n    }\n  }\n": types.GetUploadSignatureDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MinimalPost on Post {\n    id\n    caption\n    imgURL\n    createdAt\n    updatedAt\n    \n    user {\n      username\n      imgURL\n    }\n    likeCount\n    comments {\n      text\n      user {\n        username\n        imgURL\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment MinimalPost on Post {\n    id\n    caption\n    imgURL\n    createdAt\n    updatedAt\n    \n    user {\n      username\n      imgURL\n    }\n    likeCount\n    comments {\n      text\n      user {\n        username\n        imgURL\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MinimalProfile on Profile {\n    id\n    website\n    bio\n    gender\n  }\n"): (typeof documents)["\n  fragment MinimalProfile on Profile {\n    id\n    website\n    bio\n    gender\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MinimalUser on User {\n    id\n    username\n    email\n    imgURL\n    name\n  }\n"): (typeof documents)["\n  fragment MinimalUser on User {\n    id\n    username\n    email\n    imgURL\n    name\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RegularComment on Comment {\n    id\n    text\n    createdAt\n    updatedAt\n    user {\n      ...MinimalUser\n    }\n  }\n"): (typeof documents)["\n  fragment RegularComment on Comment {\n    id\n    text\n    createdAt\n    updatedAt\n    user {\n      ...MinimalUser\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RegularPost on Post {\n    id\n    caption\n    imgURL\n    likeCount\n    userLike\n    createdAt\n    updatedAt\n    user {\n      ...MinimalUser\n    }\n    comments {\n      ...RegularComment\n    }\n  }\n"): (typeof documents)["\n  fragment RegularPost on Post {\n    id\n    caption\n    imgURL\n    likeCount\n    userLike\n    createdAt\n    updatedAt\n    user {\n      ...MinimalUser\n    }\n    comments {\n      ...RegularComment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment RegularUser on User {\n    id\n    username\n    email\n    name\n    imgURL\n    isFollowing\n    profile {\n      ...MinimalProfile\n    }\n  }\n"): (typeof documents)["\n  fragment RegularUser on User {\n    id\n    username\n    email\n    name\n    imgURL\n    isFollowing\n    profile {\n      ...MinimalProfile\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddComment($text: String!, $postId: ID!) {\n    addComment(text: $text, postId: $postId) {\n      ...RegularComment\n    }\n  }\n"): (typeof documents)["\n  mutation AddComment($text: String!, $postId: ID!) {\n    addComment(text: $text, postId: $postId) {\n      ...RegularComment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddPost($caption: String!, $uploadResult: CloudinaryUploadResult!) {\n    addPost(caption: $caption, uploadResult: $uploadResult) {\n      ok\n      post {\n        id\n        caption\n        imgURL\n        createdAt\n        updatedAt\n        user {\n          username\n        }\n      }\n      error {\n        path\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddPost($caption: String!, $uploadResult: CloudinaryUploadResult!) {\n    addPost(caption: $caption, uploadResult: $uploadResult) {\n      ok\n      post {\n        id\n        caption\n        imgURL\n        createdAt\n        updatedAt\n        user {\n          username\n        }\n      }\n      error {\n        path\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ChangeProfilePhoto($uploadResult: CloudinaryUploadResult!) {\n    changeProfilePhoto(uploadResult: $uploadResult)\n  }\n"): (typeof documents)["\n  mutation ChangeProfilePhoto($uploadResult: CloudinaryUploadResult!) {\n    changeProfilePhoto(uploadResult: $uploadResult)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeletePost($postId: ID!) {\n    deletePost(postId: $postId)\n  }\n"): (typeof documents)["\n  mutation DeletePost($postId: ID!) {\n    deletePost(postId: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EditCaption($postId: ID!, $caption: String!) {\n    editCaption(postId: $postId, caption: $caption)\n  }\n"): (typeof documents)["\n  mutation EditCaption($postId: ID!, $caption: String!) {\n    editCaption(postId: $postId, caption: $caption)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation EditProfile(\n    $name: String!\n    $website: String!\n    $bio: String!\n    $gender: String!\n    $email: String!\n  ) {\n    editProfile(\n      name: $name\n      website: $website\n      bio: $bio\n      gender: $gender\n      email: $email\n    ) {\n      user {\n        ...MinimalUser\n        profile {\n          ...MinimalProfile\n        }\n      }\n      errors {\n        path\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation EditProfile(\n    $name: String!\n    $website: String!\n    $bio: String!\n    $gender: String!\n    $email: String!\n  ) {\n    editProfile(\n      name: $name\n      website: $website\n      bio: $bio\n      gender: $gender\n      email: $email\n    ) {\n      user {\n        ...MinimalUser\n        profile {\n          ...MinimalProfile\n        }\n      }\n      errors {\n        path\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      ok\n      errors {\n        path\n        message\n      }\n      user {\n        ...MinimalUser\n      }\n      token\n    }\n  }\n"): (typeof documents)["\n  mutation Login($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      ok\n      errors {\n        path\n        message\n      }\n      user {\n        ...MinimalUser\n      }\n      token\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($email: String!, $username: String!, $password: String!) {\n    register(email: $email, username: $username, password: $password) {\n      ok\n      errors {\n        path\n        message\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation Register($email: String!, $username: String!, $password: String!) {\n    register(email: $email, username: $username, password: $password) {\n      ok\n      errors {\n        path\n        message\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ToggleFollow($followingId: ID!) {\n    toggleFollow(followingId: $followingId)\n  }\n"): (typeof documents)["\n  mutation ToggleFollow($followingId: ID!) {\n    toggleFollow(followingId: $followingId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ToggleLike($postId: ID!) {\n    toggleLike(postId: $postId)\n  }\n"): (typeof documents)["\n  mutation ToggleLike($postId: ID!) {\n    toggleLike(postId: $postId)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Me {\n    me {\n      ...MinimalUser\n      profile {\n        ...MinimalProfile\n      }\n    }\n  }\n"): (typeof documents)["\n  query Me {\n    me {\n      ...MinimalUser\n      profile {\n        ...MinimalProfile\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUser($username: String!) {\n    getUser(username: $username) {\n      ...RegularUser\n      posts {\n        ...RegularPost\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetUser($username: String!) {\n    getUser(username: $username) {\n      ...RegularUser\n      posts {\n        ...RegularPost\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetExplorePosts($limit: Int!, $offset: Int) {\n    getExplorePosts(limit: $limit, offset: $offset) {\n      posts {\n        ...RegularPost\n      }\n      hasMore\n    }\n  }\n"): (typeof documents)["\n  query GetExplorePosts($limit: Int!, $offset: Int) {\n    getExplorePosts(limit: $limit, offset: $offset) {\n      posts {\n        ...RegularPost\n      }\n      hasMore\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPosts($limit: Int!, $offset: Int) {\n    getPosts(limit: $limit, offset: $offset) {\n      posts {\n        ...RegularPost\n      }\n      hasMore\n    }\n  }\n"): (typeof documents)["\n  query GetPosts($limit: Int!, $offset: Int) {\n    getPosts(limit: $limit, offset: $offset) {\n      posts {\n        ...RegularPost\n      }\n      hasMore\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSinglePost($postId: ID!) {\n    getSinglePost(postId: $postId) {\n      ...RegularPost\n    }\n  }\n"): (typeof documents)["\n  query GetSinglePost($postId: ID!) {\n    getSinglePost(postId: $postId) {\n      ...RegularPost\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFollows($userId: ID!) {\n    getFollows(userId: $userId) {\n      followers {\n        ...MinimalUser\n        isFollowing\n      }\n      followings {\n        ...MinimalUser\n        isFollowing\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetFollows($userId: ID!) {\n    getFollows(userId: $userId) {\n      followers {\n        ...MinimalUser\n        isFollowing\n      }\n      followings {\n        ...MinimalUser\n        isFollowing\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetFollowSuggestions {\n    getFollowSuggestions {\n      ...MinimalUser\n      isFollowing\n    }\n  }\n"): (typeof documents)["\n  query GetFollowSuggestions {\n    getFollowSuggestions {\n      ...MinimalUser\n      isFollowing\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUploadSignature($pathPrefix: EnumFilePathPrefix!) {\n    getUploadSignature(pathPrefix: $pathPrefix) {\n      publicId\n      signature\n      timestamp\n    }\n  }\n"): (typeof documents)["\n  query GetUploadSignature($pathPrefix: EnumFilePathPrefix!) {\n    getUploadSignature(pathPrefix: $pathPrefix) {\n      publicId\n      signature\n      timestamp\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;