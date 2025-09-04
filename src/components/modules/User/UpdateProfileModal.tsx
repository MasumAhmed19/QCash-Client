"use client";

import { useId, useState } from "react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImagePlus, ImagePlusIcon } from "lucide-react";
import { toast } from "sonner";
import { useUpdateProfilePicMutation } from "@/redux/features/user/user.api";

interface EditProfilePicModalProps {
  initialImage?: string;
}

export default function UpdateProfileModal({
  initialImage,
}: EditProfilePicModalProps) {
  const id = useId();
  const [updateProfilePic] = useUpdateProfilePicMutation();
  const [open, setOpen] = useState(false)

  const [{ files }, { openFileDialog, getInputProps }] = useFileUpload({
    accept: "image/*",
    initialFiles: initialImage
      ? [
          {
            name: "profile-pic",
            size: 0,
            type: "image/*",
            url: initialImage,
            id: "profile-pic-123",
          },
        ]
      : [],
  });

  const currentImage = files[0]?.preview || null;

  const handleUpload = async () => {
    if (!files[0]?.file) {
      toast.error("Please select a file first");
      return;
    }

    const formData = new FormData();
    if (files[0].file instanceof File) {
      formData.append("file", files[0].file);
    } else {
      toast.error("Selected file is invalid");
      return;
    }

    const toastId = toast.loading("Updating profile picture...");
    try {
      await updateProfilePic(formData).unwrap();
      toast.success("Profile picture updated successfully 🎉", { id: toastId });
    setOpen(false);

    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile picture", { id: toastId });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 ml-2 mt-2"
        >
          <ImagePlus className="h-4 w-4" />
          Update Photo
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-sm [&>button:last-child]:top-3.5">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b px-6 py-4 text-base">
            Update Profile Picture
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Change your profile picture here
        </DialogDescription>

        <div className="flex flex-col items-center gap-4 px-6 pt-6 pb-4">
          <div className="border-background bg-muted relative flex size-32 items-center justify-center overflow-hidden rounded-full border-4 shadow-xs shadow-black/10">
            {currentImage && (
              <img
                src={currentImage}
                className="size-full object-cover"
                width={120}
                height={120}
                alt="Profile image"
              />
            )}
            <button
              type="button"
              className="focus-visible:border-ring focus-visible:ring-ring/50 absolute flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:ring-[3px]"
              onClick={openFileDialog}
              aria-label="Change profile picture"
            >
              <ImagePlusIcon size={20} aria-hidden="true" />
            </button>
            <input
              {...getInputProps()}
              className="sr-only"
              aria-label="Upload profile picture"
            />
          </div>

          <Button onClick={handleUpload}>Upload</Button>
        </div>

        <DialogFooter className="border-t px-6 py-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
