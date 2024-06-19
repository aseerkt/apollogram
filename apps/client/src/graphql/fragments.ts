import { graphql } from '@/gql'

export const MinimalPostFragment = graphql(/* GraphQL */ `
  fragment MinimalPost on Post {
    id
    caption
    imgURL
    createdAt
    updatedAt
    
    user {
      username
      imgURL
    }
    likeCount
    comments {
      text
      user {
        username
        imgURL
      }
    }
  }
`)

export const MinimalProfileFragment = graphql(/* GraphQL */ `
  fragment MinimalProfile on Profile {
    id
    website
    bio
    gender
  }
`)

export const MinimalUserFragment = graphql(/* GraphQL */ `
  fragment MinimalUser on User {
    id
    username
    email
    imgURL
    name
  }
`)

export const RegularCommentFragment = graphql(/* GraphQL */ `
  fragment RegularComment on Comment {
    id
    text
    createdAt
    updatedAt
    user {
      ...MinimalUser
    }
  }
`)

export const RegularPostFragment = graphql(/* GraphQL */ `
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
`)

export const RegularUserFragment = graphql(/* GraphQL */ `
  fragment RegularUser on User {
    id
    username
    email
    name
    imgURL
    isFollowing
    profile {
      ...MinimalProfile
    }
  }
`)
