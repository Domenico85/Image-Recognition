import React, { useState, useRef } from 'react';
import { Upload, ImageIcon, Loader2, Camera, X } from 'lucide-react';

export default function ImageDescriptionApp() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedImage(file);
        setError('');
        
        // Create preview URL
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setError('Please select a valid image file.');
      }
    }
  };

  const generateDescription = async () => {
    if (!selectedImage) {
      setError('Please upload an image first.');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    
      const mockDescriptions = [
        "A beautiful landscape featuring rolling hills covered in lush green grass, with a clear blue sky dotted with fluffy white clouds. The scene captures the tranquility of nature with warm sunlight illuminating the pastoral setting.",
        "A modern urban scene showing tall glass buildings reflecting the golden hour sunlight. People walk along busy sidewalks while cars move through the streets, creating a dynamic cityscape full of energy and movement.",
        "A cozy indoor scene with warm lighting, featuring comfortable furniture and decorative elements that create an inviting atmosphere. The space appears well-lived and thoughtfully designed with attention to both comfort and aesthetics.",
        "A close-up portrait showing detailed facial features with natural lighting that highlights the subject's expression. The image captures genuine emotion and personality through careful composition and focus.",
        "A vibrant food photograph displaying a carefully plated dish with rich colors and textures. The presentation appears professionally styled with attention to visual appeal and appetizing details."
      ];
      
      const randomDescription = mockDescriptions[Math.floor(Math.random() * mockDescriptions.length)];
      setDescription(randomDescription);
    } catch (err) {
      setError('Failed to generate description. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setDescription('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Camera className="w-10 h-10 text-indigo-600" />
            Image Description Generator
          </h1>
          <p className="text-gray-600 text-lg">Upload an image and get an AI-generated description</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Upload Section */}
          <div className="mb-8">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
            />
            
            {!imagePreview ? (
              <div 
                onClick={triggerFileInput}
                className="border-2 border-dashed border-indigo-300 rounded-xl p-12 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-300"
              >
                <Upload className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Upload Your Image</h3>
                <p className="text-gray-500">Click here or drag and drop your image file</p>
                <p className="text-sm text-gray-400 mt-2">Supports JPG, PNG, GIF, WebP</p>
              </div>
            ) : (
              <div className="relative">
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <img 
                    src={imagePreview} 
                    alt="Uploaded preview" 
                    className="w-full max-h-96 object-contain bg-gray-100"
                  />
                  <button
                    onClick={clearImage}
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          )}

         
          <div className="text-center mb-8">
            <button
              onClick={generateDescription}
              disabled={!selectedImage || isLoading}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-8 rounded-xl transition-colors duration-200 flex items-center gap-3 mx-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Description...
                </>
              ) : (
                <>
                  <ImageIcon className="w-5 h-5" />
                  Generate Description
                </>
              )}
            </button>
          </div>

         
          {description && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-green-600" />
                Generated Description
              </h3>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <p className="text-gray-700 leading-relaxed">{description}</p>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => navigator.clipboard.writeText(description)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
                >
                  Copy Description
                </button>
                <button
                  onClick={generateDescription}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm"
                >
                  Generate New
                </button>
              </div>
            </div>
          )}
        </div>

        
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Upload className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Easy Upload</h3>
            <p className="text-gray-600 text-sm">Simply drag and drop or click to upload your images</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <ImageIcon className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Description</h3>
            <p className="text-gray-600 text-sm">Get detailed, accurate descriptions powered by AI</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Camera className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Multiple Formats</h3>
            <p className="text-gray-600 text-sm">Support for JPG, PNG, GIF, and WebP formats</p>
          </div>
        </div>
      </div>
    </div>
  );
}