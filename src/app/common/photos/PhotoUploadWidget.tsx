import cuid from 'cuid';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Grid, Header } from 'semantic-ui-react';
import { uploadToFirebaseStorage } from '../../api/firestore/firebaseService';
import { updateUserProfilePhoto } from '../../api/firestore/firestoreService';
import { getFileExtension } from '../../utils/utils';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';

interface IPhotoUploadWidgetProps {
  setUploadPhotoMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const PhotoUploadWidget: React.FC<IPhotoUploadWidgetProps> = ({
  setUploadPhotoMode,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function handleUploadImage() {
    setIsLoading(true);
    const filename = `${cuid()}.${getFileExtension(files[0].name)}`;
    const uploadTask = uploadToFirebaseStorage(image!!, filename);
    uploadTask.on(
      'state_changed',
      (snapshot) => {},
      (error) => {
        toast.error(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          updateUserProfilePhoto(downloadURL, filename)
            .then(() => {
              setIsLoading(false);
              handleCancelCrop();
              setUploadPhotoMode(false);
            })
            .catch((error) => {
              toast.error(error.message);
              setIsLoading(false);
            });
        });
      }
    );
  }

  function handleCancelCrop(): void {
    setFiles([]);
    setImage(null);
  }

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header color='teal' sub content='Step 1 - Add Photo' />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color='teal' sub content='Step 2 - Resize' />
        {files.length > 0 && (
          <PhotoWidgetCropper
            setImage={setImage}
            imagePreview={(files[0] as any).preview}
          />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header color='teal' sub content='Step 3 - Preview & upload' />
        {files.length > 0 && (
          <>
            <div
              className='img-preview'
              style={{ minHeight: 200, minWidth: 200, overflow: 'hidden' }}
            />
            <Button.Group>
              <Button
                onClick={handleUploadImage}
                loading={isLoading}
                style={{ width: 100 }}
                positive
                icon='check'
              />
              <Button
                onClick={handleCancelCrop}
                disabled={isLoading}
                style={{ width: 100 }}
                icon='close'
              />
            </Button.Group>
          </>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default PhotoUploadWidget;
