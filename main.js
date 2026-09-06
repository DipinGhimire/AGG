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
