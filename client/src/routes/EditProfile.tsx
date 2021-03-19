import { useEffect, useState } from 'react';
import { apolloClient } from '../utils/apolloClient';
import Button from '../components-ui/Button';
import Container from '../components-ui/Container';
import InputField from '../components-ui/InputField';
import { MeDocument, useEditProfileMutation, User } from '../generated/graphql';
// import { useRouteMatch } from 'react-router-dom';
import ChangeProfilePhoto from '../components/ChangeProfilePhoto';

const EditProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    bio: '',
    gender: '',
    username: '',
    email: '',
  });

  // const match = useRouteMatch();

  const { me } = apolloClient.readQuery({ query: MeDocument });

  const user: User = me;

  useEffect(() => {
    setFormData({
      ...formData,
      name: user.profile.name,
      website: user.profile.website,
      bio: user.profile.bio,
      gender: user.profile.gender,
      username: user.username,
      email: user.email,
    });
  }, [me, setFormData, user, formData]);

  const { name, website, bio, gender, username, email } = formData;

  const [formErrors, setFormErrors] = useState({
    website: '',
    username: '',
    email: '',
  });

  const [editProfile] = useEditProfileMutation({
    variables: { name, website, bio, gender, email, username },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors({} as any);
    try {
      const res = await editProfile();
      if (res.data) {
        const { errors } = res.data.editProfile;
        if (errors) {
          errors.forEach(({ path, message }) => {
            setFormErrors((prev) => ({ ...prev, [path]: message }));
          });
        }
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <div className='flex bg-white border border-gray-300 rounded-lg md:pl-0'>
        <div className='hidden pt-5 border-gray-300 md:w-80 md:border-r md:flex'>
          <div className='flex flex-col flex-1'>
            <ul>
              <li className='px-5 py-2 font-bold border-l-2 border-black'>
                Edit Profile
              </li>
              <li className='px-5 py-2'>Change Password</li>
            </ul>
          </div>
        </div>
        <div className='flex flex-col w-full p-5 md:mx-20'>
          <div className='py-4'>
            <ChangeProfilePhoto username={username} />
          </div>
          <form className='flex flex-col w-full' onSubmit={onSubmit}>
            <InputField
              inline
              name='name'
              label='Name'
              error=''
              helperText="Help people discover your account by using the name you're known by: either your full name, nickname, or business name."
              value={name}
              onChange={onChange}
            />
            <InputField
              inline
              name='username'
              label='Username'
              error={formErrors.username}
              value={username}
              onChange={onChange}
            />
            <InputField
              inline
              type='url'
              name='website'
              label='Website'
              error={formErrors.website}
              value={website}
              onChange={onChange}
            />
            <div className='gap-10 mb-5 md:grid md:grid-cols-2-form'>
              <label htmlFor='bio' className='block font-bold md:text-right'>
                Bio
              </label>
              <textarea
                name='bio'
                className='w-full px-2 py-1 mb-3 border border-gray-300 rounded-md bg-blue-50 focus:border-gray-500'
                value={bio}
                onChange={(e) => {
                  setFormData({ ...formData, bio: e.target.value });
                }}
              ></textarea>
            </div>

            <InputField
              inline
              name='email'
              label='Email'
              error={formErrors.email}
              value={email}
              onChange={onChange}
            />

            <InputField
              inline
              name='gender'
              label='Gender'
              error=''
              value={gender}
              onChange={onChange}
            />
            <div className='gap-10 mb-5 md:grid md:grid-cols-2-form'>
              <div></div>
              <Button
                className='inline-block w-20 text-left'
                disabled={!username}
                color='dark'
                type='submit'
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default EditProfile;
