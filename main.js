/* ============================================================
   合同会社AGG コーポレートサイト / main.js
   必要最小限のJavaScriptのみを実装しています。
   1. ハンバーガーメニューの開閉（スマホ用）
   2. ヘッダーのスクロール検知（影をつけるだけの軽い演出）
   3. お問い合わせフォームの簡易バリデーション（送信機能は未実装）
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- 1. ハンバーガーメニュー ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    /* メニュー内のリンクをクリックしたら自動で閉じる（スマホ用） */
    nav.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 2. ヘッダーのスクロール検知 ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var handleScroll = function () {
      if (window.scrollY > 8) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  /* ---------- 3. お問い合わせフォームの簡易バリデーション ----------
     注意：このフォームは現時点でバックエンド送信機能を実装していません。
     実際にメールを送信する場合は、下記 submit イベント内の処理を、
     サーバーサイド（例：PHPのmail関数、Google Formsとの連携、
     SendGridなどのAPI連携）に置き換えてください。
  ------------------------------------------------------------- */
  var form = document.querySelector("#contact-form");
  if (form) {
    var successBox = document.querySelector("#form-success");

    form.addEventListener("submit", function (event) {
      event.preventDefault(); // ページ遷移・実送信を止める（未実装のため）

      var isValid = true;
      var fields = form.querySelectorAll("[data-required]");

      fields.forEach(function (field) {
        var row = field.closest(".form-row, .form-consent");
        var value = field.value.trim();
        var invalid = field.type === "checkbox" ? !field.checked : value === "";

        if (field.type === "email" && !invalid) {
          var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          invalid = !emailPattern.test(value);
        }

        if (invalid) {
          isValid = false;
          row.classList.add("has-error");
        } else {
          row.classList.remove("has-error");
        }
      });

      if (isValid) {
        /* ここでは送信の代わりに完了メッセージを表示するのみ。
           バックエンド実装後は、この if ブロック内で
           fetch() 等を使った実際の送信処理に置き換えてください。 */
        if (successBox) {
          successBox.classList.add("is-visible");
          successBox.setAttribute("tabindex", "-1");
          successBox.focus();
        }
        form.reset();
      } else {
        var firstError = form.querySelector(".has-error input, .has-error textarea, .has-error select");
        if (firstError) {
          firstError.focus();
        }
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var englishTranslations = {
    "合同会社AGG｜ネパールと日本をつなぐ事業": "AGG LLC | Connecting Nepal and Japan",
    "AGG": "AGG",
    "会社概要｜合同会社AGG": "About | AGG LLC",
    "社長挨拶｜合同会社AGG": "President's Message | AGG LLC",
    "事業内容｜合同会社AGG": "Business | AGG LLC",
    "お問い合わせ｜合同会社AGG": "Contact | AGG LLC",
    "プライバシーポリシー｜合同会社AGG": "Privacy Policy | AGG LLC",
    "AGG LLC": "AGG LLC",
    "About AGG": "About AGG",
    "Our Approach": "Our Approach",
    "President": "President",
    "President's Message": "President's Message",
    "Career": "Career",
    "Business": "Business",
    "Contact": "Contact",
    "Privacy Policy": "Privacy Policy",
    "Main Business": "Main Business",
    "Featured Business": "Featured Business",
    "Event Management": "Event Management",
    "Our Stores": "Our Stores",
    "SAITAMA": "SAITAMA",
    "TOKYO": "TOKYO",
    "Other Businesses": "Other Businesses",
    "Company Information": "Company Information",
    "合同会社AGG（AGG LLC）": "AGG LLC",
    "03-6657-0388": "03-6657-0388",
    "5010603011561": "5010603011561",
    "ネパールにルーツを持つメンバーが日本で運営する合同会社AGG。 飲食店の経営を中心に、異なる文化や人が出会う場をつくっています。": "AGG LLC is a Japan-based company founded by people with roots in Nepal. Through our restaurants and other ventures, we create places where people and cultures meet.",
    "事業内容を見る": "Explore our business",
    "ネパールにルーツを持つメンバーの経験と、日本で培ってきたサービスを活かし、 食事を通じた交流の場を運営しています。現在の運営店舗は埼玉と東京の2店舗です。": "Drawing on the experience of our Nepalese-rooted team and the service standards we have developed in Japan, we operate welcoming places where people can connect over a meal. We currently have two locations in Saitama and Tokyo.",
    "パスニ（Pasni／生後6か月のお祝い）": "Pasni celebrations",
    "誕生日会（バースデーパーティー）": "Birthday parties",
    "事業に関するお問い合わせ": "Business inquiries",
    "各事業についてのご質問は、お問い合わせフォームよりご連絡ください。": "Please contact us with any questions about our services.",
    "TOP": "Home",
    "会社概要": "Company profile",
    "社長挨拶": "President's message",
    "事業内容": "Business",
    "お問い合わせ": "Contact",
    "プライバシーポリシー": "Privacy Policy",
    "合同会社AGG": "AGG LLC",
    "会社名": "Company",
    "設立": "Established",
    "令和7年5月12日": "May 12, 2025",
    "代表社員": "Representative Member",
    "カドカ・ナラヤン": "Narayan Khadka",
    "代表番号": "Phone",
    "資本金": "Capital",
    "526万円": "JPY 5.26 million",
    "所在地": "Address",
    "法人番号": "Corporate Number",
    "取引銀行": "Banks",
    "Nepal × Japan / AGG LLC": "Nepal × Japan / AGG LLC",
    "合同会社AGGについて": "About AGG LLC",
    "メイン事業": "Main business",
    "埼玉と東京で2店舗を運営し、日常に寄り添う食の場を届けています。": "We operate two restaurants in Saitama and Tokyo, offering welcoming dining experiences for local communities.",
    "飲食店経営": "Restaurant operations",
    "合同会社AGGの中心事業は、ネパールの食文化にもつながる飲食店の経営です。 埼玉と東京の2店舗を通じて、地域の皆さまに料理と心地よい時間を提供しています。": "Our core business is operating restaurants inspired by Nepalese food culture. At our two locations in Saitama and Tokyo, we serve delicious meals and warm hospitality to the communities around us.",
    "イベントマネジメント": "Event management",
    "結婚式やパーティーから、ネパールの伝統行事まで幅広く対応しています。": "From weddings and parties to traditional Nepalese celebrations, we help bring people together.",
    "結婚式からネパールの伝統行事まで": "Celebrations across cultures",
    "結婚式や誕生日会、ベビーシャワーのほか、ネパールの伝統行事「パスニ（生後6か月のお祝い）」など、多文化に対応したイベントの企画・運営を行っています。": "We plan and manage culturally inclusive events, including weddings, birthday parties, baby showers and Pasni, the traditional Nepalese celebration held when a baby is around six months old.",
    "結婚式（ウェディング）": "Weddings",
    "パスニ（生後6か月のお祝い）": "Pasni celebrations",
    "誕生日会": "Birthday parties",
    "ベビーシャワー": "Baby showers",
    "運営店舗": "Our locations",
    "現在、埼玉と東京で2店舗を運営しています。店舗の詳しい情報は各ページをご覧ください。": "We currently operate two restaurants in Saitama and Tokyo. Visit each listing for more information.",
    "埼玉の店舗": "Saitama restaurant",
    "地域に根ざした飲食店として、料理とサービスを提供しています。": "A neighborhood restaurant serving good food with thoughtful hospitality.",
    "食べログで店舗を見る": "View store listing",
    "東京の店舗": "Tokyo restaurant",
    "人が集まり、食を通じて交流できる場を運営しています。": "A welcoming place to gather, enjoy a meal and connect with others.",
    "その他の事業": "Beyond restaurants",
    "飲食店経営に加え、以下の事業も展開しています。": "Alongside our restaurant operations, we are developing services in several fields.",
    "営業コンサルティング": "Sales consulting",
    "営業活動に関するコンサルティング事業。": "Consulting services for sales activities.",
    "労働者派遣業": "Staffing services",
    "労働者派遣に関する事業。": "Worker dispatch and staffing-related services.",
    "不動産販売": "Real estate sales",
    "不動産販売に関する事業。": "Services related to real estate sales.",
    "ハラールフード": "Halal food",
    "ハラールフードの輸入・販売。": "Import and sale of halal food products.",
    "加盟店管理": "Franchise management",
    "加盟店管理・フランチャイズ関連事業。": "Franchise and member-store management.",
    "事業内容を詳しく見る": "More about our business",
    "会社情報": "Company information",
    "より詳しい会社概要は「会社概要」ページをご覧ください。": "See the About page for the full company profile.",
    "会社概要を見る": "Company profile",
    "事業に関するお問い合わせは、こちらのフォームよりご連絡ください。": "For business inquiries, please contact us using the form.",
    "お問い合わせフォームへ": "Contact us",
    "サイト内": "Explore",
    "その他": "Legal",
    "飲食店経営を中心に、複数の事業を展開しています。": "Building connections through food and hospitality.",
    "SNS": "Follow us",
    "© 2025 合同会社AGG": "© 2025 AGG LLC",
    "About": "About",
    "ネパールにルーツを持つメンバーが、日本で食と人のつながりを育てる会社です。": "Rooted in Nepal and based in Japan, we bring people together through food and shared experiences.",
    "食を通じて、文化と地域をつなぐ": "Connecting culture and community through food",
    "合同会社AGGは、ネパールにルーツを持つメンバーが日本で運営する会社です。異なる文化を持つ人同士が自然に出会える場を、飲食店を中心に形にしています。": "AGG LLC is a Japan-based company founded by people with roots in Nepal. Through our restaurants, we create welcoming places where people from different backgrounds can meet naturally.",
    "現在は埼玉と東京の2店舗を運営しています。地域のお客様に料理と心地よい時間を届けながら、食を起点とした新しい事業にも取り組んでいきます。": "We currently operate two restaurants in Saitama and Tokyo. Alongside serving local customers delicious food and warm hospitality, we continue to explore new opportunities that bring people together through food.",
    "会社概要・事業内容について": "Learn more about AGG",
    "合同会社AGGの詳しい情報は、会社概要・事業内容のページをご覧ください。": "Explore our company profile and business activities.",
    "社長挨拶｜合同会社AGG": "President's Message | AGG LLC",
    "代表社員 カドカ・ナラヤンより、日頃のご愛顧に感謝を込めてご挨拶申し上げます。": "Narayan Khadka, Representative Member of AGG LLC, shares his journey and vision.",
    "代表社員 カドカ・ナラヤンより": "Narayan Khadka",
    "合同会社AGGの代表を務めております、カドカ・ナラヤンと申します。日頃より大変お世話になっております。": "I am Narayan Khadka, Representative Member of AGG LLC. Thank you for your continued support.",
    "ネパールでは、飲食店や5つ星ホテルでの勤務を通じて、サービス業の基礎となる経験を積んでまいりました。": "In Nepal, I built a foundation in hospitality through work at restaurants and a five-star hotel.",
    "その後、日本への留学をきっかけに来日し、日本語学校・専門学校で4年間学び、卒業後は社会人として3年間、会社員の立場で実務経験を積んでまいりました。": "I later came to Japan to study. After four years at a Japanese language school and vocational college, I worked as a company employee for three years, gaining valuable practical experience.",
    "そして3年ほど前より、少しずつ自分自身の事業にも取り組みはじめ、現在もネパールでレストランの運営を続けながら、その積み重ねの先に合同会社AGGの設立があります。": "About three years ago, I began gradually building my own business while continuing restaurant operations in Nepal. Those experiences eventually led to the establishment of AGG LLC.",
    "これまでの歩み": "My journey",
    "ネパールで生まれ育つ": "Born and raised in Nepal",
    "ネパール国内の飲食店にて勤務し、飲食業の経験を積む": "Gained restaurant industry experience in Nepal",
    "5つ星ホテルでの勤務を経験": "Worked at a five-star hotel",
    "日本へ留学し、日本語学校・専門学校で4年間学ぶ": "Studied in Japan for four years at a language school and vocational college",
    "卒業後、社会人として3年間、会社員として勤務": "Worked as a company employee in Japan for three years after graduation",
    "3年ほど前より、自身の事業に少しずつ取り組みはじめる": "Began developing my own business around three years ago",
    "現在もネパールでレストランを運営": "Continue to operate a restaurant in Nepal",
    "合同会社AGGを設立し、代表社員に就任": "Founded AGG LLC and became its Representative Member",
    "ネパールと日本、双方の文化を知る立場だからこそ気づけることを大切にしながら、飲食店経営を中心とした事業を通じて、お客様や地域の皆さまに喜んでいただけるサービスをこれからも届けてまいります。今後ともご支援を賜りますよう、よろしくお願い申し上げます。": "Having experienced both Nepalese and Japanese cultures, I value the perspectives that come from understanding each. Through our restaurant operations and other ventures, we will continue working to provide services that bring joy to our customers and communities. I sincerely appreciate your continued support.",
    "事業内容｜合同会社AGG": "Business | AGG LLC",
    "合同会社AGGは、埼玉と東京で2店舗の飲食店を運営しています。": "AGG LLC operates restaurants in Saitama and Tokyo and develops services that bring people and cultures together.",
    "ネパールにルーツを持つメンバーの経験と、日本で培ってきたサービスを活かし、食事を通じた交流の場を運営しています。現在の運営店舗は埼玉と東京の2店舗です。": "Drawing on the experience of our Nepalese-rooted team and the service standards we have developed in Japan, we operate welcoming places where people can connect over a meal. We currently have two locations in Saitama and Tokyo.",
    "埼玉の店舗を食べログで見る": "View our Saitama restaurant listing",
    "東京の店舗を食べログで見る": "View our Tokyo restaurant listing",
    "サービス詳細は情報準備中です。": "More information is being prepared.",
    "許可番号等の詳細は情報準備中です。": "Permit and service details are being prepared.",
    "取扱物件等の詳細は情報準備中です。": "More information is being prepared.",
    "取扱商品等の詳細は情報準備中です。": "Product details are being prepared.",
    "加盟店募集等の詳細は情報準備中です。": "More information is being prepared.",
    "開催実績等の詳細は情報準備中です。": "Event portfolio details are being prepared.",
    "お問い合わせ｜合同会社AGG": "Contact | AGG LLC",
    "事業に関するご質問・ご相談は、以下のフォームよりお送りください。": "For questions or inquiries about our business, please use the form below.",
    "入力内容を確認しました。現在は送信先設定前のプレビューです。": "Your information has been checked. This form is currently a preview and is not connected to a delivery service.",
    "お問い合わせ種別": "Inquiry type",
    "必須": "Required",
    "選択してください": "Please select",
    "店舗について": "Restaurant",
    "事業について": "Business",
    "その他": "Other",
    "お問い合わせ種別を選択してください。": "Please select an inquiry type.",
    "お名前": "Name",
    "お名前を入力してください。": "Please enter your name.",
    "会社名": "Company",
    "メールアドレス": "Email address",
    "正しいメールアドレスを入力してください。": "Please enter a valid email address.",
    "お問い合わせ内容": "Message",
    "お問い合わせ内容を入力してください。": "Please enter your message.",
    "に同意する": "I agree to the",
    "プライバシーポリシーへの同意が必要です。": "You must agree to the Privacy Policy.",
    "送信する": "Submit",
    "現在はフォームの入力確認まで対応しています。送信先設定後に実送信へ切り替えます。": "This form currently validates your input only. Messages cannot yet be delivered; a submission service must be configured.",
    "プライバシーポリシー｜合同会社AGG": "Privacy Policy | AGG LLC",
    "合同会社AGG（以下「当社」といいます）は、お問い合わせフォームを通じて取得する個人情報を、以下のとおり適切に取り扱います。": "AGG LLC (the \"Company\") handles personal information received through its inquiry form as described below.",
    "1. 取得する情報": "1. Information We Collect",
    "お問い合わせの際に、お名前、会社名、メールアドレス、お問い合わせ内容などをご提供いただく場合があります。": "When you contact us, we may collect your name, company name, email address and the contents of your inquiry.",
    "2. 利用目的": "2. How We Use Information",
    "取得した情報は、お問い合わせへの回答、必要な連絡、当社のサービス改善のために利用します。ご本人の同意なく、利用目的を超えて利用することはありません。": "We use collected information to respond to inquiries, contact you when necessary and improve our services. We will not use your information beyond these purposes without your consent.",
    "3. 第三者提供": "3. Disclosure to Third Parties",
    "当社は、法令に基づく場合を除き、ご本人の同意なく個人情報を第三者へ提供しません。": "We will not disclose personal information to third parties without your consent, except where disclosure is required by law.",
    "4. 安全管理": "4. Information Security",
    "当社は、個人情報の漏えい、滅失、毀損などを防止するため、適切な安全管理に努めます。": "We take appropriate measures to protect personal information against unauthorized disclosure, loss or damage.",
    "5. 開示・訂正・削除": "5. Access, Correction and Deletion",
    "ご本人から個人情報の開示、訂正、削除などのご相談を受けた場合は、本人確認のうえ、法令に従って対応します。": "If you request access to, correction of or deletion of your personal information, we will verify your identity and respond in accordance with applicable laws.",
    "6. お問い合わせ窓口": "6. Contact",
    "個人情報の取扱いに関するお問い合わせは、当社のお問い合わせフォームよりご連絡ください。": "For questions about our handling of personal information, please contact us through our inquiry form.",
    "制定日：2026年9月6日": "Effective date: September 6, 2026"
  };

  var englishAltTranslations = {
    "合同会社AGG": "AGG LLC",
    "レストラン": "Restaurant interior",
    "料理と会話を楽しむレストランの店内": "Restaurant dining room",
    "イベントの様子": "Event celebration",
    "埼玉の店舗": "Our restaurant in Saitama",
    "東京の店舗": "Our restaurant in Tokyo",
    "合同会社AGG 代表社員 カドカ・ナラヤン": "Narayan Khadka, Representative Member of AGG LLC"
  };

  function normalizeText(text) {
    var normalized = text.replace(/\s+/g, " ").trim();
    return /[\u3040-\u30ff\u3400-\u9fff]/.test(normalized)
      ? normalized.replace(/\s+/g, "")
      : normalized;
  }

  var translationsByText = {};
  Object.keys(englishTranslations).forEach(function (japanese) {
    translationsByText[normalizeText(japanese)] = englishTranslations[japanese];
  });

  document.querySelectorAll("body *, title").forEach(function (element) {
    if (element.children.length !== 0) {
      return;
    }

    var japanese = element.textContent;
    var english = translationsByText[normalizeText(japanese)];
    if (english && !element.hasAttribute("data-en")) {
      element.setAttribute("data-ja", japanese);
      element.setAttribute("data-en", english);
    }
  });

  document.querySelectorAll("img[alt]").forEach(function (image) {
    var japaneseAlt = image.getAttribute("alt");
    var englishAlt = englishAltTranslations[japaneseAlt];
    if (englishAlt) {
      image.setAttribute("data-ja-alt", japaneseAlt);
      image.setAttribute("data-en-alt", englishAlt);
    }
  });

  function applyLanguage(language) {
    document.documentElement.lang = language;

    document.querySelectorAll("[data-ja][data-en]").forEach(function (element) {
      element.textContent = element.getAttribute("data-" + language);
    });

    document.querySelectorAll("[data-ja-aria-label][data-en-aria-label]").forEach(function (element) {
      element.setAttribute("aria-label", element.getAttribute("data-" + language + "-aria-label"));
    });

    document.querySelectorAll("[data-ja-alt][data-en-alt]").forEach(function (element) {
      element.setAttribute("alt", element.getAttribute("data-" + language + "-alt"));
    });

    document.querySelectorAll("[data-language]").forEach(function (button) {
      var selected = button.getAttribute("data-language") === language;
      button.setAttribute("aria-pressed", selected ? "true" : "false");
      button.classList.toggle("is-active", selected);
    });

    try {
      localStorage.setItem("agg-language", language);
    } catch (error) {
      // Language switching still works when storage is unavailable.
    }
  }

  var savedLanguage = "ja";
  try {
    savedLanguage = localStorage.getItem("agg-language") === "en" ? "en" : "ja";
  } catch (error) {
    savedLanguage = "ja";
  }

  document.querySelectorAll("[data-language]").forEach(function (button) {
    button.addEventListener("click", function () {
      applyLanguage(button.getAttribute("data-language"));
    });
  });

  applyLanguage(savedLanguage);
});
