import React, { useState } from 'react';
import { Check, ChevronRight, AlertCircle, Loader2, Copy, Send } from 'lucide-react';

/**
 * ------------------------------------------------------------------
 * 🎨 品牌色調設定 (Brand Theme)
 * ------------------------------------------------------------------
 */
const theme = {
  slate: '#4a6161',
  mist: '#8a9a9a',
  sandstone: '#a69d93',
  oatmeal: '#f2f2ef',
  paper: '#fafaf9',
  pebble: '#e0e0dc',
  obsidian: '#3d4242',
  smoke: '#8c9191',
  sage: '#8e9e94',
  blush: '#b59393'
};

const GAS_URL = "https://script.google.com/macros/s/AKfycbx-ORdnAQsZuu4R0QOKXkTfEG5whe-FB2mPNqpYU-qFqBCONmquRWB5eumcMfGrXayR_A/exec";

/**
 * 🧩 客製化 UI 元件 (M3 Styles)
 */

const CustomInput = ({ label, value, onChange, placeholder, type = "text", required = false, multiline = false }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="mb-6 group">
      <label className={`block text-sm font-bold mb-2 transition-colors ${focused ? 'text-slate' : 'text-obsidian'}`}>
        {label} {required && <span className="text-blush">*</span>}
      </label>
      <div className={`relative rounded-xl transition-all border-2 ${focused ? 'border-slate bg-white ring-4 ring-slate/5' : 'border-transparent bg-pebble/30'}`}>
        {multiline ? (
          <textarea className="w-full p-4 bg-transparent outline-none text-obsidian min-h-[100px] block" value={value} onChange={(e) => onChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder={placeholder} />
        ) : (
          <input type={type} className="w-full p-4 bg-transparent outline-none text-obsidian block" value={value} onChange={(e) => onChange(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder={placeholder} />
        )}
      </div>
    </div>
  );
};

const CustomRadio = ({ label, options, value, onChange }) => (
  <div className="mb-8">
    <label className="block text-base font-bold text-obsidian mb-3">{label}</label>
    <div className="flex flex-col gap-3">
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <div key={opt.value} onClick={() => onChange(opt.value)} className={`flex items-center p-4 rounded-xl cursor-pointer transition-all border-2 ${isSelected ? 'bg-slate/5 border-slate' : 'bg-paper border-pebble'}`}>
            <div className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${isSelected ? 'bg-slate border-slate' : 'bg-white border-mist'}`}>
              <div className={`w-2.5 h-2.5 rounded-full bg-white transition-transform ${isSelected ? 'scale-100' : 'scale-0'}`} />
            </div>
            <span className={`text-sm ${isSelected ? 'text-slate font-bold' : 'text-obsidian'}`}>{opt.label}</span>
          </div>
        );
      })}
    </div>
  </div>
);

const CustomCheckbox = ({ label, checked, onChange, subLabel }) => (
  <div onClick={() => onChange(!checked)} className="flex items-start p-3 rounded-xl cursor-pointer transition-all hover:bg-pebble/30">
    <div className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${checked ? 'bg-obsidian border-obsidian' : 'bg-white border-mist'}`}>
      <Check size={16} strokeWidth={3} className={`text-white transition-transform ${checked ? 'scale-100' : 'scale-0'}`} />
    </div>
    <div className="ml-3">
      <span className={`block text-sm font-medium ${checked ? 'text-obsidian' : 'text-obsidian/80'}`}>{label}</span>
      {subLabel && <span className="text-xs text-smoke block">{subLabel}</span>}
    </div>
  </div>
);

// 4. 自定義警示對話框 (Custom Alert Dialog)
const AlertDialog = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-obsidian/40 backdrop-blur-[2px]">
      <div className="relative w-full max-w-xs bg-paper rounded-[2rem] shadow-2xl p-6 text-center animate-in fade-in zoom-in-95 duration-200 border border-white">
        <div className="w-12 h-12 bg-blush/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={24} className="text-blush" />
        </div>
        <h3 className="text-lg font-bold text-obsidian mb-2">提示</h3>
        <p className="text-smoke text-sm mb-6 leading-relaxed">{message}</p>
        <button onClick={onClose} className="w-full py-3 rounded-full bg-obsidian text-white font-bold text-sm shadow-lg active:scale-95 transition-transform">
          我知道了
        </button>
      </div>
    </div>
  );
};

