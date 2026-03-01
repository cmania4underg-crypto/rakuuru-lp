import { useState, useEffect, useRef } from "react";
import {
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Star,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Clock,
  Shield,
} from "lucide-react";

// CDN URLs — 奥村氏写真
const OKUMURA_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/okumura-new1_bc7bfd1d.png";
const OKUMURA_FRONT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/okumura-glasses2_15745fe8.jpg";
const BADGE_100 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/badge-100-deals-transparent_28442c85.png";

// CDN URLs — 物件写真
const PROPERTY_1 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/IMG_5732_68838807.JPG";
const PROPERTY_2 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/IMG_5735_0cac043a.JPG";
const PROPERTY_3 = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/IMG_5529_3fbaf560.JPG";

// CDN URLs — ペルソナ画像（悩みの状況）
const PERSONA_WAITING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/persona1-waiting_704a3b1b.jpg";
const PERSONA_MANSION = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/persona2-mansion_8bb5cdf5.jpg";
const PERSONA_EMPTY_HOUSE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/persona3-empty-house_dde00c58.jpg";
const PERSONA_FACILITY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/persona4-facility_987da65a.jpg";
const PERSONA_RELIEF = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/persona5-relief_0e9c028a.jpg";

// CDN URLs — FV背景・お客様の声（ポジティブ・解決後）
const FV_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/fv-bg-bright-oTY6ALuxddBVXimwf8uUBm.webp";
const VOICE_RELIEF_HANDS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/voice-relief-hands-NswF83gmrqrNkiP8TWd3EB.webp";
const VOICE_MANSION_BALCONY = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/voice-mansion-balcony-UpE27CKWsXmeuchGoN3FLP.webp";
const VOICE_EMPTY_HOUSE_GARDEN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/voice-empty-house-garden-89dkGnrDtgYVg2kvNyDFoA.webp";
const VOICE_FACILITY_FLOWERS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/voice-facility-flowers-6ESWnnb8Y2EyRoe7Fz6dus.webp";

// CDN URLs — 5つの0円サポート画像
const SUPPORT_COMMISSION = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/support-commission-7b825TEGcGABp7zYApfVZA.webp";
const SUPPORT_JUNK = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/support-junk-ScJod4VBE63RgFQ3eBgrh2.webp";
const SUPPORT_MOVING = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/support-moving-PNuYqSZJ3Cq7HzXJhDxk7p.webp";
const SUPPORT_DEMOLITION = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/support-demolition-dU2Qzc94NDDxb5TijuDgMV.webp";
const SUPPORT_REGISTRATION = "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/support-registration-b2cNGzxMTRMFhrbcgvuiH5.webp";

// CDN URLs — 悩みセクション（物・背景中心のリアル画像）
const WORRY_CALENDAR = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663281156533/uovvyvFlaIBpeabc.jpg";
const WORRY_MGMT_FEE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663281156533/dkcXDxQbSXJwUWFl.jpg";
const WORRY_EMPTY_HOUSE = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663281156533/ApflVzsBzMjziFZd.jpg";
const WORRY_FACILITY = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663281156533/IYouiAazqWCpRshe.jpg";

const LINE_URL = "https://line.me/R/ti/p/@198mfgoi";
const INSTA_URL = "https://www.instagram.com/rakuuru_sapporo1/";
const MAIL = "rakuuru201@gmail.com";
const TEL = "0120-201-484";

const worries = [
  {
    icon: Clock,
    title: "仲介で半年待っている間に...",
    headline: "「仲介で半年待っていたら、\n本人が先に亡くなってしまう」",
    body: "高齢の方が施設入居のために売却を決意しても、仲介では半年〜1年かかることも。その間に体調が急変するケースが実際にあります。",
    color: "red",
    image: WORRY_CALENDAR,
  },
  {
    icon: AlertTriangle,
    title: "誰も住まない間も...",
    headline: "「管理費・修繕積立金が\n毎月3万円、消えていく」",
    body: "空き家になったマンションでも管理費は止まりません。売却を迷っている間に、年間36万円以上が消えていきます。",
    color: "amber",
    image: WORRY_MGMT_FEE,
  },
  {
    icon: MapPin,
    title: "子供が帰らない実家...",
    headline: "「子供たちは誰も帰ってこない。\nこの家、どうすればいいのか」",
    body: "空き家は放置すると劣化が進み、固定資産税の特例も外れます。早めに動くほど、高く売れる可能性が高くなります。",
    color: "blue",
    image: WORRY_EMPTY_HOUSE,
  },
  {
    icon: Shield,
    title: "施設入居が決まったのに...",
    headline: "「入居費用が必要なのに、\n家が売れない」",
    body: "介護施設への入居一時金は数百万円。仲介では間に合わないケースも。らくうるなら最短数日で現金化できます。",
    color: "green",
    image: WORRY_FACILITY,
  },
];

