import { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

export const Portal = ({ children }: PropsWithChildren) => {
    const portalRoot = document.getElementById('portal-root') as HTMLDivElement;
    return createPortal(<>{children}</>, portalRoot);
};
