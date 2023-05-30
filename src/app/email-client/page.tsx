'use client';

import React from 'react';

import { useState } from 'react';
import { ArchiveIcon, MailIcon } from '@heroicons/react/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { type } from 'os';
import classNames from 'classnames';

let titles = [
  ["Apple's newest iPhone is here", 'Watch our July event'],
  [
    "Nintendo's Newsletter for July",
    'Introducing Strike, a 5-on-5 soccer game'
  ],
  ['Your funds have been processed', 'See your latest deposit online'],
  ['This Week in Sports', 'The finals are heating up'],
  ['Changelog update', 'Edge subroutines and more'],
  ['React Hawaii is here!', 'Time for fun in the sun']
];

export default function EmailClient() {
  const [messages, setMessages] = useState([...Array(9).keys()]);
  const [selectedMessage, setSelectedMessage] = useState<number[]>([]);

  function addMessage() {
    let newId = (messages.at(-1) || 0) + 1;
    setMessages((messages) => [...messages, newId]);
  }

  function archiveMessage(mid: number) {
    setMessages((messages: number[]) => messages.filter((id) => id !== mid));
  }

  function selectMessage(mid: number) {
    setSelectedMessage((messages: number[]) => [...messages, mid]);
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center overscroll-y-contain bg-gradient-to-br from-slate-700 to-slate-900 py-8 px-6 text-slate-600">
      <div className="mx-auto flex w-full max-w-3xl flex-1 overflow-hidden rounded-2xl bg-white ">
        <div className="flex w-[45%] flex-col bg-slate-50 py-2">
          <div className="border-b px-5">
            <div className="flex justify-between py-2 text-right">
              <button
                onClick={addMessage}
                className="-mx-2 rounded px-2 py-1 text-slate-400 hover:text-slate-500 active:bg-slate-200"
              >
                <MailIcon className="h-5 w-5 " />
              </button>
              <button
                onClick={addMessage}
                className="-mx-2 rounded px-2 py-1 text-slate-400 hover:text-slate-500 active:bg-slate-200"
              >
                <ArchiveIcon className="h-5 w-5 " />
              </button>
            </div>
          </div>
          <ul className="overflow-y-scroll px-3 pt-2">
            <AnimatePresence initial={false}>
              {[...messages].reverse().map((mid: number) => {
                return (
                  <motion.li
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{
                      opacity: { duration: 0.4 },
                      height: { duration: 0.7, type: 'spring', bounce: 0.35 }
                    }}
                    exit={{ opacity: 0, height: 0 }}
                    key={mid}
                    className="relative "
                  >
                    <div className="py-0.5">
                      <button
                        onClick={() => selectMessage(mid)}
                        className={classNames(
                          'block w-full cursor-pointer truncate rounded py-3 px-3 text-left ',

                          { 'bg-blue-400': selectedMessage.includes(mid) },
                          {
                            'hover:bg-slate-200': !selectedMessage.includes(mid)
                          }
                        )}
                      >
                        <p
                          className={classNames(
                            'truncate text-sm font-medium text-slate-500',
                            { 'text-white': selectedMessage.includes(mid) }
                          )}
                        >
                          {titles[mid % titles.length][0]}
                        </p>
                        <p
                          className={classNames(
                            'truncate text-xs text-slate-400',
                            { 'text-white': selectedMessage.includes(mid) }
                          )}
                        >
                          {titles[mid % titles.length][1]}
                        </p>
                      </button>
                    </div>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>
        <div className="flex-1 overflow-y-scroll border-l px-8 py-8">
          <h1 className="h-8 rounded bg-slate-100 text-2xl font-bold" />
          <div className="mt-8 space-y-6">
            {[...Array(9).keys()].map((i) => (
              <div key={i} className="space-y-2 text-sm">
                <p className="h-4 w-5/6 rounded bg-slate-100" />
                <p className="h-4 rounded bg-slate-100" />
                <p className="h-4 w-4/6 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
