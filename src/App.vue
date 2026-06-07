<script setup>
import { ref, computed } from 'vue'

// 1. 導覽列狀態
const isMenuOpen = ref(false)
const navItems = [
  { name: '⚠️ 心理建設', id: 'psychology' },
  { name: '🏡 居家安全', id: 'safety' },
  { name: '🥣 飲食指南', id: 'diet' },
  { name: '🎒 起居用品', id: 'supplies' },
  { name: '🏥 基礎醫療', id: 'medical' }
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) {
    const offset = 80 // 配合新高度調整偏移量
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = el.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
  isMenuOpen.value = false
}

// 2. 心理建設互動小工具
const checkpoints = ref([
  { text: '承諾：照顧牠的一生，不因結婚、搬家而棄養。', checked: false },
  { text: '經濟：每月需準備 $3000 至 $5000 飼料與貓砂開銷。', checked: false },
  { text: '金錢：準備專屬緊急醫療預備金或購買寵物保險。', checked: false },
  { text: '家人共識：確保同住家人皆同意並無人對貓毛過敏。', checked: false }
])

const isQualified = computed(() => {
  return checkpoints.value.every(item => item.checked)
})

// 3. 飲食指南 3D 翻轉卡片
const dietCards = ref([
  {
    front: '長期吃乾糧會得腎臟病？長期吃罐頭會有牙結石？',
    back: '不完全正確！腎病與總飲水量有關，牙結石跟有沒有刷牙有關。',
    flipped: false
  },
  {
    front: '那我到底該怎麼餵才對？',
    back: '根據貓咪偏好選擇，乾濕交替搭配最好，強迫餵食造成貓咪壓力反而更容易傷到害貓咪的身體喔。',
    flipped: false
  }
])

// 4. 起居用品 v-for 數據
const coreStandards = [
  { icon: '🥩', title: '【吃】', desc: '準備符合年齡的高品質主食乾糧或主食罐。' },
  { icon: '💧', title: '【喝】', desc: '食水分離原則（水盆要離食物遠一點，貓更愛喝水）。' },
  { icon: '📦', title: '【拉】', desc: '寬敞貓砂盆（長度必須是貓身的 1.5 倍大）。' },
  { icon: '⏳', title: '【撒】', desc: '沿用貓咪原本適應的貓砂（礦砂、豆腐砂等），避免亂尿尿。' },
  { icon: '💤', title: '【睡】', desc: '在隱密或高處準備貓窩或紙箱，給予安全感。' }
]

// 5. 範例圖展示邏輯
const displayedExamples = ref([])

const addExample = (imgName) => {
  // 使用 BASE_URL 自動適應 GitHub Pages 的路徑 (/20260607/)
  const fullPath = `${import.meta.env.BASE_URL}${imgName}`
  displayedExamples.value.push(fullPath)
}

// 6. 攝水量計算器邏輯
const showCalculator = ref(false)
const catWeight = ref(null)
const calculatedIntake = computed(() => {
  if (!catWeight.value || catWeight.value <= 0) return 0
  // 公式：體重 (kg) x 50
  return Math.round(catWeight.value * 50)
})
</script>