const ConfirmDialog = ({ isOpen, onClose, onConfirm, data, isSubmitting }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-paper rounded-[2rem] shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle size={24} className="text-slate" />
          <h3 className="text-xl font-bold text-obsidian">確認送出資料？</h3>
        </div>
        <p className="text-smoke text-sm mb-6 leading-relaxed">請確認資訊無誤 送出後將顯示結果頁面供您截圖傳送至 LINE 客服</p>
        <div className="bg-oatmeal/50 rounded-2xl p-4 mb-8 space-y-3 text-sm">
          <div className="flex flex-col border-b border-pebble pb-2">
            <span className="text-mist text-[10px] font-bold uppercase tracking-wider">網站名稱</span>
            <span className="font-medium">{data.orgName}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-mist text-[10px] font-bold uppercase tracking-wider">聯繫方式</span>
            <span className="font-medium">{data.contact}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} disabled={isSubmitting} className="flex-1 py-3 rounded-full text-mist font-bold hover:bg-pebble/30 disabled:opacity-50">返回修改</button>
          <button onClick={onConfirm} disabled={isSubmitting} className="flex-2 py-3 rounded-full bg-slate text-white font-bold flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-slate/20">
            {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            {isSubmitting ? '處理中' : '確認送出'}
          </button>
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ number, title }) => (
  <div className="flex items-center gap-3 mb-6 mt-10 first:mt-0">
    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-sandstone text-white text-[10px] font-bold">{number}</span>
    <h2 className="text-lg font-bold text-obsidian">{title}</h2>
  </div>
);

