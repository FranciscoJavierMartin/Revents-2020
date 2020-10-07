import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header, Icon } from 'semantic-ui-react';

interface IPhotoWidgetDropzoneProps {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
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

const PhotoWidgetDropzone: React.FC<IPhotoWidgetDropzoneProps> = ({
  setFiles,
}) => {
  const dropzoneStyles: IDropzoneStyles = {
    border: 'dashed 3px #eee',
    borderRadius: '5%',
    paddingTop: '30px',
    textAlign: 'center',
  };

  const dropzoneActive = {
    border: 'dashed 3px green',
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(
        acceptedFiles.map((file: File) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive
          ? { ...dropzoneStyles, ...dropzoneActive }
          : { ...dropzoneStyles }
      }
    >
      <input {...getInputProps()} />
      <Icon name='upload' size='huge' />
      <Header content='Drop image here' />
    </div>
  );
};

export default PhotoWidgetDropzone;
