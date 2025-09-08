import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileImageUpload = ({ currentImage, onImageChange }) => {
  const [previewImage, setPreviewImage] = useState(currentImage);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageSelect = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes?.includes(file?.type)) {
        alert('Please select a valid image file (JPEG, PNG, or WebP)');
        return;
      }

      // Validate file size (max 5MB)
      if (file?.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setIsUploading(true);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e?.target?.result;
        setPreviewImage(imageUrl);
        setIsUploading(false);
        if (onImageChange) {
          onImageChange(imageUrl);
        }
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
    if (onImageChange) {
      onImageChange(null);
    }
  };

  const triggerFileInput = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-muted border-4 border-border">
          {previewImage ? (
            <Image
              src={previewImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon name="User" size={48} className="text-muted-foreground" />
            </div>
          )}
        </div>
        
        {previewImage && (
          <button
            onClick={handleRemoveImage}
            className="absolute -top-2 -right-2 w-8 h-8 bg-error text-error-foreground rounded-full flex items-center justify-center hover:bg-error/90 transition-smooth shadow-soft"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          onClick={triggerFileInput}
          loading={isUploading}
          iconName="Upload"
          iconPosition="left"
          disabled={isUploading}
        >
          {previewImage ? 'Change Photo' : 'Upload Photo'}
        </Button>
        
        {previewImage && (
          <Button
            variant="ghost"
            onClick={handleRemoveImage}
            iconName="Trash2"
            iconPosition="left"
          >
            Remove
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleImageSelect}
        className="hidden"
      />

      <p className="text-caption text-muted-foreground text-center max-w-xs">
        Upload a professional photo. Supported formats: JPEG, PNG, WebP. Max size: 5MB.
      </p>
    </div>
  );
};

export default ProfileImageUpload;