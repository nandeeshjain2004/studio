'use client';
import { useRef, useState, useCallback } from 'react';
import { Upload, File as FileIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onFileRead: (content: string) => void;
  fileType: 'text' | 'dataUrl';
  accept?: string;
  className?: string;
}

export function FileUploader({ onFileRead, fileType, accept = 'text/plain', className }: FileUploaderProps) {
  const [fileName, setFileName] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFile = useCallback((file: File) => {
    if (file) {
      if (fileType === 'text' && !file.type.startsWith('text/')) {
        toast({ variant: 'destructive', title: 'Invalid File Type', description: 'Please upload a plain text file (.txt).' });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onFileRead(content);
        setFileName(file.name);
      };

      if (fileType === 'text') {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    }
  }, [fileType, onFileRead, toast]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };
  
  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  }

  return (
    <div className={cn('space-y-2', className)}>
      <div
        className={cn(
          'relative flex w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-input bg-background/50 p-6 text-center transition-colors hover:bg-accent/50',
          isDragging && 'bg-accent/50 border-primary'
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          <span className="font-semibold text-primary">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-muted-foreground">
          {accept === "text/plain" ? "TXT files" : "Images or PDF"}
        </p>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
        />
      </div>
      {fileName && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <FileIcon className="h-4 w-4" />
          <span>{fileName}</span>
          <Button variant="ghost" size="sm" className="h-auto px-1 py-0 text-xs" onClick={() => { setFileName(''); onFileRead(''); }}>
            Clear
          </Button>
        </div>
      )}
    </div>
  );
}
