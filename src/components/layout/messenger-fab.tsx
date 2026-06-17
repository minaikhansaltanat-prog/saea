"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { WhatsAppIcon, TelegramIcon, WeChatIcon } from "@/components/icons/brand-icons";

interface Messengers {
  whatsapp: string;
  telegram: string;
  wechat: string;
}

export function MessengerFab({ messengers }: { messengers: Messengers }) {
  const [open, setOpen] = useState(false);

  const items = [
    { key: "whatsapp", label: "WhatsApp", href: messengers.whatsapp, icon: WhatsAppIcon, color: "bg-[#25D366]" },
    { key: "telegram", label: "Telegram", href: messengers.telegram, icon: TelegramIcon, color: "bg-[#229ED9]" },
    { key: "wechat", label: "WeChat", href: messengers.wechat, icon: WeChatIcon, color: "bg-[#7BB32E]" },
  ];

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {open && (
          <motion.div className="flex flex-col items-end gap-3">
            {items.map((item, i) => {
              const Icon = item.icon;
              const ready = Boolean(item.href);
              return (
                <motion.a
                  key={item.key}
                  href={ready ? item.href : undefined}
                  target={ready ? "_blank" : undefined}
                  rel={ready ? "noopener noreferrer" : undefined}
                  onClick={(e) => {
                    if (!ready) e.preventDefault();
                  }}
                  initial={{ opacity: 0, y: 12, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.85 }}
                  transition={{ duration: 0.18, delay: i * 0.05 }}
                  className="group relative flex items-center gap-3"
                  aria-disabled={!ready}
                >
                  <span className="rounded-lg bg-navy-900 px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                    {ready ? item.label : `${item.label} · жақында`}
                  </span>
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full text-white shadow-card ${item.color} ${
                      ready ? "" : "opacity-60"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Байланыс мессенджерлері"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gold-500 text-navy-900 shadow-gold transition-transform active:scale-95"
      >
        {!open && <span className="absolute inset-0 rounded-full bg-gold-400/60 animate-pulse-ring" />}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 45 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}
