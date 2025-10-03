'use client';
import { useRef, useState, useCallback } from 'react';
import { Upload, File as FileIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import * as pdfjs from 'pdfjs-dist';

// Set worker source
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
}

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

  const handleFile = useCallback(async (file: File) => {
    if (file) {
      if (!accept.split(',').map(s => s.trim()).includes(file.type)) {
         toast({ variant: 'destructive', title: 'Invalid File Type', description: `Please upload a supported file type: ${accept}` });
        return;
      }
      
      setFileName(file.name);

      if (file.type === 'application/pdf' && fileType === 'text') {
        try {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const arrayBuffer = e.target?.result as ArrayBuffer;
                if (!arrayBuffer) {
                    toast({ variant: 'destructive', title: 'Error reading file', description: 'Could not read PDF file.' });
                    return;
                }

                try {
                    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
                    let textContent = '';
                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const text = await page.getTextContent();
                        textContent += text.items.map(item => ('str' in item ? item.str : '')).join(' ') + '\n';
                    }
                    onFileRead(textContent);
                } catch (pdfError) {
                    console.error('Error parsing PDF:', pdfError);
                    toast({ variant: 'destructive', title: 'Error parsing PDF', description: 'Could not extract text from the PDF.' });
                }
            };
            reader.readAsArrayBuffer(file);
        } catch (error) {
            console.error('Error handling PDF:', error);
            toast({ variant: 'destructive', title: 'Error processing PDF', description: 'An unexpected error occurred.' });
        }
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          onFileRead(content);
        };
        if (fileType === 'text') {
          reader.readAsText(file);
        } else {
          reader.readAsDataURL(file);
        }
      }
    }
  }, [fileType, onFileRead, toast, accept]);

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

  const getUploadMessage = () => {
    const acceptedTypes = accept.split(',').map(s => s.trim());
    let message = '';
    if (acceptedTypes.includes('application/pdf') && acceptedTypes.includes('text/plain')) {
        message = 'TXT or PDF files';
    } else if (acceptedTypes.includes('application/pdf')) {
        message = 'PDF files';
    } else if (acceptedTypes.includes('text/plain')) {
        message = 'TXT files'
    } else if (accept.includes('image')) {
        message = "Images or PDF";
    }
    return message;
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
          {getUploadMessage()}
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
