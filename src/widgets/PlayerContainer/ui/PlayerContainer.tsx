import { useEffect, useRef, useState } from 'react';
import { Portal } from '../../../features/Portal/Portal';
import clsx from 'clsx';

type TProps = {
    /** 비디오 url */ videoUrl: string;
};

/**
 * 주요 콘텐츠 영상 섹션
 * @returns {JSX.Element}
 */
export default function PlayerContainer({ videoUrl }: TProps): JSX.Element {
    /** 전체화면 여부에 대한 상태 */
    const [isFull, setIsFull] = useState(false);
    /** 현재 비디오 재생 여부에 대한 상태 */
    const [isPlaying, setIsPlaying] = useState(false);
    /**
     * 직전 비디오 재생 여부에 대한 상태
     * 비디오의 input controller를 조작할 경우 이전에 재생중이더라도 순간적으로 일시정지 상태로 전환해주어야 하기 때문에 직전 상태를 관리한다.
     */
    const [isPrevPlaying, setIsPrevPlaying] = useState(false);
    /** 비디오의 오디오 뮤트 상태 */
    const [muted, setMuted] = useState(false);
    /** 비디오를 관리하는 ref */
    const videoRef = useRef<HTMLVideoElement>(null);
    /** 비디오 전체 재생 시간에 대한 상태 */
    const [duration, setDuration] = useState(0);
    /** 재생된 비디오 시간에 대한 상태 */
    const [currentTime, setCurrentTime] = useState(0);

    /** 비디오 플레이어를 적절한 영역에 위치시킨다.
     * @param to 이동할 부모 노드의 id
     *
     */
    const moveVideo = (to: string) => {
        const video = document.getElementById('movable-target') as HTMLElement;
        const container = document.getElementById(to);
        if (video && container) {
            container.appendChild(video);
        }
    };

    /** 총 비디오 재생 시간을 관리한다. */
    const handleLoadedMetadata = () => {
        const video = videoRef.current;
        if (!video) return;
        setDuration(video.duration);
    };

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video || Math.floor(video.currentTime) === currentTime) return;
        setCurrentTime(Math.floor(video.currentTime));
        console.log(video.currentTime);
    };

    /** 전체화면 여부에 따라 비디오 위치를 변경한다. */
    useEffect(() => {
        if (isFull) {
            moveVideo('full-video');
        } else {
            moveVideo('origin-video');
        }
    }, [isFull]);

    // useEffect(() => {
    //     const videoEl = videoRef.current;
    //     if (!videoEl) return;
    //     videoEl.addEventListener('durationchange', onDurationChange);
    //     return () => {
    //         videoEl.removeEventListener('durationchange', onDurationChange);
    //     };
    // }, []);

    return (
        <div className='w-full h-full flex items-center'>
            <div
                id='origin-video'
                className='relative flex w-full justify-center my-[20px]'
                style={{ aspectRatio: '8/5', width: '100%' }}
            >
                <video
                    ref={videoRef}
                    muted={muted}
                    width='100%'
                    height='100%'
                    playsInline
                    src={videoUrl}
                    // onPlay={}
                    // onError={}
                    // onProgress={}
                    // onEnded={}
                    // onCanPlay={}
                    autoPlay={isPlaying}
                    onLoadedMetadata={handleLoadedMetadata}
                    onTimeUpdate={handleTimeUpdate}
                    controls
                />
                {/* <PlayerBody
                    videoUrl={videoUrl}
                    isFullScreen={isFullScreen}
                    setIsFullScreen={setIsFullScreen}
                    isPreviousPlay={isPreviousPlaying}
                    setIsPreviousPlay={setIsPreviousPlaying}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    playRef={playRef}
                    setValue={setValue}
                    value={value}
                /> */}
            </div>
            <Portal>
                <div
                    id='video-portal'
                    className={clsx(
                        'pointer-events-none fixed inset-0 left-0 top-0 z-50 h-[100dvh] w-full bg-black',
                        !isFull && 'hidden'
                    )}
                    style={{ pointerEvents: 'auto' }}
                >
                    <div
                        id='full-screen'
                        className='relative flex h-full w-full justify-center'
                        style={{ aspectRatio: '8/5' }}
                    ></div>
                </div>
            </Portal>
        </div>
    );
}
