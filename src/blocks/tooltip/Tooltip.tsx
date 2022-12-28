'use client';
import React, { ReactNode, useRef, useState } from 'react';
import { usePopper } from 'react-popper';
import { Popover, Transition } from '@headlessui/react';
import { useOnClickOutside } from 'usehooks-ts';

const Tooltip = (props: { children: ReactNode; className?: string; title: string | ReactNode }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement);

  const WrapEl = useRef<HTMLDivElement>(null);

  useOnClickOutside(WrapEl, () => {
    setIsLocked(false);
    setIsShowing(false);
  });

  return (
    <Popover
      className={[props.className, 'relative'].filter(Boolean).join(' ')}
      onMouseEnter={() => setIsShowing(true)}
      onMouseLeave={() => {
        if (!isLocked) setIsShowing(false);
      }}
      ref={WrapEl}
    >
      <Popover.Button
        ref={setReferenceElement}
        className="focus:text-primary focus:outline-none"
        onClick={() => setIsLocked((old) => !old)}
      >
        {props.children}
      </Popover.Button>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        show={isShowing}
      >
        <Popover.Panel
          className={['coat-menu', 'text-sm p-4', 'z-10', 'w-60 max-w-screen-2/3'].join(' ')}
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          {props.title}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Tooltip;
