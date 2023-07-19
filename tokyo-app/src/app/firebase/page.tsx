'use client';

import useFirebase, { ref, uploadBytes } from '@/hooks/firebase';
import { Button, Card, Sheet } from '@mui/joy';
import { Typography } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

const FirebasePage = async () => {
  const [files, setFiles] = useState<File[]>([]);
  const { storage } = await useFirebase();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const arr = Array.from(event.target.files);
      setFiles((p) => [...p, ...arr]);
    }
  };

  const uploadImage = () => {
    files.map((file) => {
      const fileRef = ref(storage, 'uploaded/' + file.name);
      uploadBytes(fileRef, file).then((snapshot) => {
        console.log({ snapshot });
      });
    });
    setFiles([]);
  };

  console.log('rendered');

  return (
    <Card>
      <Typography variant='h4'>Upload File</Typography>
      <input type='file' accept='image/*,.jpg,.png,.gif' multiple onChange={handleChange} />
      <Button onClick={uploadImage}>送信</Button>
      <Typography>Selected</Typography>
      <Sheet>
        {files.map((file) => (
          <img key={file.name} src={URL.createObjectURL(file)} alt='' />
        ))}
      </Sheet>
      <Typography>Uploaded</Typography>
    </Card>
  );
};

export default FirebasePage;
