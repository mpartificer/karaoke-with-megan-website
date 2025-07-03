import {
  Upload as UploadIcon,
  Camera,
  Video,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext"; // Add this import

function Upload() {
  // Remove the user prop since we'll get it from useAuth
  const { user } = useAuth(); // Add this line to get user from context
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState([]);
  const fileInputRef = useRef(null);

  // File size limits (25MB for images, 200MB for videos)
  const MAX_IMAGE_SIZE = 25 * 1024 * 1024; // 25MB
  const MAX_VIDEO_SIZE = 200 * 1024 * 1024; // 200MB

  const handleFiles = (files) => {
    const fileArray = Array.from(files).filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      const sizeLimit = isImage ? MAX_IMAGE_SIZE : MAX_VIDEO_SIZE;

      if (!isImage && !isVideo) return false;
      if (file.size > sizeLimit) {
        alert(
          `File ${file.name} is too large. Max size: ${
            isImage ? "25MB" : "200MB"
          }`
        );
        return false;
      }
      return true;
    });
    setSelectedFiles((prev) => [...prev, ...fileArray]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    const isVideo = file.type.startsWith("video/");

    formData.append("file", file);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/${isVideo ? "video" : "image"}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Cloudinary upload failed: ${response.statusText}`);
    }

    return await response.json();
  };

  const logToDatabase = async (uploadData, file) => {
    // Add some debugging to see what user data we have
    console.log("User data for database logging:", user);

    const response = await fetch("/api/log-upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_url: uploadData.secure_url,
        username: user?.name || "Unknown User",
        user_email: user?.email || "unknown@email.com",
        file_type: file.type.startsWith("image/") ? "image" : "video",
        file_size: file.size,
        cloudinary_public_id: uploadData.public_id,
      }),
    });

    if (!response.ok) {
      throw new Error(`Database logging failed: ${response.statusText}`);
    }

    return await response.json();
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    setUploadResults([]);

    const results = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      try {
        // Upload to Cloudinary
        const cloudinaryResult = await uploadToCloudinary(file);

        // Log to database
        await logToDatabase(cloudinaryResult, file);

        results.push({
          fileName: file.name,
          status: "success",
          url: cloudinaryResult.secure_url,
        });
      } catch (error) {
        console.error(`Upload failed for ${file.name}:`, error);
        results.push({
          fileName: file.name,
          status: "error",
          error: error.message,
        });
      }
    }

    setUploadResults(results);
    setUploading(false);

    // Clear selected files if all uploads were successful
    if (results.every((result) => result.status === "success")) {
      setSelectedFiles([]);
    }
  };

  return (
    <div className="min-h-screen bg-primary py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-secondary mb-4">
            help me out & get featured!
          </h1>
          <p className="text-lg text-accent">
            share the mems! gimme ur content!
          </p>
          {user && (
            <p className="text-sm text-accent mt-2">
              Uploading as: {user.name} ({user.email})
            </p>
          )}
        </div>

        <div className="bg-accent rounded-lg shadow-lg p-8">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-accent bg-accent/10"
                : "border-gray-300 hover:border-accent"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={uploading}
            />

            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <div className="bg-neutral rounded-full p-3">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <div className="bg-neutral rounded-full p-3">
                  <Video className="h-8 w-8 text-primary" />
                </div>
              </div>

              <div>
                <p className="text-xl font-semibold text-gray-700 mb-2">
                  Drag and drop your files here
                </p>
                <p className="text-gray-500 mb-4">or</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="bg-neutral text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? "Uploading..." : "Browse Files"}
                </button>
              </div>

              <p className="text-sm text-gray-500">
                Supported: JPG, PNG, GIF, MP4, MOV, AVI (Max 25MB images, 200MB
                videos)
              </p>
            </div>
          </div>

          {selectedFiles.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Selected Files ({selectedFiles.length})
              </h3>
              <div className="space-y-3">
                {selectedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-accent rounded p-2">
                        {file.type.startsWith("image/") ? (
                          <Camera className="h-5 w-5 text-primary" />
                        ) : (
                          <Video className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {formatFileSize(file.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      disabled={uploading}
                      className="text-red-500 hover:text-red-700 font-semibold disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={handleUpload}
                  disabled={uploading || selectedFiles.length === 0}
                  className="bg-secondary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? "Uploading..." : "Upload Files"}
                </button>
              </div>
            </div>
          )}

          {uploadResults.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Upload Results
              </h3>
              <div className="space-y-3">
                {uploadResults.map((result, index) => (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-4 rounded-lg ${
                      result.status === "success" ? "bg-green-50" : "bg-red-50"
                    }`}
                  >
                    {result.status === "success" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-700">
                        {result.fileName}
                      </p>
                      {result.status === "success" ? (
                        <p className="text-sm text-green-600">
                          Uploaded successfully!
                        </p>
                      ) : (
                        <p className="text-sm text-red-600">
                          Error: {result.error}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-accent rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-primary mb-4">
            submission guidelines
          </h3>
          <ul className="space-y-2 text-primary">
            <li>
              • please only upload content from our karaoke event! i'm operating
              on the free database tier over here, okay?
            </li>
            <li>
              • consent is gorgeous in all things! make sure you have permission
              from everyone visible in your uploads!
            </li>
            <li>
              • don't be gross - you're literally talking to megan right now, i
              built this thing, and if you send me dick pics so help me god i
              will find you and press charges 😙
            </li>
            <li>
              • by uploading, you give us permission to share on our social
              media @karaokewithmegan and if you don't follow us then you should
              go do it now!
            </li>
            <li>
              • btw i find the easiest way to do this is to add them one at a
              time bc if one is too long it'll just stop and not do anything,
              whereas the smaller ones are a wayyyy shorter paus and it will
              close the menu. oh, and also, i am on an iPhone 14 and I can't
              upload a 2 minute long video so your safest bet if you're finding
              it too long is to pick your favorite minute of the song and upload
              that.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Upload;
