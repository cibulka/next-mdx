import React, { Fragment, ReactNode } from 'react';
import { Menu as MenuHeadless, Transition } from '@headlessui/react';
import Paper from '../paper/Paper';

// TODO: Arrows do not work
const Menu = (props: {
  children: ReactNode;
  className?: string;
  classNameMenu?: string;
  isBlack?: boolean;
  items: ReactNode[];
}) => (
  <div className={[props.className, 'relative'].filter(Boolean).join(' ')}>
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
          as={Paper}
          className={[
            props.classNameMenu,
            !props.classNameMenu && !props.isBlack && 'coat-paper',
            !props.classNameMenu && props.isBlack && 'coat-menu-3',
            'absolute right-0',
            'w-32',
            'origin-top-right',
            'focus:outline-none',
          ]
            .filter(Boolean)
            .join(' ')}
          elevation={5}
          isHover
          style={{ top: '100%' }}
        >
          {props.items.map((item, i) => (
            <MenuHeadless.Item key={i}>
              {({ active }) => (
                <div
                  className={[
                    'border-b',
                    active && !props.isBlack && 'coat-page-1',
                    active && props.isBlack && 'coat-menu-1',
                  ]
                    .filter(Boolean)
                    .join(' ')}
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
