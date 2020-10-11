import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Grid, Header, Button, Tab, Card, Image } from 'semantic-ui-react';
import { deleteFromFirebaseStorage } from '../../../../app/api/firestore/firebaseService';
import {
  deletePhotoFromCollection,
  getUserPhotos,
  setMainPhoto,
} from '../../../../app/api/firestore/firestoreService';
import { IPhoto } from '../../../../app/common/interfaces/models';
import { IRootState } from '../../../../app/common/interfaces/states';
import PhotoUploadWidget from '../../../../app/common/photos/PhotoUploadWidget';
import useFirestoreCollection from '../../../../app/hooks/useFirestoreCollection';
import { listenToUserPhotos } from '../../../../app/store/profile/profileActions';

interface IAboutTabProps {
  profile: any;
  isCurrentUser: boolean;
}

const PhotosTab: React.FC<IAboutTabProps> = ({ profile, isCurrentUser }) => {
  const dispatch = useDispatch();
  const [uploadPhotoMode, setUploadPhotoMode] = useState<boolean>(false);
  const [isUpdatingPhoto, setIsUpdatingPhoto] = useState<{
    isUpdating: boolean;
    target: string | null;
  }>({ isUpdating: false, target: null });
  const [isDeletingPhoto, setIsDeletingPhoto] = useState<{
    isDeleting: boolean;
    target: string | null;
  }>({ isDeleting: false, target: null });
  const isLoading = useSelector<IRootState, boolean>(
    (state) => state.async.isLoading
  );
  const photos = useSelector<IRootState, IPhoto[]>(
    (state) => state.profile.photos
  );

  useFirestoreCollection({
    query: () => getUserPhotos(profile.id),
    data: (photos: any[]) => dispatch(listenToUserPhotos(photos)),
    deps: [profile.id, dispatch],
  });

  async function handleSetMainPhoto(photo: IPhoto) {
    setIsUpdatingPhoto({ isUpdating: true, target: photo.id });
    try {
      await setMainPhoto(photo);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsUpdatingPhoto({ isUpdating: false, target: null });
    }
  }

  async function handleDeletePhoto(photo: IPhoto) {
    setIsDeletingPhoto({ isDeleting: true, target: photo.id });
    try {
      await deleteFromFirebaseStorage(photo.name);
      await deletePhotoFromCollection(photo.id);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeletingPhoto({ isDeleting: false, target: null });
    }
  }

  return (
    <Tab.Pane loading={isLoading}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='user' content='Photos' />
          {isCurrentUser && (
            <Button
              onClick={() =>
                setUploadPhotoMode((previousState) => !previousState)
              }
              floated='right'
              basic
              positive
              content={uploadPhotoMode ? 'Cancel' : 'Add Photo'}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {uploadPhotoMode ? (
            <PhotoUploadWidget setUploadPhotoMode={setUploadPhotoMode} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {photos.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  <Button.Group fluid widths={2}>
                    <Button
                      name={photo.id}
                      onClick={(
                        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                      ) => handleSetMainPhoto(photo)}
                      loading={
                        isUpdatingPhoto.isUpdating &&
                        isUpdatingPhoto.target === photo.id
                      }
                      disabled={photo.url === profile.photoURL}
                      basic
                      color='green'
                      content='Main'
                    />
                    <Button
                      basic
                      color='red'
                      icon='trash'
                      name={photo.id}
                      disabled={photo.url === profile.photoURL}
                      loading={
                        isUpdatingPhoto.isUpdating &&
                        isDeletingPhoto.target === photo.id
                      }
                      onClick={() => {
                        handleDeletePhoto(photo);
                      }}
                    />
                  </Button.Group>
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default PhotosTab;