const colorMap: Record<string, { badge: string; border: string; tag: string }> = {
  red: { badge: "bg-red-100 text-red-700", border: "border-red-200", tag: "bg-red-600" },
  amber: { badge: "bg-amber-100 text-amber-700", border: "border-amber-200", tag: "bg-amber-600" },
  blue: { badge: "bg-blue-100 text-blue-700", border: "border-blue-200", tag: "bg-blue-700" },
  green: { badge: "bg-green-100 text-green-700", border: "border-green-200", tag: "bg-green-700" },
};

const concerns = [
  {
    q: "「家を売ったら、いつお金がもらえるんですか？」",
    sub: "急いでいるのに、いつ現金化できるか分からなくて不安...",
    a: "「原則、契約当日か翌日にお支払いします。買取金額の最大50%を先にお渡しできますので、引っ越し費用や急な出費にもすぐ対応できます。」",
  },
  {
    q: "「家の中が片付いていないんですけど、売れますか？」",
    sub: "荷物が山積みで、どこの業者にも断られそうで...",
    a: "「売れます。そのままの方がむしろ買取金額を上げられます。処分業者をこちらで手配しますので、お客様の煩わしいことをさせずに、そのまま楽に売却できるようにしております。」",
  },
  {
    q: "「引っ越し先が決まっていないから、売れないと思っていました」",
    sub: "売る前に引っ越し先を探さないといけないのかと...",
    a: "「引っ越し先の相談もできます。提携している引っ越し業者がいますので、見積もりを取った上でスケジュールも全部詰めてやっていきます。全部任せていただければと思います。」",
  },
  {
    q: "「ローンがまだ残っているので、売ったら借金だけ残りそうで怖い」",
    sub: "ローン残高が多くて、売却に踏み切れない...",
    a: "「買取金額がローン残高を上回れば、お客様の持ち出しなしで売却できます。まず実際の金額を確認してみましょう。5年以内の新築は難しいケースもありますが、まずはご相談ください。」",
  },
  {
    q: "「リフォームしないと売れないと思っていました」",
    sub: "古い家だから、お金をかけて直さないといけないのかと...",
    a: "「リフォームはしなくていいです。今住んでいる状態でそのまま売却するのが、費用もかからず、お客様にとって手残りが一番多い状態です。リフォーム費用が回収できるかも分からないので、無駄になるケースがあります。」",
  },
  {
    q: "「査定後に値下げを迫られるんじゃないかと思っています」",
    sub: "高い金額を提示されて、後から下げられるのが怖い...",
    a: "「買取であれば、提示した金額が確定している金額です。後から下がることはありません。値下げしましょうというのは仲介会社のやり方で、弊社の買取では一切ありません。」",
  },
  {
    q: "「査定したら、毎日営業電話がくるんじゃないですか？」",
    sub: "問い合わせして、しつこく電話されたら嫌だな...",
    a: "「弊社は基本的に営業電話を推奨していません。私自身も営業電話が来て嫌な気持ちをした経験があります。それをお客さんにぶつけるのは違うかなと思ってやっていません。」",
  },
];

const zeros = [
  { label: "仲介手数料", desc: "直接買取だから仲介手数料は一切不要", image: SUPPORT_COMMISSION, detail: "仲介業者を通さない直接買取なので、当社が仲介手数料を受け取ることはありません。従来の売却価格の３％相当が丸ごと節約できます。" },
  { label: "不用品処分", desc: "家具・家電など残置物もそのままでOK", image: SUPPORT_JUNK, detail: "片付け不要。山積みの荷物も、大型家具も、処分業者を当社が手配します。お客様の手間は一切かかりません。" },
  { label: "引越し費用", desc: "引越し業者の手配・費用も当社が負担", image: SUPPORT_MOVING, detail: "提携引越業者と連携しているので、見積もスケジュール調整も全部お任せいただけます。" },
  { label: "解体費用", desc: "古い建物の解体費用も当社が負担", image: SUPPORT_DEMOLITION, detail: "築古物件や老朽化した建物も、解体費用は当社負担。建物を解体しても、しなくても、どちらでも対応します。" },
  { label: "登記費用", desc: "名義変更などの登記手続き費用も0円", image: SUPPORT_REGISTRATION, detail: "不動産登記の名義変更にかかる司法書士費用や登記所費用もすべて当社負担。手続きは全部お任せください。" },
];

const steps = [
  { step: "01", title: "お電話・LINE", desc: "奥村が直接電話に出ます。まずお気軽にご相談ください。物件の状況をヒアリングします。" },
  { step: "02", title: "奥村が直接訪問・査定", desc: "奥村が直接お伺いして現地を確認します。最短即日で正確な査定金額をご提示します。" },
  { step: "03", title: "金額・条件のすり合わせ", desc: "いつまでに退去するか、いつお金が必要か。お客様の状況に合わせて丁寧に詰めます。" },
  { step: "04", title: "契約・手付金お支払い", desc: "契約時に買取金額の最大50%を先払い。急な費用にもすぐ対応できます。" },
  { step: "05", title: "引渡し・残金お支払い", desc: "引っ越し完了後、残りの金額を全額お支払い。登記手続きも全て当社で行います。" },
];

