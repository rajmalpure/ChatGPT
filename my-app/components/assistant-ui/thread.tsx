import {
  ActionBarPrimitive,
  BranchPickerPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
} from "@assistant-ui/react";
import type { FC } from "react";
import React from "react";
import {
  ArrowDownIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  PencilIcon,
  RefreshCwIcon,
  SendHorizontalIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { MarkdownText } from "@/components/assistant-ui/markdown-text";
import { TooltipIconButton } from "@/components/assistant-ui/tooltip-icon-button";
import { ToolFallback } from "./tool-fallback";
import { Card3D } from "@/components/3d/card-3d";
import { FileUpload } from "./file-upload";

export const Thread: FC = () => {
  return (
    <ThreadPrimitive.Root
      className="bg-background box-border flex h-full flex-col overflow-hidden"
      style={{
        ["--thread-max-width" as string]: "42rem",
      }}
    >
      <ThreadPrimitive.Viewport className="flex h-full flex-col items-center overflow-y-scroll scroll-smooth bg-inherit px-4 pt-8">
        <ThreadWelcome />

        <ThreadPrimitive.Messages
          components={{
            UserMessage: UserMessage,
            EditComposer: EditComposer,
            AssistantMessage: AssistantMessage,
          }}
        />

        <ThreadPrimitive.If empty={false}>
          <div className="min-h-8 flex-grow" />
        </ThreadPrimitive.If>

        <div className="sticky bottom-0 mt-3 flex w-full max-w-[var(--thread-max-width)] flex-col items-center justify-end rounded-t-lg bg-inherit pb-4">
          <ThreadScrollToBottom />
          <Composer />
        </div>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  );
};

const ThreadScrollToBottom: FC = () => {
  return (
    <ThreadPrimitive.ScrollToBottom asChild>
      <TooltipIconButton
        tooltip="Scroll to bottom"
        variant="outline"
        className="absolute -top-8 rounded-full disabled:invisible"
      >
        <ArrowDownIcon />
      </TooltipIconButton>
    </ThreadPrimitive.ScrollToBottom>
  );
};

const ThreadWelcome: FC = () => {
  return (
    <ThreadPrimitive.Empty>
      <motion.div 
        className="flex w-full max-w-[var(--thread-max-width)] flex-grow flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="flex w-full flex-grow flex-col items-center justify-center gap-8">
          <motion.div
            initial={{ scale: 0, rotateY: -180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.1
            }}
            style={{ perspective: 1000 }}
          >
            <div className="relative">
              {/* 3D Layered effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="relative w-24 h-24 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-2xl"
                animate={{
                  rotateY: [0, 360],
                  rotateX: [0, 15, 0, -15, 0]
                }}
                transition={{
                  rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                  rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: "0 20px 60px -10px rgba(139, 92, 246, 0.5)"
                }}
              >
                <motion.span
                  className="text-4xl font-bold text-white"
                  animate={{
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  AI
                </motion.span>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.p 
            className="font-medium text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            How can I help you today?
          </motion.p>
        </div>
        <ThreadWelcomeSuggestions />
      </motion.div>
    </ThreadPrimitive.Empty>
  );
};

const ThreadWelcomeSuggestions: FC = () => {
  const suggestions = [
    "What is the weather in Tokyo?",
    "What is assistant-ui?"
  ];
  
  return (
    <motion.div 
      className="mt-3 flex w-full items-stretch justify-center gap-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.5
          }
        }
      }}
    >
      {suggestions.map((prompt, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20, rotateX: -15 },
            visible: { opacity: 1, y: 0, rotateX: 0 }
          }}
          whileHover={{ 
            scale: 1.05, 
            rotateY: 5,
            z: 50,
            transition: { duration: 0.2 } 
          }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 max-w-sm"
          style={{ 
            transformStyle: "preserve-3d",
            perspective: 1000
          }}
        >
          <ThreadPrimitive.Suggestion
            className="hover:bg-muted/80 flex w-full h-full flex-col items-center justify-center rounded-lg border p-3 transition-all duration-200 ease-in"
            prompt={prompt}
            method="replace"
            autoSend
            style={{
              boxShadow: "0 10px 30px -10px rgba(139, 92, 246, 0.2)",
              backdropFilter: "blur(10px)"
            }}
          >
            <span className="line-clamp-2 text-ellipsis text-sm font-semibold">
              {prompt}
            </span>
          </ThreadPrimitive.Suggestion>
        </motion.div>
      ))}
    </motion.div>
  );
};

const Composer: FC = () => {
  const [uploadedFiles, setUploadedFiles] = React.useState<Array<{name: string, size: number, type: string, url: string, file: File}>>([]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="w-full"
      whileHover={{ scale: 1.01 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <ComposerPrimitive.Root 
        className="focus-within:border-ring/20 flex w-full flex-col rounded-lg border bg-inherit shadow-sm transition-all duration-200 ease-in backdrop-blur-sm"
        style={{
          boxShadow: "0 10px 40px -10px rgba(139, 92, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
        }}
      >
        <FileUpload 
          files={uploadedFiles} 
          setFiles={setUploadedFiles}
          onFilesChange={(files) => {
            console.log('Files attached:', files.map(f => f.name));
          }} 
        />
        <div className="flex items-end">
          <ComposerPrimitive.Input
            rows={1}
            autoFocus
            placeholder={uploadedFiles.length > 0 ? `${uploadedFiles.length} file(s) attached. Write a message...` : "Write a message..."}
            className="placeholder:text-muted-foreground max-h-40 flex-grow resize-none border-none bg-transparent px-4 py-4 text-sm outline-none focus:ring-0 disabled:cursor-not-allowed"
          />
          <ComposerAction files={uploadedFiles} onClearFiles={() => setUploadedFiles([])} />
        </div>
      </ComposerPrimitive.Root>
    </motion.div>
  );
};

const ComposerAction: FC<{ files?: Array<{name: string, size: number, type: string, url: string, file: File}>, onClearFiles?: () => void }> = ({ onClearFiles }) => {
  return (
    <>
      <ThreadPrimitive.If running={false}>
        <ComposerPrimitive.Send asChild>
          <TooltipIconButton
            tooltip="Send"
            variant="default"
            className="my-2.5 size-8 p-2 transition-opacity ease-in"
            onClick={() => {
              // Clear files after sending
              setTimeout(() => {
                onClearFiles?.();
              }, 100);
            }}
          >
            <SendHorizontalIcon />
          </TooltipIconButton>
        </ComposerPrimitive.Send>
      </ThreadPrimitive.If>
      <ThreadPrimitive.If running>
        <ComposerPrimitive.Cancel asChild>
          <TooltipIconButton
            tooltip="Cancel"
            variant="default"
            className="my-2.5 size-8 p-2 transition-opacity ease-in"
          >
            <CircleStopIcon />
          </TooltipIconButton>
        </ComposerPrimitive.Cancel>
      </ThreadPrimitive.If>
    </>
  );
};

const UserMessage: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <MessagePrimitive.Root className="grid auto-rows-auto grid-cols-[minmax(72px,1fr)_auto] gap-y-2 [&:where(>*)]:col-start-2 w-full max-w-[var(--thread-max-width)] py-4">
        <UserActionBar />

        <Card3D intensity={10} className="col-start-2 row-start-2 max-w-[calc(var(--thread-max-width)*0.8)]">
          <motion.div 
            className="bg-muted text-foreground break-words rounded-3xl px-5 py-2.5 shadow-lg"
            style={{
              boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.2), 0 0 20px rgba(139, 92, 246, 0.1)"
            }}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <MessagePrimitive.Content />
          </motion.div>
        </Card3D>

        <BranchPicker className="col-span-full col-start-1 row-start-3 -mr-1 justify-end" />
      </MessagePrimitive.Root>
    </motion.div>
  );
};

const UserActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      className="flex flex-col items-end col-start-1 row-start-2 mr-3 mt-2.5"
    >
      <ActionBarPrimitive.Edit asChild>
        <TooltipIconButton tooltip="Edit">
          <PencilIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Edit>
    </ActionBarPrimitive.Root>
  );
};

const EditComposer: FC = () => {
  return (
    <ComposerPrimitive.Root className="bg-muted my-4 flex w-full max-w-[var(--thread-max-width)] flex-col gap-2 rounded-xl">
      <ComposerPrimitive.Input className="text-foreground flex h-8 w-full resize-none bg-transparent p-4 pb-0 outline-none" />

      <div className="mx-3 mb-3 flex items-center justify-center gap-2 self-end">
        <ComposerPrimitive.Cancel asChild>
          <Button variant="ghost">Cancel</Button>
        </ComposerPrimitive.Cancel>
        <ComposerPrimitive.Send asChild>
          <Button>Send</Button>
        </ComposerPrimitive.Send>
      </div>
    </ComposerPrimitive.Root>
  );
};

const AssistantMessage: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <MessagePrimitive.Root className="grid grid-cols-[auto_auto_1fr] grid-rows-[auto_1fr] relative w-full max-w-[var(--thread-max-width)] py-4">
        <Card3D intensity={8} className="col-span-2 col-start-2 row-start-1 my-1.5 max-w-[calc(var(--thread-max-width)*0.8)]">
          <motion.div 
            className="text-foreground break-words leading-7 p-4 rounded-2xl backdrop-blur-sm"
            style={{
              background: "rgba(var(--muted-rgb, 0, 0, 0), 0.3)",
              boxShadow: "0 8px 32px -8px rgba(139, 92, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(139, 92, 246, 0.1)"
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <MessagePrimitive.Content
              components={{ Text: MarkdownText, tools: { Fallback: ToolFallback } }}
            />
          </motion.div>
        </Card3D>

        <AssistantActionBar />

        <BranchPicker className="col-start-2 row-start-2 -ml-2 mr-2" />
      </MessagePrimitive.Root>
    </motion.div>
  );
};

const AssistantActionBar: FC = () => {
  return (
    <ActionBarPrimitive.Root
      hideWhenRunning
      autohide="not-last"
      autohideFloat="single-branch"
      className="text-muted-foreground flex gap-1 col-start-3 row-start-2 -ml-1 data-[floating]:bg-background data-[floating]:absolute data-[floating]:rounded-md data-[floating]:border data-[floating]:p-1 data-[floating]:shadow-sm"
    >
      <ActionBarPrimitive.Copy asChild>
        <TooltipIconButton tooltip="Copy">
          <MessagePrimitive.If copied>
            <CheckIcon />
          </MessagePrimitive.If>
          <MessagePrimitive.If copied={false}>
            <CopyIcon />
          </MessagePrimitive.If>
        </TooltipIconButton>
      </ActionBarPrimitive.Copy>
      <ActionBarPrimitive.Reload asChild>
        <TooltipIconButton tooltip="Refresh">
          <RefreshCwIcon />
        </TooltipIconButton>
      </ActionBarPrimitive.Reload>
    </ActionBarPrimitive.Root>
  );
};

const BranchPicker: FC<BranchPickerPrimitive.Root.Props> = ({
  className,
  ...rest
}) => {
  return (
    <BranchPickerPrimitive.Root
      hideWhenSingleBranch
      className={cn(
        "text-muted-foreground inline-flex items-center text-xs",
        className
      )}
      {...rest}
    >
      <BranchPickerPrimitive.Previous asChild>
        <TooltipIconButton tooltip="Previous">
          <ChevronLeftIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Previous>
      <span className="font-medium">
        <BranchPickerPrimitive.Number /> / <BranchPickerPrimitive.Count />
      </span>
      <BranchPickerPrimitive.Next asChild>
        <TooltipIconButton tooltip="Next">
          <ChevronRightIcon />
        </TooltipIconButton>
      </BranchPickerPrimitive.Next>
    </BranchPickerPrimitive.Root>
  );
};

const CircleStopIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      width="16"
      height="16"
    >
      <rect width="10" height="10" x="3" y="3" rx="2" />
    </svg>
  );
};
