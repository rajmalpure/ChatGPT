"use client"

import { useRef } from "react"
import { Paperclip, X, FileText } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export interface UploadedFile {
  name: string
  size: number
  type: string
  url: string
  file: File
}

interface FileUploadProps {
  onFilesChange?: (files: UploadedFile[]) => void
  files: UploadedFile[]
  setFiles: (files: UploadedFile[]) => void
}

export function FileUpload({ onFilesChange, files, setFiles }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles) return

    const newFiles: UploadedFile[] = Array.from(selectedFiles).map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      file: file
    }))

    const updatedFiles = [...files, ...newFiles]
    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles)
    
    // Reset input
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesChange?.(updatedFiles)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <>
      <input
        ref={inputRef}
        id="file-upload"
        type="file"
        multiple
        className="hidden"
        onChange={handleFileSelect}
        accept="image/*,application/pdf,.doc,.docx,.txt,.csv,.json"
      />
      <label htmlFor="file-upload" className="cursor-pointer inline-flex items-center justify-center rounded-md hover:bg-muted my-2.5 size-8 p-2 transition-colors" title="Upload files">
        <Paperclip className="size-4" />
      </label>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 px-4 pt-2"
          >
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="relative group"
              >
                {file.type.startsWith('image/') ? (
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-border">
                    <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 rounded-full p-1 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="size-3 text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 text-sm max-w-[200px] border border-border">
                    <FileText className="size-4 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate text-xs">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="hover:bg-background rounded-full p-1 transition-colors flex-shrink-0"
                    >
                      <X className="size-3" />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
