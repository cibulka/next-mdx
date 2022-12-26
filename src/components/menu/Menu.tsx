import React, { Fragment, ReactNode } from 'react';
import { Menu as MenuHeadless, Transition } from '@headlessui/react';

const Menu = (props: { children: ReactNode; items: ReactNode[] }) => (
  <div className="flex flex-col relative">
    <MenuHeadless>
      <MenuHeadless.Button className="block">{props.children}</MenuHeadless.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuHeadless.Items
          className={[
            'absolute right-0',
            'w-32',
            'origin-top-right',
            'bg-white shadow-lg',
            'focus:outline-none',
          ].join(' ')}
          style={{ top: '100%' }}
        >
          {props.items.map((item, i) => (
            <MenuHeadless.Item key={i}>
              {({ active }) => (
                <div
                  className={['border-b p-2', active && 'bg-neutral-100'].filter(Boolean).join(' ')}
                >
                  {item}
                </div>
              )}
            </MenuHeadless.Item>
          ))}
        </MenuHeadless.Items>
      </Transition>
    </MenuHeadless>
  </div>
);

export default Menu;