const achievements = [
  { label: "買取実績", value: "100件+", sub: "年間買取件数" },
  { label: "営業年数", value: "7年", sub: "札幌での実績" },
  { label: "最短現金化", value: "24時間", sub: "査定から入金まで" },
  { label: "仲介手数料", value: "0円", sub: "一切不要" },
];

const caseStudies = [
  {
    area: "北区",
    price: "1,450万円",
    age: "築25-30年",
    layout: "3LDK",
    date: "2024年3月成約",
    type: "戸建て",
    photo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/LINE_ALBUM_beforeAfter_260224_1_d2d79a4a.jpg",
    comment: "相続した実家を片付けなしで買取。仲介手数料0円で、思っていたより高く売れました。",
  },
  {
    area: "東区",
    price: "980万円",
    age: "築30-35年",
    layout: "3LDK",
    date: "2024年2月成約",
    type: "戸建て（残置物あり）",
    photo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/LINE_ALBUM_beforeAfter_260224_3_5e7c3f91.jpg",
    comment: "残置物そのまま買取！相続した実家で荷物がそのままでしたが、1週間で契約完了。",
  },
  {
    area: "白石区",
    price: "1,650万円",
    age: "築20-25年",
    layout: "3LDK",
    date: "2024年4月成約",
    type: "マンション",
    photo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/LINE_ALBUM_beforeAfter_260224_2_e2c897e5.jpg",
    comment: "築20年以上で売れるか心配でしたが、リノベーション前提で積極的に買い取ってくれました。登記費用0円！",
  },
  {
    area: "白石区",
    price: "1,350万円",
    age: "築30-35年",
    layout: "3LDK",
    date: "2024年6月成約",
    type: "マンション室内（残置物あり）",
    photo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/LINE_ALBUM_beforeAfter_251210_35_80966508.jpg",
    comment: "築古マンションをリノベーション前提で積極的に買取。他社より高査定。",
  },
  {
    area: "北区",
    price: "2,300万円",
    age: "築15-20年",
    layout: "4LDK",
    date: "2024年5月成約",
    type: "戸建て",
    photo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/IMG_5735_e12786b5.JPG",
    comment: "ガレージ付き戸建てを高価買取。付加価値をしっかり評価しました。",
  },
  {
    area: "東区",
    price: "800万円",
    age: "築35-40年",
    layout: "3LDK",
    date: "2024年11月成約",
    type: "戸建て",
    photo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663281156533/LDrsVSa9yTJ55mdpER6zBw/IMG_5732_63570619.JPG",
    comment: "残置物そのまま買取！親の遺品整理が大変でしたが、片付け費用0円で対応。",
  },
];

