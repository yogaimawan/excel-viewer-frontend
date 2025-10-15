'use client';
import { FileText, Table2 } from 'lucide-react';

interface FileStatsProps {
  filename: string;
  rows: number;
  columns: number;
}

export default function FileStats({ filename, rows, columns }: FileStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Table2 className="w-6 h-6" />
          <p className="text-blue-100 text-sm font-medium">Total Rows</p>
        </div>
        <h3 className="text-4xl font-bold">{rows.toLocaleString()}</h3>
      </div>
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Table2 className="w-6 h-6 rotate-90" />
          <p className="text-purple-100 text-sm font-medium">Total Columns</p>
        </div>
        <h3 className="text-4xl font-bold">{columns.toLocaleString()}</h3>
      </div>
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <FileText className="w-6 h-6" />
          <p className="text-green-100 text-sm font-medium">File Name</p>
        </div>
        <h3 className="text-lg font-semibold truncate" title={filename}>{filename}</h3>
      </div>
    </div>
  );
}
