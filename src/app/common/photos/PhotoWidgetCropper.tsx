import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

interface IPhotoWidgetCropperProps {
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  imagePreview: any;
}

const PhotoWidgetCropper: React.FC<IPhotoWidgetCropperProps> = ({
  setImage,
  imagePreview,
}) => {
  const cropperRef = useRef<HTMLImageElement>(null);

  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    const croppedCanvas = cropper.getCroppedCanvas();
    if (typeof croppedCanvas !== 'undefined') {
      croppedCanvas.toBlob((blob: any) => {
        setImage(blob);
      }, 'image/jpeg');
    }
  };

  return (
    <Cropper
      src={imagePreview}
      style={{ height: 200, width: '100%' }}
      // Cropper.js options
      initialAspectRatio={1}
      preview='.img-preview'
      viewMode={1}
      dragMode='move'
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      guides={false}
      crop={onCrop}
      ref={cropperRef}
    />
  );
};

export default PhotoWidgetCropper;
