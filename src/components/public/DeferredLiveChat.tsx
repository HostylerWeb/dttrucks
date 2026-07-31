"use client";

import dynamic from "next/dynamic";
import Script from "next/script";

const LiveChatWidget = dynamic(
  () => import("@/components/public/LiveChatWidget").then((mod) => mod.LiveChatWidget),
  { ssr: false }
);

export function DeferredLiveChat({
  phone,
  liveChatId,
}: {
  phone: string;
  liveChatId?: string | null;
}) {
  return (
    <>
      <LiveChatWidget phone={phone} />
      {liveChatId && (
        <Script
          id="live-chat-widget"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `(function(){var w=window;var d=document;try{if(!w.__dtLiveChat){w.__dtLiveChat=true;var s=d.createElement('script');s.src='https://embed.tawk.to/${liveChatId}/default';s.async=true;s.charset='UTF-8';s.setAttribute('crossorigin','*');d.body.appendChild(s);}}catch(e){}})();`,
          }}
        />
      )}
    </>
  );
}
