import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/input";
import { DatePicker } from "@nextui-org/date-picker";
import { now, getLocalTimeZone, DateValue } from "@internationalized/date";

import DefaultLayout from "@/layouts/default";
import { usePostStore } from "@/store/post.store";
import { useModalStore } from "@/store/modal.store";
import PostCard from "@/components/post-card";
import { FileToBase64 } from "@/utils/base64";
import { RawFile } from "@/interfaces";

function CreatePostModal() {
  const create = usePostStore((store) => store.create);
  const all = usePostStore((store) => store.all);

  const setOpen = useModalStore((store) => store.setOpen);
  const isOpen = useModalStore((store) => store.isOpen);

  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [date, setDate] = useState<DateValue | null | undefined>(
    now(getLocalTimeZone()),
  );
  const [media, setMedia] = useState<RawFile[]>([]);

  const dropForm = () => {
    setTitle("");
    setText("");
    setMedia([]);
  };

  const createPost = () => {
    const data = {
      title,
      text,
      date: date?.toDate("").getTime() || 0,
      medias: media,
    };

    create(data)
      .then(() => {
        dropForm();
        setOpen(false);

        // for lazy load
        setTimeout(() => all(), 1000);
      })
      .catch();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        dropForm();
        setOpen(false);
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Create new Post
            </ModalHeader>
            <ModalBody>
              <Input
                label="Title"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
              />
              <Textarea
                label="Text"
                value={text}
                onChange={(ev) => setText(ev.target.value)}
              />
              <DatePicker
                showMonthAndYearPickers
                defaultValue={now(getLocalTimeZone())}
                label="Event Date"
                value={date}
                onChange={setDate}
              />
              <Input
                multiple
                type="file"
                onChange={async (ev) => {
                  const res: RawFile[] = [];

                  for (const file of ev.target.files || []) {
                    const rawFile: RawFile = {
                      name: file.name,
                      base64: (await FileToBase64(file))?.toString() || "",
                    };

                    res.push(rawFile);
                  }

                  setMedia(res);
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={createPost}>
                Create
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export function PostsPage() {
  const getPosts = usePostStore((store) => store.all);
  const posts = usePostStore((store) => store.posts);

  const setOpen = useModalStore((store) => store.setOpen);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <DefaultLayout>
      <CreatePostModal />
      <section
        className="flex flex-col items-center gap-4 py-8 md:py-10"
        style={{ height: "calc(100vh - 200px)" }}
      >
        <div className="flex flex-col gap-2 w-[100%] items-end">
          <Button className="w-max" onClick={() => setOpen(true)}>
            Add new Post
          </Button>
          <Divider className="w-[100%] h-1 rounded-xl" />
        </div>
        <div className="w-[100%] rounded flex flex-wrap gap-4 p-4 max-h-[100%] overflow-y-scroll">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
