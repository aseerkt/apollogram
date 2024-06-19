import SelectField from '@/shared/SelectField'
import { Field, Form, Formik } from 'formik'
import ChangeProfilePhoto from '../components/ChangeProfilePhoto'
import { useToast } from '../context/toast'
import {
  MeDocument,
  useEditProfileMutation,
  useMeQuery,
} from '../generated/graphql'
import Button from '../shared/Button'
import Container from '../shared/Container'
import InputField from '../shared/InputField'

const EditProfile: React.FC = () => {
  const toast = useToast()
  const { data } = useMeQuery()
  const [editProfile] = useEditProfileMutation()

  if (!data) return null

  const user = data.me!

  return (
    <Container>
      <div className='flex rounded-lg border border-gray-300 bg-white md:pl-0'>
        <div className='hidden border-gray-300 pt-5 md:flex md:w-80 md:border-r'>
          <div className='flex flex-1 flex-col'>
            <ul>
              <li className='border-l-2 border-black px-5 py-2 font-bold'>
                Edit Profile
              </li>
              {/* <li className='px-5 py-2'>Change Password</li> */}
            </ul>
          </div>
        </div>
        <div className='flex w-full flex-col p-5 md:mx-20'>
          <div className='py-4'>
            <ChangeProfilePhoto username={user.username} />
          </div>
          <Formik
            initialValues={{
              name: user.name,
              website: user.profile.website,
              bio: user.profile.bio,
              gender: user.profile.gender,
              email: user.email,
            }}
            onSubmit={async (values, action) => {
              try {
                await editProfile({
                  variables: values,
                  update: (cache, { data }) => {
                    if (data) {
                      const { errors, user } = data.editProfile
                      if (errors) {
                        errors.forEach(({ path, message }) => {
                          action.setFieldError(path, message)
                        })
                      }
                      if (user) {
                        cache.writeQuery({
                          query: MeDocument,
                          data: { me: user },
                        })
                        toast('Profile updated')
                      }
                    }
                  },
                })
              } catch (err) {
                // console.log(err);
              }
            }}
          >
            {({ isSubmitting, values: { email } }) => (
              <Form className='mb-5 flex w-full flex-col'>
                <InputField
                  inline
                  name='name'
                  label='Name'
                  error=''
                  helperText="Help people discover your account by using the name you're known by: either your full name, nickname, or business name."
                />
                <InputField inline type='url' name='website' label='Website' />
                <div className='md:grid-cols-2-form mb-5 gap-10 md:grid'>
                  <label
                    htmlFor='bio'
                    className='block font-bold md:text-right'
                  >
                    Bio
                  </label>
                  <Field
                    as='textarea'
                    name='bio'
                    row='3'
                    className='mb-3 w-full rounded-md border border-gray-300 bg-blue-50 px-2 py-1 focus:border-gray-500'
                  ></Field>
                </div>

                <InputField inline name='email' label='Email' />
                <SelectField inline name='gender' label='Gender'>
                  <option value='Male'>Male</option>
                  <option value='Female'>Female</option>
                  <option value='Prefer not to say'>Prefer not to say</option>
                </SelectField>
                <div className='md:grid-cols-2-form mb-5 gap-10 md:grid'>
                  <div aria-label='offset'></div>
                  <Button
                    isLoading={isSubmitting}
                    className='w-24'
                    disabled={!email}
                    color='dark'
                    type='submit'
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Container>
  )
}

export default EditProfile