export default function App() {
  const [view, setView] = useState('form');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 自定義警示視窗狀態
  const [alertConfig, setAlertConfig] = useState({ isOpen: false, message: '' });
  const showAlert = (message) => setAlertConfig({ isOpen: true, message });
  const closeAlert = () => setAlertConfig({ isOpen: false, message: '' });

  const [formData, setFormData] = useState({
    orgName: '', contact: '', purpose: '', targetAudience: '',
    pages: [], otherPage: '', dataNeeds: '', stylePref: '',
    assets: [], dataOwnership: false, budget: ''
  });

  const handleCheckboxGroup = (field, value) => {
    setFormData(prev => {
      const list = prev[field];
      return { ...prev, [field]: list.includes(value) ? list.filter(i => i !== value) : [...list, value] };
    });
  };

  const handleFinalSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (GAS_URL) {
        await fetch(GAS_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify({ ...formData, timestamp: new Date().toISOString() }) });
      }
      setIsDialogOpen(false);
      setView('preview');
      window.scrollTo(0, 0);
    } catch (e) {
      showAlert("連線發生異常，請確認網路環境後重試");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (view === 'preview') {
    return (
      <div className="min-h-screen bg-oatmeal p-4 md:p-10">
        <div className="max-w-2xl mx-auto bg-paper rounded-[2.5rem] shadow-2xl p-8 md:p-12 border-4 border-white">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check size={32} className="text-sage" />
            </div>
            <h2 className="text-2xl font-black text-obsidian">預覽填寫結果</h2>
            <p className="text-mist font-bold mt-2 text-sm tracking-wide">請截圖本頁面並傳送至 LINE 客服</p>
          </div>

          <div className="space-y-6 bg-oatmeal/50 rounded-[2rem] p-6 md:p-10 mb-8 border border-pebble">
            {[
              { l: "名稱", v: formData.orgName },
              { l: "聯繫", v: formData.contact },
              { l: "功能", v: formData.pages.join('、') + (formData.otherPage ? `、${formData.otherPage}` : '') },
              { l: "預算", v: formData.budget },
              { l: "風格", v: formData.stylePref }
            ].map((it, i) => (
              <div key={i} className="flex flex-col border-b border-pebble pb-3 last:border-0">
                <span className="text-[10px] font-black text-mist uppercase tracking-widest">{it.l}</span>
                <span className="text-base text-obsidian font-bold mt-1">{it.v || '-'}</span>
              </div>
            ))}
          </div>

          <div className="border-2 border-pebble/50 rounded-[1.5rem] p-6 mb-8 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-mist uppercase tracking-widest mb-1">LINE 客服 ID</span>
              <span className="text-2xl font-black tracking-tight text-obsidian select-all">@366qwylw</span>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                const text = "@366qwylw";

                // 優先使用新 API
                if (navigator.clipboard && window.isSecureContext) {
                  navigator.clipboard.writeText(text)
                    .then(() => showAlert("已複製 LINE ID"))
                    .catch(() => fallbackCopy(text));
                } else {
                  fallbackCopy(text);
                }

                function fallbackCopy(val) {
                  try {
                    const textArea = document.createElement("textarea");
                    textArea.value = val;
                    textArea.style.position = "fixed";
                    textArea.style.left = "-9999px";
                    textArea.style.top = "-9999px";
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();
                    const successful = document.execCommand('copy');
                    document.body.removeChild(textArea);
                    if (successful) {
                      showAlert("已複製 LINE ID");
                    } else {
                      window.alert("複製失敗，請手動輸入：" + val);
                    }
                  } catch (err) {
                    window.alert("複製失敗，請手動輸入：" + val);
                  }
                }
              }}
              className="relative z-[20] w-12 h-12 rounded-full border-2 border-pebble flex items-center justify-center text-mist hover:bg-pebble/30 active:scale-95 transition-all cursor-pointer pointer-events-auto"
              style={{ touchAction: 'manipulation' }}
            >
              <Copy size={20} />
            </button>
          </div>

          <button onClick={() => setView('success')} className="w-full py-5 rounded-full bg-obsidian text-white font-black shadow-xl hover:brightness-125 transition-all">
            我已完成截圖
          </button>
        </div>
      </div>
    );
  }

  if (view === 'success') {
    return (
      <div className="min-h-screen bg-oatmeal flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-paper rounded-[2.5rem] shadow-2xl p-10 text-center border-4 border-white animate-in fade-in slide-in-from-bottom-5">
          <div className="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-sage" />
          </div>
          <h2 className="text-2xl font-black text-obsidian mb-4">感謝您的填寫</h2>
          <p className="text-smoke leading-relaxed mb-10">專員將在 LINE 與您展開後續討論<br />我們將全力為您打造理想的網站</p>
          <button onClick={() => window.location.reload()} className="w-full py-4 rounded-full bg-slate text-white font-bold">返回</button>
        </div>
      </div>
    );
  }

  // 送出邏輯
  const handleSubmitClick = () => {
    // 簡易驗證
    if (!formData.orgName) {
      showAlert("請填寫「網站名稱」，這將作為聯繫時的依據。");
      return;
    }
    if (!formData.contact) {
      showAlert("請填寫「聯絡管道」，方便專員與您對話");
      return;
    }
    if (!formData.dataOwnership) {
      showAlert("請閱讀並同意「資料與帳號歸屬政策」");
      return;
    }
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-oatmeal py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-3xl font-black text-slate tracking-tight mb-2">網站建置需求單</h1>
          <p className="text-[10px] font-black text-mist uppercase tracking-[0.3em]">Project Requirement Specification</p>
        </header>

        <main className="bg-paper rounded-[2.5rem] shadow-2xl p-6 md:p-12 border border-white/50">
          <SectionTitle number="01" title="基本資訊" />
          <CustomInput label="網站名稱" placeholder="尚未定名可填暫稱" value={formData.orgName} onChange={(v) => setFormData({ ...formData, orgName: v })} required />
          <CustomInput label="聯絡管道" placeholder="LINE / 蝦皮" value={formData.contact} onChange={(v) => setFormData({ ...formData, contact: v })} required />
          <CustomInput label="核心目的" placeholder="例如：品牌展示、作品集、線上預約" value={formData.purpose} onChange={(v) => setFormData({ ...formData, purpose: v })} />

          <div className="h-px bg-pebble my-10" />

          <SectionTitle number="02" title="功能需求" />
          <div className="mb-3">
            <label className="block text-sm font-bold text-obsidian">預計頁面 (多選)</label>
            <p className="text-xs text-mist mt-1 font-medium">若不同內容都放在同一頁，可僅勾選「首頁」</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
            {['首頁設計', '品牌介紹', '服務/產品清單', '部落格系統', '聯絡表單專頁'].map(p => (
              <CustomCheckbox key={p} label={p} checked={formData.pages.includes(p)} onChange={() => handleCheckboxGroup('pages', p)} />
            ))}
          </div>
          <CustomInput label="其他頁面需求" placeholder="請列出其他特殊頁面" value={formData.otherPage} onChange={(v) => setFormData({ ...formData, otherPage: v })} />

          <CustomRadio
            label="您是否需要「資料傳輸」或「資料儲存」功能？"
            options={[
              { label: '不需要，單純展示資訊', value: 'static' },
              { label: '需要，例如：會員登入、留言板、後台用管理、填寫表單後將資料存入資料庫', value: 'dynamic' }
            ]}
            value={formData.dataNeeds}
            onChange={(v) => setFormData({ ...formData, dataNeeds: v })}
          />

          <CustomRadio
            label="您預計多久更新一次內容？"
            options={[
              { label: '幾乎不更新', value: 'rare' },
              { label: '定期更新', value: 'regular' },
              { label: '高頻率自動更新', value: 'frequent' }
            ]}
            value={formData.updateFreq}
            onChange={(v) => setFormData({ ...formData, updateFreq: v })}
          />

          <div className="h-px bg-pebble my-10" />

          <SectionTitle number="03" title="視覺風格" />
          <CustomInput label="風格關鍵字" placeholder="例如：極簡德系、溫潤木質、未來感" value={formData.stylePref} onChange={(v) => setFormData({ ...formData, stylePref: v })} />

          <CustomInput
            label="是否有參考網站？"
            placeholder="如有，請貼上 1-2 個您覺得「這就是我要的感覺」的網站連結"
            multiline
            value={formData.refSites}
            onChange={(v) => setFormData({ ...formData, refSites: v })}
          />

          <label className="block text-sm font-bold text-obsidian mb-3">素材備妥狀態</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
            {['已有 Logo', '已有文案', '已有影像資料', '需協助設計'].map(a => (
              <CustomCheckbox key={a} label={a} checked={formData.assets.includes(a)} onChange={() => handleCheckboxGroup('assets', a)} />
            ))}
          </div>

          <div className="h-px bg-pebble my-10" />

          <SectionTitle number="04" title="預算投入" />
          <CustomRadio label="預算範圍" options={[
            { l: 'NT$ 1500 (僅首頁)', v: '1500' },
            { l: 'NT$ 5,000 以下 (入門)', v: 'under_5000' },
            { l: 'NT$ 5,000 - 15,000 (基本)', v: '5000_15000' },
            { l: 'NT$ 15,000 以上 (客製)', v: 'above_15000' }
          ].map(o => ({ label: o.l, value: o.v }))} value={formData.budget} onChange={(v) => setFormData({ ...formData, budget: v })} />

          <div className="p-6 rounded-[1.5rem] bg-oatmeal/60 border border-pebble mt-10">
            <p className="text-xs text-smoke leading-relaxed mb-4">為了保障您的資料所有權與後續維護的便利性，我會將所有的程式碼、資料庫及部屬設定使用 Google 帳號註冊儲存庫。您可以新申請一個專用的 Gmail ，結案後您可以自行更改密碼，這能確保網頁的所有權永遠屬於您</p>
            <CustomCheckbox label="我已了解並同意" checked={formData.dataOwnership} onChange={(c) => setFormData({ ...formData, dataOwnership: c })} />
          </div>

          <div className="mt-12 flex justify-end">
            <button onClick={handleSubmitClick} className="px-10 py-5 rounded-full bg-slate text-white font-black text-lg flex items-center gap-2 hover:scale-105 transition-transform shadow-xl shadow-slate/20">
              預覽結果並送出 <ChevronRight size={24} />
            </button>
          </div>
        </main>

        <footer className="text-center mt-10 text-mist text-[10px] font-black uppercase tracking-[0.4em] pb-10">
          Crafted with Precision &copy; {new Date().getFullYear()}
        </footer>
      </div>

      <ConfirmDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} onConfirm={handleFinalSubmit} data={formData} isSubmitting={isSubmitting} />

      {/* 全域警示對話框 */}
      <AlertDialog
        isOpen={alertConfig.isOpen}
        message={alertConfig.message}
        onClose={closeAlert}
      />
    </div>
  );
}