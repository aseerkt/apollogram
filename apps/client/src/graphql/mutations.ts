import { graphql } from '../gql'

export const AddCommentMutationDocument = graphql(/* GraphQL */ `
  mutation AddComment($text: String!, $postId: ID!) {
    addComment(text: $text, postId: $postId) {
      ...RegularComment
    }
  }
`)

export const AddPostMutationDocument = graphql(/* GraphQL */ `
  mutation AddPost($caption: String!, $uploadResult: CloudinaryUploadResult!) {
    addPost(caption: $caption, uploadResult: $uploadResult) {
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
`)

export const ChangeProfilePhotoMutationDocument = graphql(/* GraphQL */ `
  mutation ChangeProfilePhoto($uploadResult: CloudinaryUploadResult!) {
    changeProfilePhoto(uploadResult: $uploadResult)
  }
`)

export const DeletePostMutationDocument = graphql(/* GraphQL */ `
  mutation DeletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`)

export const EditCaptionMutationDocument = graphql(/* GraphQL */ `
  mutation EditCaption($postId: ID!, $caption: String!) {
    editCaption(postId: $postId, caption: $caption)
  }
`)

export const EditProfileMutationDocument = graphql(/* GraphQL */ `
  mutation EditProfile(
    $name: String!
    $website: String!
    $bio: String!
    $gender: String!
    $email: String!
  ) {
    editProfile(
      name: $name
      website: $website
      bio: $bio
      gender: $gender
      email: $email
    ) {
      user {
        ...MinimalUser
        profile {
          ...MinimalProfile
        }
      }
      errors {
        path
        message
      }
    }
  }
`)

export const LoginMutationDocument = graphql(/* GraphQL */ `
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
      token
    }
  }
`)

export const RegisterMutationDocument = graphql(/* GraphQL */ `
  mutation Register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`)

export const ToggleFollowMutationDocument = graphql(/* GraphQL */ `
  mutation ToggleFollow($followingId: ID!) {
    toggleFollow(followingId: $followingId)
  }
`)

export const ToggleLikeMutationDocument = graphql(/* GraphQL */ `
  mutation ToggleLike($postId: ID!) {
    toggleLike(postId: $postId)
  }
`)