// ペルソナ別お客様の声（深層心理ストーリー）
const testimonials = [
  {
    persona: "仲介で半年待っている間に...",
    title: "「仲介で半年待っていたら、夫が先に逝ってしまいました」",
    text: "夫が体調を崩してから、老人ホームの入居費用のために自宅を売ろうと決めました。最初は仲介業者に頼みましたが、「半年は見てください」と言われ待ち続けました。半年後、夫は施設に入る前に亡くなりました。あの時すぐに動いていれば、と今でも思います。らくうるさんに相談したのは夫が亡くなった後でしたが、相続手続きも含めて奥村さんが全部一緒に考えてくださいました。",
    price: "1,450万円で売却",
    saving: "仲介手数料約55万円節約",
    period: "相談から14日で契約",
    area: "札幌市北区・70代女性",
    image: VOICE_RELIEF_HANDS,
    imageAlt: "契約完了後に鍵を持つ手—安堵感",
    tag: "仲介待ちの悲劇",
    tagColor: "bg-red-600",
  },
  {
    persona: "誰も住まない実家の管理費が...",
    title: "「毎月3万円の管理費を払い続けて、もう限界でした」",
    text: "母が施設に入ってから、誰も住んでいないマンションの管理費・修繕積立金が毎月3万円かかっていました。2年間で70万円以上。売ろうにも「片付けが大変」「リフォームしないと売れない」と言われ続けて。らくうるさんに相談したら「そのままで大丈夫です」と言ってくれて。本当に片付け一切なしで、しかも思っていたより高く売れました。あの2年間の管理費が悔しいです。",
    price: "1,200万円で売却",
    saving: "管理費・修繕積立金の負担解消",
    period: "相談から10日で契約",
    area: "札幌市中央区・60代夫婦",
    image: VOICE_MANSION_BALCONY,
    imageAlt: "マンション売却後の明るいバルコニー—新しい出発",
    tag: "管理費の重荷",
    tagColor: "bg-amber-600",
  },
  {
    persona: "子供が帰らない実家が...",
    title: "「子供たちは誰も帰ってこない。この家、どうすればいいのか」",
    text: "妻が亡くなって一人になり、子供たちはみんな本州に出ていきました。この家に一人でいても、思い出ばかりで辛い。でも売るのも申し訳ない気がして、ずっと決断できませんでした。奥村さんは「この家を再生して、新しい家族に住んでもらいます」と言ってくれた。それを聞いて、踏ん切りがつきました。家が壊されるのではなく、誰かに使ってもらえる。それが一番の救いでした。",
    price: "800万円で売却",
    saving: "固定資産税・維持費の負担解消",
    period: "相談から21日で契約",
    area: "札幌市東区・70代男性",
    image: VOICE_EMPTY_HOUSE_GARDEN,
    imageAlt: "売約済の日本家屋—次の家族への引き継ぎ",
    tag: "空き家の決断",
    tagColor: "bg-blue-700",
  },
  {
    persona: "施設入居前に家を売りたかった...",
    title: "「施設への入居日が迫っているのに、家が売れない」",
    text: "母の認知症が進み、介護施設への入居が決まりました。入居費用の一時金が必要なのに、自宅がなかなか売れない。仲介業者には「3ヶ月はかかります」と言われ途方に暮れていました。らくうるさんに連絡したのは入居の2週間前。奥村さんは「間に合わせます」と言ってくれて、本当に入居前日に契約が完了しました。あの時の安堵感は忘れられません。",
    price: "1,650万円で売却",
    saving: "仲介手数料約62万円節約",
    period: "相談から12日で契約",
    area: "札幌市白石区・50代女性（母親名義）",
    image: VOICE_FACILITY_FLOWERS,
    imageAlt: "居室の花と窓—安心して新生活へ",
    tag: "施設入居前の緊急売却",
    tagColor: "bg-green-700",
  },
];