<template>
  <div class="cat-guide-site">
    <!-- 1. 頂部導覽列 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="logo" @click="scrollTo('top')">🐱 喵星人新手村</div>
        
        <!-- 漢堡選單按鈕 (手機版) -->
        <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen">
          <span :class="{ 'open': isMenuOpen }"></span>
        </button>

        <ul class="nav-links" :class="{ 'active': isMenuOpen }">
          <li v-for="item in navItems" :key="item.id" @click="scrollTo(item.id)">
            {{ item.name }}
          </li>
        </ul>
      </div>
    </nav>

    <header id="top" class="hero">
      <h1>新手養貓完全指南</h1>
      <p>陪你一起從零開始，給貓咪一個溫暖的家</p>
    </header>

    <main class="content">
      <!-- 2. 區塊一：心理建設 -->
      <section id="psychology" class="section">
        <div class="section-header">
          <span class="icon">⚠️</span>
          <h2>主題一：接貓前的心理建設</h2>
        </div>
        <div class="text-content">
          <p>養貓是15-20 年的生命承諾。新手需要面對經濟、時間、以及包容貓咪天性（掉毛、半夜奔跑等等）的考驗。</p>
          <p>開始養貓之前，大家時常認為養貓很容易，但面對一個生命真的不是一件很簡單的事，尤其是貓咪這種方方面面都有點難搞的動物。如果你在準備養貓之前很焦慮，或是在養貓時遇到挫折，其實也可以考慮預約諮詢，讓貓談社陪你走出新手村！</p>
        </div>

        <div class="widget-box checklist-widget">
          <h3>📋 新手資格檢測問答</h3>
          <p class="subtitle">請勾選以下承諾，評估自己是否準備好了：</p>
          <div class="checklist">
            <label v-for="(item, index) in checkpoints" :key="index" class="check-item">
              <input type="checkbox" v-model="item.checked">
              <span class="checkmark"></span>
              <span class="check-text">{{ item.text }}</span>
            </label>
          </div>
          <Transition name="fade">
            <div v-if="isQualified" class="success-message">
              🎉 恭喜妳！解鎖養貓基本資格！
            </div>
          </Transition>
        </div>
      </section>

      <!-- 3. 區塊二：居家環境 -->
      <section id="safety" class="section bg-light">
        <div class="section-header">
          <span class="icon">🏡</span>
          <h2>主題二：居家環境與安全準備</h2>
        </div>
        <div class="text-content">
          <p>建立「立體空間」概念，防護安全第一。</p>
        </div>
        <div class="card-grid">
          <div class="info-card">
            <h4>窗戶陽台防護網</h4>
            <p>紗窗擋不住貓，必須加裝防護網防墜樓。</p>
            <button @click="addExample('3.jpg')" class="example-btn">點我看範例圖</button>
          </div>
          <div class="info-card">
            <h4>豐富的垂直空間</h4>
            <p>準備貓跳台、頂天立地柱減緩貓咪壓力。</p>
            <button @click="addExample('2.jpg')" class="example-btn">點我看範例圖</button>
          </div>
          <div class="info-card">
            <h4>遠離有害危險物品</h4>
            <p>嚴禁擺放百合花、金針花（對貓劇毒），收好橡皮筋與線條。</p>
            <button @click="addExample('1.jpg')" class="example-btn">點我看範例圖</button>
          </div>
        </div>

        <!-- 動態圖片展示區 -->
        <TransitionGroup name="list" tag="div" class="example-gallery">
          <div v-for="(img, index) in displayedExamples" :key="index" class="gallery-item">
            <img :src="img" alt="範例圖片" class="gallery-img" />
          </div>
        </TransitionGroup>
        <div v-if="displayedExamples.length > 0" class="gallery-footer">
          <button @click="displayedExamples = []" class="clear-btn">清除所有圖片</button>
        </div>
      </section>

      <!-- 4. 區塊三：飲食指南 -->
      <section id="diet" class="section">
        <div class="section-header">
          <span class="icon">🥣</span>
          <h2>主題三：貓咪飲食指南</h2>
        </div>
        <div class="text-content">
          <p>破解常見的新手飲食迷思。討論「全乾食 vs 全濕食」的網路論戰，並給出科學的現代觀點。</p>
        </div>
        
        <div class="flip-cards-container">
          <div 
            v-for="(card, index) in dietCards" 
            :key="index" 
            class="flip-card" 
            @click="card.flipped = !card.flipped"
          >
            <div class="flip-card-inner" :class="{ 'is-flipped': card.flipped }">
              <div class="flip-card-front">
                <p>{{ card.front }}</p>
                <span class="click-hint">點擊點擊破解迷思</span>
              </div>
              <div class="flip-card-back">
                <p>{{ card.back }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. 區塊四：起居用品 -->
      <section id="supplies" class="section bg-light">
        <div class="section-header">
          <span class="icon">🎒</span>
          <h2>主題四：必備生活起居用品</h2>
        </div>
        <div class="text-content">
          <p>精簡用品清單，讓新手在寵物用品店能快速採購不踩雷。</p>
          <div class="bullet-list">
            <ul>
              <li><strong>飲食：</strong>準備陶瓷或不鏽鋼材質的水碗與食碗。</li>
              <li><strong>如廁：</strong>準備貓砂盆與貓砂（一隻貓建議準備1到 2 個貓砂盆）。</li>
              <li><strong>活動空間：</strong>設置貓抓板與貓跳台滿足垂直活動需求。</li>
              <li><strong>外出必備：</strong>購買硬殼或堅固的貓咪專用外出籠。</li>
            </ul>
          </div>
        </div>

        <div class="standards-box">
          <h3>👑 五大基本核心標準</h3>
          <div class="standards-list">
            <div v-for="(std, index) in coreStandards" :key="index" class="standard-item">
              <div class="std-icon">{{ std.icon }}</div>
              <div class="std-info">
                <strong>{{ std.title }}</strong>
                <p>{{ std.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. 區塊五：醫療照顧 -->
      <section id="medical" class="section">
        <div class="section-header">
          <span class="icon">🏥</span>
          <h2>主題五：醫療與日常照顧基礎</h2>
        </div>
        <div class="text-content">
          <p>建立預防勝於治療的醫學觀念。</p>
          <div class="medical-grid">
            <div class="medical-item">
              <h4>💉 預防針與驅蟲</h4>
              <p>定期施打基礎疫苗及進行體內外驅蟲。</p>
              <a href="https://emilyntu.com/post/595/" target="_blank" class="medical-link-btn">疫苗的重要性</a>
            </div>
            <div class="medical-item">
              <h4>✂️ 結紮的重要性</h4>
              <p>滿六個月大時建議進行絕育手術。</p>
              <a href="https://www.chichianimal.com.tw/knowledge01.html" class="medical-link-btn">了解結紮資訊</a>
            </div>
            <div class="medical-item">
              <h4>💧 水分攝取</h4>
              <p>多提供濕食或流動飲水，避免貓咪泌尿道疾病。</p>
              <button @click="showCalculator = !showCalculator" class="medical-link-btn">
                {{ showCalculator ? '收起計算器' : '貓每日攝水量計算' }}
              </button>
              <Transition name="fade">
                <div v-if="showCalculator" class="water-calculator">
                  <p>請輸入貓咪體重：</p>
                  <div class="input-group">
                    <input v-model.number="catWeight" type="number" placeholder="kg" step="0.1" min="0">
                    <span class="unit">公斤 (kg)</span>
                  </div>
                  <div v-if="calculatedIntake > 0" class="calc-result">
                    建議每日攝水量：<span>{{ calculatedIntake }}</span> ml (c.c.)
                  </div>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>© 2026 喵星人新手村 - 讓我們一起愛貓</p>
    </footer>
  </div>
</template>

<style>
/* 基礎樣式 */
:root {
  --primary: #e67e22; /* 加深橘色提升對比 */
  --secondary: #ffbe76;
  --text: #1e272e;    /* 使用更深的深色提升閱讀力 */
  --bg-light: #f9f9f9;
  --white: #ffffff;
  --success: #27ae60; /* 更鮮明的綠色 */
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 背景點點設計 */
.cat-guide-site {
  position: relative;
  min-height: 100vh;
}

.cat-guide-site::before {
  content: "";
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  /* 貓腳印 SVG 背景圖案：使用淺橘色並設定極低透明度 */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%23ffbe76' opacity='0.15'%3E%3Ccircle cx='25' cy='42' r='8'/%3E%3Ccircle cx='42' cy='30' r='9'/%3E%3Ccircle cx='62' cy='30' r='9'/%3E%3Ccircle cx='79' cy='42' r='8'/%3E%3Cpath d='M52,50 C38,50 32,62 32,72 C32,82 40,88 52,88 C64,88 72,82 72,72 C72,62 66,50 52,50 Z'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 120px 120px; /* 調整腳印的大小與間距 */
  z-index: -1;
  pointer-events: none;
}

body {
  font-family: 'PingFang TC', 'Microsoft JhengHei', sans-serif;
  color: var(--text);
  line-height: 1.6;
  background-color: var(--white);
}

/* 1. 導覽列 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;   /* 確保從最左邊開始 */
  right: 0;  /* 確保延伸到最右邊 */
  width: 100vw; /* 確保填滿視窗寬度 */
  height: 80px; /* 稍微增加高度以容納更大的字體 */
  background: var(--white);
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
}

.nav-container {
  width: 100%; 
  max-width: none; /* 移除最大寬度限制 */
  margin: 0 auto;
  display: flex;
  justify-content: flex-start; /* 改為靠左起點對齊 */
  align-items: center;
  padding: 0 40px; /* 增加兩側間距，讓 Logo 離邊緣有一點點空間 */
  gap: 60px; /* 設定 Logo 與選單之間的距離，讓它們看起來不會太擠 */
  height: 100%;
}

.logo {
  font-size: 2rem; /* 再放大 Logo 字體 */
  font-weight: bold;
  color: var(--primary);
  cursor: pointer;
  white-space: nowrap; /* 避免文字換行 */
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 30px; /* 增加選單項目之間的距離 */
  align-items: center;
}

.nav-links li {
  cursor: pointer;
  font-size: 1.4rem; /* 放大選單文字字體，提升閱讀力 */
  font-weight: 500;
  transition: color 0.3s;
  white-space: nowrap;
}

.nav-links li:hover {
  color: var(--primary);
}

/* 漢堡選單 (手機版) */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  margin-left: auto; /* 在手機版將選單推向右邊 */
  cursor: pointer;
  padding: 10px;
}

.menu-toggle span, .menu-toggle span::before, .menu-toggle span::after {
  display: block;
  width: 25px;
  height: 3px;
  background: var(--text);
  transition: 0.3s;
  position: relative;
}

.menu-toggle span::before, .menu-toggle span::after {
  content: '';
  position: absolute;
}

.menu-toggle span::before { top: -8px; }
.menu-toggle span::after { bottom: -8px; }

.menu-toggle span.open { background: transparent; }
.menu-toggle span.open::before { transform: rotate(45deg); top: 0; }
.menu-toggle span.open::after { transform: rotate(-45deg); bottom: 0; }

/* Hero 區塊 */
.hero {
  margin-top: 80px; /* 配合導覽列高度調整 */
  /* 放在 public 的檔案在 CSS 中直接用 /filename 即可，Vite 打包時會自動處理 base 路徑 */
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/4.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  padding: 120px 20px; /* 增加上下內距讓圖片露出更多 */
  text-align: center;
  min-height: 450px; /* 設定最小高度，確保圖片有足夠的展示空間 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero h1 { font-size: 2.5rem; margin-bottom: 10px; }

/* 內容區塊 */
.section {
  width: 100%;
  padding: 80px 0; /* 垂直間距，水平間距交給內部容器 */
  text-align: left; /* 確保所有主題內容靠左對齊 */
}

.bg-light { background-color: var(--bg-light); }

/* 統一約束所有區塊的內部寬度，確保標題對齊一致 */
.section-header,
.text-content,
.widget-box,
.card-grid,
.flip-cards-container,
.standards-box,
.medical-grid {
  display: flex;
  flex-direction: column;
  width: 92%; /* 在小螢幕時佔據 92% 寬度 */
  max-width: 1300px; /* 在大螢幕時增加最大寬度，讓畫面更充實 */
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  flex-direction: row; /* 標題與圖示保持水平 */
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
}

.section-header .icon { font-size: 2rem; }
.section-header h2 { font-size: 1.8rem; color: var(--primary); border-bottom: 3px solid var(--secondary); padding-bottom: 5px; }

.text-content p { margin-bottom: 20px; font-size: 1.1rem; }

/* 2. 檢測問答小工具 */
.widget-box {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
  margin-top: 40px;
}

.checklist {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 25px 0;
}

.check-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1.05rem;
  position: relative;
  padding-left: 35px;
}

.check-item input { position: absolute; opacity: 0; cursor: pointer; height: 0; width: 0; }

.checkmark {
  position: absolute;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #f1f2f6;
  border-radius: 5px;
  border: 1px solid #ced4da;
}

.check-item:hover input ~ .checkmark { background-color: #ccc; }
.check-item input:checked ~ .checkmark { background-color: var(--success); }
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
  left: 9px; top: 5px;
  width: 5px; height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}
.check-item input:checked ~ .checkmark:after { display: block; }

.success-message {
  background: #dff9fb;
  color: var(--success);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 20px;
  border: 2px dashed var(--success);
}

/* 3. 卡片網格 (區塊二) */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.info-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  padding-bottom: 60px; /* 增加底部空間給按鈕 */
  border-radius: 12px;
  border-left: 5px solid var(--primary);
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  position: relative; /* 讓按鈕可以絕對定位在右下角 */
}

.example-btn {
  position: absolute;
  right: 20px;
  bottom: 20px;
  background-color: var(--secondary);
  color: white;
  padding: 6px 15px;
  border-radius: 20px;
  text-decoration: none;
  border: none;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.example-btn:hover {
  background-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

/* 範例圖展示區樣式 */
.example-gallery {
  width: 92%;
  max-width: 1300px;
  margin: 40px auto 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
}

.gallery-item {
  width: 100%;
  max-width: 800px;
  background: white;
  padding: 15px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.gallery-img {
  width: 100%;
  border-radius: 12px;
  display: block;
}

.gallery-footer {
  text-align: center;
  margin-top: 30px;
}

.clear-btn {
  background: none;
  border: 1px solid #ccc;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  color: #666;
}

/* 4. 3D 翻轉卡片 (區塊三) */
.flip-cards-container {
  display: flex;
  flex-direction: row; /* 強制改回水平排列，確保卡牌並列 */
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  margin-top: 40px;
}

.flip-card {
  background-color: transparent;
  width: 350px;
  height: 200px;
  perspective: 1000px;
  cursor: pointer;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card-inner.is-flipped { transform: rotateY(180deg); }

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 15px;
  font-weight: bold;
}

.flip-card-front { background-color: var(--secondary); color: white; }
.flip-card-back { background-color: var(--success); color: white; transform: rotateY(180deg); }
.click-hint { font-size: 0.8rem; margin-top: 10px; opacity: 0.8; }

/* 5. 起居用品 v-for */
.bullet-list ul { list-style: none; margin-left: 10px; }
.bullet-list li { margin-bottom: 10px; position: relative; padding-left: 20px; }
.bullet-list li::before { content: '•'; color: var(--primary); position: absolute; left: 0; font-weight: bold; }
.bullet-list li strong { color: var(--primary); }

.standards-box { margin-top: 40px; text-align: left; }
.standard-item {
  display: flex;
  gap: 25px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 15px;
  align-items: flex-start; /* 改為頂端對齊，讓多行文字更整齊 */
  text-align: left;
}
.std-icon { font-size: 2rem; }

/* 6. 醫療 */
.medical-grid { display: flex; flex-direction: column; gap: 20px; }
.medical-item { 
  padding: 20px; 
  background: rgba(255, 245, 230, 0.8); 
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.medical-link-btn {
  display: inline-block;
  margin-top: 12px;
  background-color: var(--primary);
  color: white;
  padding: 8px 18px;
  border-radius: 25px;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: bold;
  transition: all 0.3s ease;
}

.medical-link-btn:hover {
  background-color: #d35400; /* 更深的橘色 */
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.water-calculator {
  margin-top: 15px;
  padding: 15px;
  background: white;
  border-radius: 15px;
  border: 2px dashed var(--secondary);
  width: 100%;
}

.water-calculator p {
  font-size: 0.95rem;
  margin-bottom: 10px;
  font-weight: bold;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.water-calculator input {
  width: 100px;
  padding: 8px;
  border-radius: 10px;
  border: 1px solid #ddd;
  outline: none;
  font-size: 1rem;
}

.calc-result {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--primary);
}

.calc-result span {
  font-size: 1.5rem;
  text-decoration: underline;
}

.footer { text-align: center; padding: 40px; color: #999; font-size: 0.9rem; }

/* 響應式 */
@media (max-width: 768px) {
  .nav-container {
    justify-content: space-between; /* 手機版恢復兩端對齊，確保 Logo 左、漢堡右 */
    gap: 0;
    padding: 0 20px;
  }
  .menu-toggle { display: block; }
  .nav-links {
    position: absolute;
    top: 80px; /* 配合導覽列高度 */
    left: 0;
    width: 100%;
    background: white;
    flex-direction: column;
    padding: 20px;
    gap: 15px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    display: none;
  }
  .nav-links.active { display: flex; }
  .hero h1 { font-size: 1.8rem; }
  .flip-card { width: 100%; }
  
  /* 手機版字體微調，避免跑版 */
  .logo { font-size: 1.4rem; }
  .section-header h2 { font-size: 1.5rem; }
}

/* 針對大型螢幕的優化 */
@media (min-width: 1400px) {
  .nav-container { padding: 0 80px; }
}

/* 動畫 */
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* 列表動畫 */
.list-enter-active, .list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
