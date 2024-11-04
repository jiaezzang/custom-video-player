import { useState } from 'react';
import VideoPlayer from '../../../widgets/PlayerContainer';
import clsx from 'clsx';

const initUrl =
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

/**
 *
 * @returns {JSX.Element}
 */
export default function Main(): JSX.Element {
    /** 비디오 Url의 Input */
    const [value, setValue] = useState(initUrl);

    /** 현재 등록된 비디오 Url을 상태 관리한다. */
    const [videoUrl, setVideoUrl] = useState(initUrl);

    /** 비디오 url 입력창을 상태 관리한다. */
    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    /** 비디오를 교체한다. */
    const handleVideoUrl = () => {
        if (value.length === 0) return;
        setVideoUrl(value);
    };

    return (
        <div className='w-screen h-[100dvh] bg-blue-200 items-center flex justify-center'>
            <div className='m-[20px] max-w-[800px] w-full bg-white rounded-3xl flex flex-col items-center overflow-hidden'>
                <h1 className='text-[20px] text-black/60 font-extrabold mt-[20px] mb-[10px]'>
                    📹.oO( my video... )
                </h1>
                <div
                    className={clsx(
                        'border rounded-full flex h-[32px] w-[80%] items-center',
                        value.length > 0 && value === videoUrl
                            ? 'bg-black/10'
                            : 'bg-white'
                    )}
                >
                    <p className='w-[80px] flex items-center justify-center'>
                        🔗
                    </p>
                    <input
                        type='text'
                        className={clsx(
                            'h-[30px] w-full text-black/80 bg-transparent truncate pr-[10px]'
                        )}
                        value={value}
                        onChange={handleChangeValue}
                        placeholder={`Please enter the video URL.`}
                    />
                    <button
                        className='w-[80px] flex items-center justify-center text-center bg-blue-300 rounded-full h-[28px] mr-[1px]'
                        onClick={handleVideoUrl}
                    >
                        Load
                    </button>
                </div>

                <VideoPlayer key={videoUrl} videoUrl={videoUrl} />
            </div>
        </div>
    );
}
