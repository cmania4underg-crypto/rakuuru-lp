import { useEffect } from "react";
import { CheckCircle, Phone, MessageCircle } from "lucide-react";

const LINE_URL = "https://line.me/R/ti/p/@198mfgoi";
const TEL = "0120-201-484";

export default function Thanks() {
  useEffect(() => {
    // Google広告コンバージョン計測（サンクスページ到達）
    if (typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-17857255508/thanks_page_view",
      });
    }
    // ページタイトルを設定
    document.title = "ご相談ありがとうございます | らくうる";
    // ページトップへスクロール
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center px-4 py-16">
      {/* ロゴ */}
      <div className="mb-8 text-center">
        <span className="text-2xl font-black text-green-700">らくうる</span>
        <p className="text-xs text-gray-500 mt-1">不動産買取専門店</p>
      </div>

      {/* メインメッセージ */}
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center mb-8">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-3">
          ご相談ありがとうございます！
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          LINEアプリが開きましたら、メッセージをお送りください。<br />
          代表の奥村が直接ご返信いたします。
        </p>
        <div className="bg-green-50 rounded-xl p-4 text-left mb-6">
          <p className="text-xs font-bold text-green-700 mb-2">📋 ご連絡の際にお伝えいただくと便利なこと</p>
          <ul className="text-xs text-slate-600 space-y-1">
            <li>・物件の種類（戸建て・マンション・土地など）</li>
            <li>・おおよその所在地（市区町村レベルで大丈夫です）</li>
            <li>・売却をお考えの理由（相続・空き家・その他）</li>
          </ul>
        </div>
        <p className="text-xs text-slate-400">
          ※ LINEが開かない場合は、LINEアプリで「@198mfgoi」を検索してください
        </p>
      </div>

      {/* 再度CTAボタン */}
      <div className="flex flex-col gap-3 w-full max-w-md">
        <a
          href={LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-4 px-6 rounded-xl text-base hover:bg-green-600 transition-colors shadow-md"
        >
          <MessageCircle className="w-5 h-5" />
          LINEで相談する（24時間受付）
        </a>
        <a
          href={`tel:${TEL}`}
          className="flex items-center justify-center gap-2 bg-amber-500 text-white font-bold py-4 px-6 rounded-xl text-base hover:bg-amber-600 transition-colors shadow-md"
        >
          <Phone className="w-5 h-5" />
          {TEL}（電話で相談）
        </a>
        <a
          href="/"
          className="text-center text-sm text-slate-500 hover:text-slate-700 transition-colors py-2"
        >
          ← トップページに戻る
        </a>
      </div>

      {/* 安心メッセージ */}
      <div className="mt-8 text-center">
        <p className="text-xs text-slate-400">
          査定・相談は完全無料・秘密厳守です。<br />
          しつこい営業は一切行いません。
        </p>
      </div>
    </div>
  );
}
