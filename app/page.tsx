'use client';
import { useState } from 'react';
import UploadZone from '@/components/UploadZone';
import FileStats from '@/components/FileStats';
import DataTable from '@/components/DataTable';
import { FileSpreadsheet } from 'lucide-react';

interface ExcelData {
  filename: string;
  rows: number;
  columns: number;
  column_names: string[];
  preview: Record<string, string | number | null>[];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ExcelData | null>(null);

  const handleFileSelect = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setData(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://excel-viewer-pi.vercel.app/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setData(result);
      } else {
        setError(result.error || 'Failed to process file');
      }
    } catch (err) {
      setError('Network error: ' + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileSpreadsheet className="w-12 h-12 text-blue-600" />
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Excel Viewer</h1>
          </div>
          <p className="text-gray-600 text-lg">Upload and preview your Excel files instantly</p>
        </div>
        <div className="max-w-4xl mx-auto mb-8">
          <UploadZone onFileSelect={handleFileSelect} isLoading={isLoading} />
        </div>
        {error && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {data && (
          <div className="max-w-7xl mx-auto">
            <FileStats filename={data.filename} rows={data.rows} columns={data.columns} />
            <DataTable columns={data.column_names} data={data.preview} />
          </div>
        )}
      </div>
    </div>
  );
}
