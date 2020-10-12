import React, { useState } from 'react';
import { Button, Grid, Header, Icon, Step } from 'semantic-ui-react';
import cuid from 'cuid';
import { uploadToFirebaseStorage } from '../../api/firestore/firebaseService';
import { getFileExtension } from '../../utils/utils';
import { updateUserProfilePhoto } from '../../api/firestore/firestoreService';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';
import { toast } from 'react-toastify';
import PhotoWidgetCropper from './PhotoWidgetCropper';

interface IPhotoUploadWidgetProps {
  setUploadPhotoMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IDropzoneStyles {
  textAlign:
    | 'center'
    | 'inherit'
    | '-moz-initial'
    | 'initial'
    | 'revert'
    | 'unset'
    | 'end'
    | 'justify'
    | 'left'
    | 'match-parent'
    | 'right'
    | 'start'
    | undefined;
  border: string;
  borderRadius: string;
  paddingTop: string;
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

  const dropzoneStyles: IDropzoneStyles = {
    border: 'dashed 3px #eee',
    borderRadius: '5%',
    paddingTop: '30px',
    textAlign: 'center',
  };

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Step.Group size='mini' fluid widths={5}>
            <Step>
              <Icon name='upload' />
              <Step.Content>
                <Step.Title>Add Photo</Step.Title>
              </Step.Content>
            </Step>
            <Step disabled={files.length === 0}>
              <Icon name='cut' />
              <Step.Content>
                <Step.Title>Resize</Step.Title>
              </Step.Content>
            </Step>
            <Step disabled={files.length === 0}>
              <Icon name='cloud upload' />
              <Step.Content>
                <Step.Title>Preview & upload</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column width={5}>
          <PhotoWidgetDropzone setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={5}>
          {files.length > 0 ? (
            <PhotoWidgetCropper
              setImage={setImage}
              imagePreview={(files[0] as any).preview}
            />
          ) : (
            <div style={{ ...dropzoneStyles }}>
              <Icon name='cut' size='huge' />
              <Header content='Resize' />
            </div>
          )}
        </Grid.Column>
        <Grid.Column width={5}>
          {files.length > 0 ? (
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
          ) : (
            <div style={{ ...dropzoneStyles }}>
              <Icon name='cloud upload' size='huge' />
              <Header content='Validate & upload' />
            </div>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default PhotoUploadWidget;
