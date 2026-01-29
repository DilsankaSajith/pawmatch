import { cn } from '@/lib/utils';
import { Image, Loader2, MousePointerSquareDashed } from 'lucide-react';
import Dropzone, { FileRejection } from 'react-dropzone';
import { Progress } from './ui/progress';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useUploadThing } from '@/lib/uploadthing';
import { toast } from 'sonner';

interface ImageUploaderProps {
  postFileUpload?: (file: File) => void;
  isPostUploadLoading?: boolean;
}

const ImageUploader = ({
  postFileUpload,
  isPostUploadLoading,
}: ImageUploaderProps) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: ([data]) => {
      const reportId = data.serverData.reportId;

      startTransition(() => {
        router.push(`/report/analysis?id=${reportId}`);
      });
    },
    onUploadProgress(p) {
      setUploadProgress(p);
    },
  });

  const onDropAccepted = async (acceptedFiles: File[]) => {
    startUpload(acceptedFiles, { reportId: undefined });
    await postFileUpload?.(acceptedFiles[0]);
    setIsDragOver(false);
  };

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;

    setIsDragOver(false);

    toast.error(`${file.file.type} type is not supported`, {
      description: 'Please choose a PNG, JPG or JPEG image instead',
      position: 'top-center',
    });
  };

  return (
    <div
      className={cn(
        'relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center',
        { 'ring-blue-900/25 bg-blue-900/10': isDragOver },
      )}
    >
      <div className="relative flex flex-1 flex-col items-center justify-center w-full">
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
            'image/jpg': ['.jpg'],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="h-full w-full flex-1 flex flex-col items-center justify-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
              ) : isUploading || isPending || isPostUploadLoading ? (
                <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
              ) : (
                <Image className="h-6 w-6 text-zinc-500 mb-2" />
              )}
              <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <p>Uploading...</p>
                    <Progress
                      value={uploadProgress}
                      className="mt-2 w-40 h-2 bg-gray-300"
                    />
                  </div>
                ) : isPending ? (
                  <div className="flex flex-col items-center">
                    <p>Redirecting, please wait...</p>
                  </div>
                ) : isPostUploadLoading ? (
                  <p>Analysing...</p>
                ) : isDragOver ? (
                  <p>
                    <span className="font-semibold">
                      You are saving a little life ❤️
                    </span>
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                )}
              </div>
              {isPending ? null : (
                <p className="text-xs text-zinc-500">PNG, JPG, JPEG</p>
              )}
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default ImageUploader;