// スクロールアニメーション hook
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// FAQ アコーディオン
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full text-left py-4 flex items-start justify-between gap-3 hover:text-primary transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-bold text-base leading-snug">{q}</span>
        {open ? <ChevronUp className="w-5 h-5 flex-shrink-0 mt-0.5 text-primary" /> : <ChevronDown className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-400" />}
      </button>
      {open && (
        <div className="pb-4 text-gray-700 text-sm leading-relaxed pl-0 pr-8">
          {a}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  useScrollReveal();
  const worryRef = useRef<HTMLDivElement>(null);

  const scrollToWorry = () => {
    worryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ===== ヘッダー ===== */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container flex items-center justify-between py-3">
          <div>
            <div className="text-2xl font-black text-primary" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              らくうる
            </div>
            <div className="text-xs text-gray-500">札幌の不動産買取</div>
          </div>
          <div className="flex items-center gap-2">
            <a href={INSTA_URL} target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-1.5 text-gray-600 hover:text-pink-500 transition-colors text-xs font-bold">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              インスタ
            </a>
            <a href={`tel:${TEL}`} className="hidden sm:flex items-center gap-1.5 bg-amber-500 text-white font-bold px-3 py-2 rounded text-sm hover:bg-amber-600 transition-colors">
              <Phone className="w-4 h-4" />
              <span>{TEL}</span>
            </a>
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-green-500 text-white font-bold px-3 py-2 rounded text-sm hover:bg-green-600 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>LINE相談</span>
            </a>
          </div>
        </div>
      </header>

      {/* ===== ヒーロー ===== */}
      <section className="relative overflow-hidden">
        {/* 背景画像（札幌住宅街・桜・解放感） */}
        <div className="absolute inset-0">
          <img src={FV_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/70 to-slate-900/40" />
        </div>

        <div className="container relative z-10 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* テキスト */}
            <div className="flex-1 text-white">
              {/* バッジ */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">⭐ 7年間の実績</span>
                <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">⚡ 最短24時間で現金化</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                札幌市の不動産売却、<br />
                <span className="text-amber-400">奥村に直接</span><br />
                相談してください。
              </h1>

              <p className="text-blue-100 text-base md:text-lg mb-2 leading-relaxed">
                電話に出るのも、査定に行くのも、<strong className="text-white">代表の奥村が直接対応</strong>します。
              </p>
              <p className="text-blue-200 text-sm mb-8 leading-relaxed">
                片付け不要・リフォーム不要・仲介手数料0円。<br />
                まずはお気軽にご相談ください。
              </p>

              {/* CTAボタン */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="cta-line flex-1 text-center no-underline animate-pulse-gentle">
                  <MessageCircle className="w-5 h-5" />
                  LINEで無料相談（24時間受付）
                </a>
                <a href={`tel:${TEL}`} className="cta-tel flex-1 text-center no-underline">
                  <Phone className="w-5 h-5" />
                  {TEL}
                </a>
              </div>
              <p className="text-blue-300 text-xs">通話無料・9:00〜19:00・年中無休</p>

              {/* 下スクロール誘導 */}
              <button onClick={scrollToWorry} className="mt-6 flex items-center gap-2 text-blue-300 hover:text-white text-sm transition-colors">
                <ChevronDown className="w-4 h-4" />
                こんなお悩みありませんか？
              </button>
            </div>

            {/* 奥村氏の写真 */}
            <div className="relative flex-shrink-0 w-64 md:w-80">
              <img
                src={OKUMURA_HERO}
                alt="らくうる代表 奥村竜成"
                className="w-full object-contain drop-shadow-2xl"
              />
              {/* 吹き出し */}
              <div className="absolute top-4 left-0 bg-white text-slate-900 rounded-xl rounded-tl-none px-4 py-3 shadow-xl max-w-[180px]">
                <p className="text-xs font-bold text-primary mb-1">らくうる代表 奥村竜成</p>
                <p className="text-sm font-bold leading-snug">私が直接、<br />ご相談を伺います！</p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ===== 奥村氏の直接対応 強調セクション ===== */}
      <section className="bg-amber-50 border-y border-amber-200 py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="flex-shrink-0">
              <img
                src={OKUMURA_FRONT}
                alt="らくうる代表 奥村竜成"
                className="w-24 h-24 md:w-28 md:h-28 object-cover object-top rounded-full border-4 border-amber-400 shadow-lg"
              />
            </div>
            <div>
              <p className="text-amber-800 font-black text-xl md:text-2xl" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                電話に出るのも、査定に行くのも、<span className="text-amber-600 underline decoration-2">代表の奥村が直接対応</span>します。
              </p>
              <p className="text-amber-700 text-sm mt-1">
                担当者が変わったり、よく分からない業者が来たりしません。最初から最後まで奥村が責任を持って対応します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 緊急性を訴えるペルソナ悩みセクション ===== */}
      <section ref={worryRef} className="py-14 bg-slate-50">
        <div className="container">
          <div className="scroll-reveal text-center mb-10">
            <span className="inline-flex items-center gap-1.5 bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
              <AlertTriangle className="w-3.5 h-3.5" />
              決断を、先延ばしにしないでください。
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              「待っている間に」起きていること
            </h2>
            <p className="text-gray-600 mt-3 text-sm max-w-xl mx-auto">
              仲介業者に頼んで「半年待ってください」と言われた方へ。<br />
              その間にも、時間は確実に過ぎています。
            </p>
          </div>

          {/* ペルソナ別悩みカード（ジグザグレイアウト） */}
          <div className="space-y-8">
            {worries.map((w, i) => {
              const c = colorMap[w.color];
              const isEven = i % 2 === 0;
              return (
                <div key={i} className={`scroll-reveal bg-white rounded-2xl overflow-hidden border ${c.border} shadow-md flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                  {/* 画像エリア */}
                  <div className="relative md:w-2/5 h-56 md:h-auto overflow-hidden flex-shrink-0">
                    <img src={w.image} alt={w.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:hidden">
                      <span className={`${c.tag} text-white text-xs font-bold px-2 py-0.5 rounded`}>{w.title}</span>
                    </div>
                  </div>
                  {/* テキストエリア */}
                  <div className="p-6 flex-1 flex flex-col justify-center">
                    <span className={`hidden md:inline-flex self-start ${c.badge} text-xs font-bold px-3 py-1 rounded-full mb-3`}>{w.title}</span>
                    <p className="font-black text-slate-900 text-lg md:text-xl mb-3 leading-snug whitespace-pre-line">{w.headline}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{w.body}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="scroll-reveal mt-10 bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
            <p className="text-slate-800 font-bold text-base mb-4">こうした状況でも、らくうるなら最短数日で解決できます。</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="cta-line no-underline">
                <MessageCircle className="w-5 h-5" />
                今すぐLINEで相談する
              </a>
              <a href={`tel:${TEL}`} className="cta-tel no-underline">
                <Phone className="w-5 h-5" />
                今すぐ電話する
              </a>
            </div>
            <p className="text-gray-500 text-xs mt-3">奥村が直接お答えします</p>
          </div>
        </div>
      </section>

      {/* ===== よくあるお悩み ===== */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <div className="scroll-reveal text-center mb-10">
            <span className="section-label">奥村が直接お答えします</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              こんなお悩み、ありませんか？
            </h2>
            <p className="text-gray-600 text-sm mt-2">よくいただく7つの不安に、奥村が実際の言葉でお答えします。</p>
          </div>

          <div className="space-y-4">
            {concerns.map((c, i) => (
              <div key={i} className="scroll-reveal bg-gray-50 rounded-xl overflow-hidden" style={{ transitionDelay: `${i * 0.05}s` }}>
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-white text-xs font-black flex items-center justify-center">{i + 1}</span>
                    <div>
                      <p className="text-xs text-gray-500 font-bold mb-0.5">よくあるお悩み</p>
                      <p className="font-black text-slate-900 text-sm leading-snug">{c.q}</p>
                      <p className="text-gray-500 text-xs mt-1 italic">{c.sub}</p>
                    </div>
                  </div>
                  <div className="ml-10 bg-white border border-amber-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <img src={OKUMURA_FRONT} alt="奥村竜成" className="w-7 h-7 rounded-full object-cover object-top border-2 border-amber-400" />
                      <p className="text-xs font-bold text-amber-700">代表 奥村竜成より</p>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">{c.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-reveal mt-8 text-center">
            <p className="text-gray-600 mb-4 text-sm">他にもご不安な点は、直接奥村にお聞きください。</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="cta-line no-underline">
                <MessageCircle className="w-5 h-5" />
                LINEで奥村に相談する
              </a>
              <a href={`tel:${TEL}`} className="cta-tel no-underline">
                <Phone className="w-5 h-5" />
                今すぐ電話する
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 5つの0円サポート ===== */}
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <div className="scroll-reveal text-center mb-10">
            <span className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">費用のご心配なく</span>
            <h2 className="text-2xl md:text-3xl font-black mt-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              らくうるの5つの<span className="text-amber-400">0円</span>サポート
            </h2>
            <p className="text-blue-200 text-sm mt-2">売却にかかる費用はすべて0円。お客様の持ち出しは一切ありません。</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {zeros.map((z, i) => (
              <div key={i} className="scroll-reveal rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-xl flex flex-col" style={{ transitionDelay: `${i * 0.08}s` }}>
                {/* サポート画像（大きめ） */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <img src={z.image} alt={z.label} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  {/* 0円バッジ（中央上部） */}
                  <div className="absolute top-3 right-3">
                    <div className="zero-badge">0</div>
                  </div>
                  {/* ラベル（画像下部） */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="font-black text-white text-base">{z.label}</p>
                    <p className="text-amber-300 text-xs font-bold">完全0円</p>
                  </div>
                </div>
                {/* テキスト */}
                <div className="p-4 flex-1 flex flex-col">
                  <p className="text-blue-100 text-sm leading-snug mb-3 font-bold">{z.desc}</p>
                  <p className="text-slate-400 text-xs leading-relaxed border-t border-slate-700 pt-3 flex-1">{z.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="scroll-reveal mt-10 text-center">
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="cta-line inline-flex no-underline max-w-sm mx-auto">
              <MessageCircle className="w-5 h-5" />
              無料で相談してみる
            </a>
          </div>
        </div>
      </section>

      {/* ===== 売却の流れ ===== */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="scroll-reveal text-center mb-10">
            <span className="section-label">シンプルな流れ</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              売却の流れ
            </h2>
            <p className="text-gray-600 text-sm mt-2">最短数日で売却完了。全ての手続きを奥村がサポートします。</p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-0.5 bg-gray-200 -translate-x-1/2" />
            <div className="space-y-6">
              {steps.map((s, i) => (
                <div key={i} className={`scroll-reveal flex flex-col md:flex-row items-start md:items-center gap-4 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className={`bg-gray-50 rounded-xl p-5 border border-gray-100 ${i % 2 === 0 ? "md:ml-8" : "md:mr-8"}`}>
                      <p className="text-primary font-black text-2xl mb-1" style={{ fontFamily: "'Noto Serif JP', serif" }}>{s.step}</p>
                      <p className="font-black text-slate-900 text-base mb-2">{s.title}</p>
                      <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
                      {s.step === "02" && (
                        <div className="mt-3 flex items-center gap-2 text-amber-700 text-xs font-bold">
                          <CheckCircle className="w-4 h-4 text-amber-500" />
                          奥村が直接お伺いします
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white font-black text-sm flex items-center justify-center shadow-lg z-10">
                    {i + 1}
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== 実績数字 ===== */}
      <section className="py-12 bg-primary">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {achievements.map((a, i) => (
              <div key={i} className="scroll-reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <p className="text-4xl md:text-5xl font-black text-amber-400 mb-1" style={{ fontFamily: "'Noto Serif JP', serif" }}>{a.value}</p>
                <p className="text-sm font-bold">{a.label}</p>
                <p className="text-blue-300 text-xs mt-0.5">{a.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== お客様の声（ペルソナ別深層心理ストーリー） ===== */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="scroll-reveal text-center mb-4">
            <span className="section-label">実際のお客様の声</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              「あの時、決断してよかった」
            </h2>
            <p className="text-gray-600 text-sm mt-2">実際にらくうるで売却されたお客様の、リアルなストーリーです。</p>
          </div>

          {/* 解決後の安堵画像 */}
          <div className="scroll-reveal mb-10 rounded-2xl overflow-hidden max-w-2xl mx-auto shadow-md">
            <img
              src={PERSONA_RELIEF}
              alt="らくうるで売却後、安堵するお客様"
              className="w-full h-56 object-cover"
            />
            <div className="bg-primary text-white p-4 text-center">
              <p className="text-sm font-bold">「奥村さんに相談して、本当によかった」— 実際のお客様の声</p>
            </div>
          </div>

          <div className="space-y-8">
            {testimonials.map((t, i) => {
              const isEven = i % 2 === 0;
              return (
              <div key={i} className="scroll-reveal bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md flex flex-col md:flex-row" style={{ transitionDelay: `${i * 0.1}s` }}>
                {/* ペルソナ画像（ポジティブ・解決後） */}
                <div className="relative md:w-2/5 h-56 md:h-auto overflow-hidden flex-shrink-0">
                  <img
                    src={t.image}
                    alt={t.imageAlt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className={`${t.tagColor} text-white text-xs font-bold px-2 py-0.5 rounded`}>{t.tag}</span>
                    <p className="text-white font-black text-sm mt-1 leading-snug">{t.persona}</p>
                  </div>
                </div>

                <div className="p-6 flex-1">
                  {/* 星評価 */}
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  {/* 引用符スタイルのタイトル */}
                  <div className="relative mb-3">
                    <span className="absolute -top-2 -left-1 text-5xl text-amber-300 font-serif leading-none select-none">&ldquo;</span>
                    <h3 className="font-black text-slate-900 text-base leading-snug pl-6 pt-2">{t.title}</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 border-l-4 border-amber-200 pl-3 italic">{t.text}</p>
                  <div className="border-t border-gray-200 pt-3 space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="bg-primary text-white px-2 py-0.5 rounded font-bold">{t.price}</span>
                    </div>
                    <p className="text-green-600 text-xs font-bold">✓ {t.saving}</p>
                    <p className="text-blue-600 text-xs font-bold">✓ {t.period}</p>
                    <p className="text-gray-500 text-xs">{t.area}</p>
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          <div className="scroll-reveal mt-10 text-center">
            <p className="text-gray-600 mb-4 text-sm">あなたも、同じ悩みを抱えていませんか？</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
              <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="cta-line no-underline">
                <MessageCircle className="w-5 h-5" />
                LINEで無料相談する
              </a>
              <a href={`tel:${TEL}`} className="cta-tel no-underline">
                <Phone className="w-5 h-5" />
                今すぐ電話する
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 物件写真 ===== */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="scroll-reveal text-center mb-8">
            <span className="section-label">リノベーション実績</span>
            <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              建築のプロが再生するから<br className="md:hidden" />高価買取が可能
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="scroll-reveal rounded-xl overflow-hidden aspect-video">
              <img src={PROPERTY_1} alt="買取物件1" className="w-full h-full object-cover" />
            </div>
            <div className="scroll-reveal rounded-xl overflow-hidden aspect-video" style={{ transitionDelay: "0.1s" }}>
              <img src={PROPERTY_2} alt="買取物件2" className="w-full h-full object-cover" />
            </div>
            <div className="scroll-reveal rounded-xl overflow-hidden aspect-video" style={{ transitionDelay: "0.2s" }}>
              <img src={PROPERTY_3} alt="買取物件3" className="w-full h-full object-cover" />
            </div>
          </div>
          <p className="text-center text-gray-500 text-xs mt-4">築古物件も積極的に買取・リノベーションして再生します</p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 bg-white">
        <div className="container max-w-3xl">
          <div className="scroll-reveal text-center mb-10">
            <span className="section-label">よくある質問</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              FAQ
            </h2>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6">
            <FaqItem q="査定は無料ですか？" a="はい、査定は完全無料です。現地訪問・査定・相談、すべて費用はかかりません。" />
            <FaqItem q="どのくらいの期間で売却できますか？" a="最短で数日〜2週間程度です。お客様のご都合に合わせてスケジュールを調整します。" />
            <FaqItem q="築年数が古くても買取できますか？" a="はい、築古物件も積極的に買取しています。リノベーションを前提としているため、築年数は問いません。" />
            <FaqItem q="相続した物件でも売却できますか？" a="はい、相続物件も対応しています。相続手続きのサポートも含めて奥村が一緒に考えます。" />
            <FaqItem q="遠方に住んでいても相談できますか？" a="はい、LINEやお電話での相談も承っています。現地確認が必要な場合は奥村が直接お伺いします。" />
            <FaqItem q="複数の業者に査定を依頼してもいいですか？" a="もちろんです。他社と比較していただいて構いません。らくうるの買取金額・サービスをぜひ比べてみてください。" />
          </div>
        </div>
      </section>

      {/* ===== 成約事例 ===== */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="scroll-reveal text-center mb-10">
            <span className="section-label">成約実績</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              最近の成約事例
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {caseStudies.map((c, i) => (
              <div key={i} className="scroll-reveal bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="h-44 overflow-hidden">
                  <img src={c.photo} alt={c.type} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded">{c.area}</span>
                    <span className="text-gray-500 text-xs">{c.date}</span>
                  </div>
                  <p className="text-2xl font-black text-primary mb-1" style={{ fontFamily: "'Noto Serif JP', serif" }}>{c.price}</p>
                  <p className="text-gray-600 text-xs mb-2">{c.type} / {c.layout} / {c.age}</p>
                  <p className="text-gray-700 text-xs leading-relaxed border-t border-gray-100 pt-2">{c.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 会社情報 ===== */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="scroll-reveal text-center mb-10">
            <span className="section-label">会社情報</span>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
              らくうるについて
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 会社情報テーブル */}
            <div>
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["会社名", "株式会社らくうる"],
                    ["代表者", "奥村 竜成"],
                    ["所在地", "北海道札幌市東区北20条東1丁目1番17号"],
                    ["電話番号", TEL],
                    ["メール", MAIL],
                    ["営業時間", "9:00〜19:00（年中無休）"],
                    ["対応エリア", "札幌市全区・近郊"],
                    ["免許番号", "北海道知事（1）第8908号"],
                  ].map(([label, value], i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-3 pr-4 font-bold text-gray-500 whitespace-nowrap w-28">{label}</td>
                      <td className="py-3 text-slate-900">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Googleマップ */}
            <div>
              <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 h-64">
                <iframe
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=北海道札幌市東区北20条東1丁目1番17号"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="らくうる 店舗地図"
                />
              </div>
              <div className="mt-3 flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p>北海道札幌市東区北20条東1丁目1番17号</p>
                  <a
                    href="https://maps.google.com/?q=北海道札幌市東区北20条東1丁目1番17号"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary text-xs font-bold hover:underline"
                  >
                    Googleマップで開く →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 最終CTA ===== */}
      <section className="relative py-20 overflow-hidden">
        {/* 背景：FV画像を再利用 */}
        <div className="absolute inset-0">
          <img src={FV_BG} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/90" />
        </div>
        <div className="container relative z-10 text-center text-white">
          {/* アクセントライン */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px bg-amber-400/60 flex-1 max-w-16" />
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Free Consultation</span>
            <div className="h-px bg-amber-400/60 flex-1 max-w-16" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            まずは、奥村に<br className="sm:hidden" />相談してみてください。
          </h2>
          <p className="text-blue-100 text-base mb-2 max-w-lg mx-auto">
            査定・相談は完全無料。しつこい営業電話はしません。
          </p>
          <p className="text-blue-200 text-sm mb-10 max-w-lg mx-auto">
            あなたの状況に合わせた最善の方法を、一緒に考えます。
          </p>
          {/* CTAボタン（大きめ） */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto mb-6">
            <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="cta-line no-underline flex-1 animate-pulse-gentle text-base py-4">
              <MessageCircle className="w-6 h-6" />
              LINEで無料相談（24時間受付）
            </a>
            <a href={`tel:${TEL}`} className="cta-tel no-underline flex-1 text-base py-4">
              <Phone className="w-6 h-6" />
              {TEL}
            </a>
          </div>
          <p className="text-blue-300 text-xs">通話無料・9:00〜19:00・年中無休</p>
          {/* 安心ポイント */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-blue-200">
            <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-400" />査定・相談完全無料</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-400" />しつこい営業電話なし</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-400" />片付け・リフォーム不要</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-400" />最短24時間で現金化</span>
          </div>
        </div>
      </section>

      {/* ===== フッター ===== */}
      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="container text-center text-xs space-y-2">
          <p className="font-bold text-white text-sm">らくうる</p>
          <p>北海道札幌市東区北20条東1丁目1番17号</p>
          <p>北海道知事（1）第8908号</p>
          <p className="mt-4">© 2024 らくうる All Rights Reserved.</p>
        </div>
      </footer>

      {/* ===== スティッキーCTA（モバイル） ===== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 shadow-2xl">
        <div className="flex">
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white font-black text-base py-4 hover:bg-green-600 active:bg-green-700 transition-colors no-underline">
            <MessageCircle className="w-5 h-5" />
            <span>LINE無料相談</span>
          </a>
          <a href={`tel:${TEL}`} className="flex-1 flex items-center justify-center gap-2 bg-amber-500 text-white font-black text-base py-4 hover:bg-amber-600 active:bg-amber-700 transition-colors no-underline">
            <Phone className="w-5 h-5" />
            <span>今すぐ電話</span>
          </a>
        </div>
        <div className="text-center text-xs text-gray-400 py-1 bg-gray-50">通話無料・9:00〜19:00・年中無休</div>
      </div>
    </div>
  );
}
