import { graphql } from '../gql'

export const MeQueryDocument = graphql(/* GraphQL */ `
  query Me {
    me {
      ...MinimalUser
      profile {
        ...MinimalProfile
      }
    }
  }
`)

export const GetUserQueryDocument = graphql(/* GraphQL */ `
  query GetUser($username: String!) {
    getUser(username: $username) {
      ...RegularUser
      posts {
        ...RegularPost
      }
    }
  }
`)

export const GetExplorePostsQueryDocument = graphql(/* GraphQL */ `
  query GetExplorePosts($limit: Int!, $offset: Int) {
    getExplorePosts(limit: $limit, offset: $offset) {
      posts {
        ...RegularPost
      }
      hasMore
    }
  }
`)

export const GetPostsQueryDocument = graphql(/* GraphQL */ `
  query GetPosts($limit: Int!, $offset: Int) {
    getPosts(limit: $limit, offset: $offset) {
      posts {
        ...RegularPost
      }
      hasMore
    }
  }
`)

export const GetSinglePostQueryDocument = graphql(/* GraphQL */ `
  query GetSinglePost($postId: ID!) {
    getSinglePost(postId: $postId) {
      ...RegularPost
    }
  }
`)

export const GetFollowsQueryDocument = graphql(/* GraphQL */ `
  query GetFollows($userId: ID!) {
    getFollows(userId: $userId) {
      followers {
        ...MinimalUser
        isFollowing
      }
      followings {
        ...MinimalUser
        isFollowing
      }
    }
  }
`)

export const GetFollowSuggestionsQueryDocument = graphql(/* GraphQL */ `
  query GetFollowSuggestions {
    getFollowSuggestions {
      ...MinimalUser
      isFollowing
    }
  }
`)

export const GetUploadSignatureQueryDocument = graphql(/* GraphQL */ `
  query GetUploadSignature($pathPrefix: EnumFilePathPrefix!) {
    getUploadSignature(pathPrefix: $pathPrefix) {
      publicId
      signature
      timestamp
    }
  }
`)
