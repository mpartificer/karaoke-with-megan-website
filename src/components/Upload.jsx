import { Upload as UploadIcon, Camera, Video } from "lucide-react";
import { useState, useRef } from "react";

function Upload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const fileArray = Array.from(files).filter(
      (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
    );
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
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
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
            />

            <div className="space-y-4">
              <div className="flex justify-center space-x-4">
                <div className="bg-accent rounded-full p-3">
                  <Camera className="h-8 w-8 text-primary" />
                </div>
                <div className="bg-accent rounded-full p-3">
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
                  className="bg-accent text-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent/80 transition-colors"
                >
                  Browse Files
                </button>
              </div>

              <p className="text-sm text-gray-500">
                Supported: JPG, PNG, GIF, MP4, MOV, AVI (Max 50MB per file)
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
                      className="text-red-500 hover:text-red-700 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button className="bg-secondary text-primary px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
                  Upload Files
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-primary mb-4">
            Submission Guidelines
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Please only upload content from our karaoke events</li>
            <li>
              • Make sure you have permission from everyone visible in
              photos/videos
            </li>
            <li>• Keep content appropriate and family-friendly</li>
            <li>
              • By uploading, you give us permission to share on our social
              media
            </li>
            <li>
              • We may feature your content on our Instagram @karaokewithmegan
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Upload;
