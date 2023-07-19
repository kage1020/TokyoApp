import { Input, Sheet } from '@mui/joy';
import { useState } from 'react';
import Image from 'next/image';
import useFirebase from '@/hooks/firebase';

export default async function UploadSheet() {
  const [file, setFile] = useState<File | null>(null);
  const { storage, files, ref, uploadBytes } = await useFirebase();

  console.log('rendered');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      // const storage = getStorage();
      const fileRef = ref(storage, 'uploaded/' + file.name);
      uploadBytes(fileRef, file).then((snapshot) => {
        console.log({ snapshot });
        setFile(null);
      });
    }
  };

  return (
    <Sheet variant='outlined' color='neutral' sx={{ p: 4 }}>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <Input type='file' onChange={handleChange} />
        <button type='submit'>送信</button>
      </form>
      {/* <div>
        {files.items.map((item) => (
          <Image key={item.name} src={item.bucket} alt='' />
        ))}
      </div> */}
    </Sheet>
  );
}
