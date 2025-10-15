'use client';
import { useCallback, useState } from 'react';
import { Upload, FileSpreadsheet } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export default function UploadZone({ onFileSelect, isLoading }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.name.match(/.(xlsx|xls)$/)) {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer ${isDragging ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'} ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <input type="file" id="fileInput" accept=".xlsx,.xls" onChange={handleFileInput} className="hidden" disabled={isLoading} />
      <label htmlFor="fileInput" className="cursor-pointer">
        <div className="flex flex-col items-center gap-4">
          {isLoading ? (
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500" />
          ) : (
            <>
              <FileSpreadsheet className="w-16 h-16 text-blue-500" />
              <div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Drop your Excel file here</h3>
                <p className="text-gray-500 mb-4">or</p>
                <button type="button" className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors inline-flex items-center gap-2" onClick={() => document.getElementById('fileInput')?.click()}>
                  <Upload className="w-5 h-5" />
                  Choose File
                </button>
                <p className="text-sm text-gray-400 mt-4">Supported: .xlsx, .xls</p>
              </div>
            </>
          )}
        </div>
      </label>
    </div>
  );
}
