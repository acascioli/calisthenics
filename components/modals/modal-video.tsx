"use client";

import { useState, useRef, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "../ui/button";
import { PlayCircle } from "lucide-react";
import ReactPlayer from "react-player";

interface ModalVideoProps {
  video: string;
}

export default function ModalVideo({ video }: ModalVideoProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div>
      <Button
        variant="premium"
        className="rounded-full h-8 w-8 p-0 shadow-lg"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <PlayCircle />
      </Button>

      {/* End: Video thumbnail */}

      <Transition
        show={modalOpen}
        as={Fragment}
        afterEnter={() => videoRef.current?.play()}
      >
        <Dialog initialFocus={videoRef} onClose={() => setModalOpen(false)}>
          {/* Modal backdrop */}
          <Transition.Child
            className="fixed inset-0 z-[99999] bg-black bg-opacity-75 transition-opacity"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition ease-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            aria-hidden="true"
          />
          {/* End: Modal backdrop */}

          {/* Modal dialog */}
          <Transition.Child
            className="fixed inset-0 z-[99999] overflow-hidden flex items-center justify-center transform px-4 sm:px-6"
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ttransition ease-out duration-200"
            leaveFrom="oopacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="max-w-6xl mx-auto h-full flex items-center">
              <Dialog.Panel className="w-full max-h-full aspect-video bg-black overflow-hidden">
                <ReactPlayer url={video} />
                {/* <video
                  ref={videoRef}
                  width={videoWidth}
                  height={videoHeight}
                  loop
                  controls
                >
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video> */}
              </Dialog.Panel>
            </div>
          </Transition.Child>
          {/* End: Modal dialog */}
        </Dialog>
      </Transition>
    </div>
  );
}
