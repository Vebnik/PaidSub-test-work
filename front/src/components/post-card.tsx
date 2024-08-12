import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Input, Textarea } from "@nextui-org/input";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { useState } from "react";
import { Badge } from "@nextui-org/badge";

import { Post, usePostStore } from "@/store/post.store";

function CreatePostModal({
  post,
  isOpen,
  setOpen,
}: {
  post: Post;
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={() => setOpen(false)}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Post: {post.title}
            </ModalHeader>
            <ModalBody>
              <Input label="Date" value={post.date.toString()} />
              <Textarea label="Text" value={post.text} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default function PostCard({ post }: { post: Post }) {
  const _delete = usePostStore((store) => store.delete);
  const all = usePostStore((store) => store.all);

  const [open, setOpen] = useState<boolean>(false);

  const setIsOpen = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  const deletePost = () => {
    if (post.isPublic) _delete(post.id).then(() => all());
  };

  return (
    <>
      <CreatePostModal isOpen={open} post={post} setOpen={setIsOpen} />
      <Card className="py-4 h-max hover:bg-slate-100">
        <CardHeader className="pb-0 pt-2 px-4 flex-row justify-between items-start">
          <div className="px-2">
            <p className="text-tiny uppercase font-bold">{post.title}</p>
            <small className="text-default-500">
              {post.medias.length || 0} media
            </small>
            <h4 className="font-bold text-large">
              {post.date.toLocaleString()}
            </h4>
          </div>
          {post.isPublic ? (
            <Badge
              className="relative right-3"
              color="primary"
              content="Public"
            >
              <></>
            </Badge>
          ) : (
            <Badge className="relative right-3" color="warning" content="Not">
              <></>
            </Badge>
          )}
        </CardHeader>
        <CardBody className="overflow-visible py-2 flex flex-wrap flex-row gap-1">
          <>Images</>
        </CardBody>
        <CardFooter className="flex gap-1 justify-between">
          <Button onPress={() => setOpen(true)}>Info</Button>
          <Button
            color="danger"
            isDisabled={!post.isPublic}
            onPress={() => deletePost()}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
