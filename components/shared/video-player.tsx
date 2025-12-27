'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import Icon from '@/lib/icon';
import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { Dialog, DialogContent } from '../ui/dialog';

const VideoPlayer = ({
  src,
  className,
  setIsModal,
  isModal,
}: {
  src: string;
  className?: string;
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  // Play / Pause
  const togglePlay = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Mute / Unmute
  const toggleMute = () => {
    if (!videoRef.current) return;

    if (videoRef.current.muted || volume === 0) {
      videoRef.current.muted = false;
      videoRef.current.volume = volume || 1;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };
  // Progress update
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const current =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setProgress(current || 0);
  };

  // Seek on progress bar click
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = percent * videoRef.current.duration;
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const percent = 1 - clickY / rect.height; // top = loud

    const newVolume = Math.min(1, Math.max(0, percent));

    videoRef.current.volume = newVolume;
    videoRef.current.muted = newVolume === 0;

    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  return (
    <div
      className={cn(
        'relative mx-auto aspect-708/482 max-h-[85vh] overflow-hidden rounded-2xl md:rounded-3xl',
        className,
      )}
    >
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 h-full w-full object-cover"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {!isPlaying && isModal && (
        <button
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        >
          <Icon name="play" className="text-white" height={96} width={96} />
        </button>
      )}

      {/* Custom Controls */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-6 bg-[#A3A3A33D] p-4 backdrop-blur-[20px]">
        {/* Play / Pause */}
        <button className="shrink-0 cursor-pointer" onClick={togglePlay}>
          {isPlaying ? (
            <Icon
              name={'pause_circle'}
              height={34}
              width={34}
              className="text-white"
            />
          ) : (
            <PlayCircle className="size-8.5 text-white" />
          )}
        </button>

        {/* Progress Bar */}
        <div
          className="relative h-2 flex-1 cursor-pointer rounded-[10px] bg-[#BFBFBF]"
          onClick={handleSeek}
        >
          <div
            className="relative h-full rounded-full bg-[#F8F7B6]"
            style={{ width: `${progress}%` }}
          ></div>

          {/* Thumb */}
          <div
            className="absolute top-1/2 size-5.5 -translate-y-1/2 rounded-full bg-[#F8F7B6]"
            style={{
              left: `calc(${progress}% - 11px)`,
            }}
          />
        </div>

        {/* Volume + Fullscreen */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="shrink-0 cursor-pointer">
                <Icon
                  name={isMuted || volume === 0 ? 'volume_mute' : 'volume_high'}
                  height={34}
                  width={34}
                  className="text-white"
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="flex h-70 w-fit min-w-fit flex-col items-center justify-center gap-4 overflow-hidden rounded-full bg-[#A3A3A33D] px-3 py-4 backdrop-blur-[20px]"
              align="center"
              alignOffset={60}
            >
              {/* Volume Icon */}
              <button onClick={toggleMute} className="shrink-0">
                <Icon
                  name={isMuted || volume === 0 ? 'volume_mute' : 'volume_high'}
                  height={44}
                  width={44}
                  className="text-white"
                />
              </button>

              {/* Vertical Volume Slider */}
              <div
                className="relative flex h-full w-2.5 cursor-pointer items-end rounded-[10px] bg-black/20"
                onClick={handleVolumeChange}
              >
                <div
                  className="relative w-full rounded-full bg-[#F8F7B6]"
                  style={{ height: `${volume * 100}%` }}
                >
                  <span className="absolute -top-3 left-1/2 size-5.5 -translate-x-1/2 rounded-full bg-[#F8F7B6]" />
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            className="shrink-0 cursor-pointer"
            onClick={() => setIsModal(!isModal)}
          >
            <Icon
              name={isModal ? 'circle_arrow_shrink' : 'circle_arrow_expand'}
              height={34}
              width={34}
              className="text-white"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

const VideoWrapper = ({
  src,
  className,
}: {
  src: string;
  className?: string;
}) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <VideoPlayer
        src={src}
        className={className}
        setIsModal={setIsModal}
        isModal={isModal}
      />

      <Dialog open={isModal} onOpenChange={setIsModal}>
        <DialogContent
          showCloseButton={false}
          className="border-0 bg-transparent! p-0! sm:max-w-300"
        >
          <VideoPlayer
            src={src}
            className={`aspect-1200/817`}
            setIsModal={setIsModal}
            isModal={isModal}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoWrapper;
