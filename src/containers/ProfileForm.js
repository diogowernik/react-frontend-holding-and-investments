import { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import { addProfile, updateProfile } from '../apis';
import AuthContext from '../contexts/AuthContext';
import ImageDropzone from './ImageDropzone';

const ProfileForm = ({ onDone, editingProfile }) => {
  const [name, setName] = useState(editingProfile ? editingProfile.name : '');
  const [image, setImage] = useState(editingProfile ? editingProfile.image : '');
  const [message, setMessage] = useState(editingProfile ? editingProfile.message : '');

  const auth = useContext(AuthContext);

  const onClick = async () => {
    const profileData = { name, image, message };
    let json;

    if (editingProfile) {
      json = await updateProfile(editingProfile.id, profileData, auth.token);
    } else {
      json = await addProfile(profileData, auth.token);
    }

    if (json) {
      setName('');
      setImage('');
      setMessage('');
      onDone();
    }
  };

  return (
    <div>
      <h4 className='text-center'>Profile</h4>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Enter Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image</Form.Label>
        <ImageDropzone value={image} onChange={setImage} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Message</Form.Label>
        <Form.Control
          as='textarea'
          placeholder='Enter a personal message or bio'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Form.Group>
      <Button variant='standard' block onClick={onClick}>
        {editingProfile ? 'Update' : 'Add'}
      </Button>
    </div>
  );
};

export default ProfileForm;
