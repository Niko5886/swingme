# SwingMe - Adult Dating Platform

## 🌐 Live Demo

### **[🚀 Отвори приложението ТУКА](https://swingme.netlify.app/)**

---

## 📱 Описание

SwingMe е съвременна платформа за възрастни хора за намиране на партньори. Предоставя grid преглед на профили, система за харесване, съобщения в реално време, управление на контакти и известия. Напълно responsive дизайн (2-5 колони според устройството).

## ✨ Функции

- 🎯 **Grid преглед на профили** - Компактна мрежа с 2-5 колони (responsive)
- ❤️ **Система за харесване** - Маркиране на избрани профили
- 💬 **Съобщения** - Real-time чат с уведомления
- 👥 **Контакти** - Управление на записани контакти
- 🔔 **Известия** - Push нотификации
- 📄 **Модални прозорци** - Terms, Privacy, Support, Termination
- 📱 **100% Responsive** - Оптимизирано за мобилни, таблети и десктопи

## 🛠️ Технологии

- **Next.js 16.0.3** (App Router, Turbopack)
- **React 18+** с TypeScript
- **Tailwind CSS** за стилизация
- **Lucide React** за иконки
- Bulgarian (BG) език

## 🚀 Getting Started

## 📂 Структура

```
src/
├── app/
│   ├── page.tsx              # HOME (landing page)
│   ├── dashboard/page.tsx    # DASHBOARD (main hub)
│   ├── profile/page.tsx      # Profile management
│   └── search/page.tsx       # Search page
├── components/
│   ├── modals/               # Terms, Privacy, Support, Termination
│   └── toasts/               # Forum, Events, Clubs notifications
```

## 📐 Responsive Grid

- **Mobile** (< 640px): 2 колони, скрит sidebar
- **Tablet** (640-1024px): 3-4 колони
- **Desktop** (> 1024px): 4-5 колони, пълен sidebar

## 🌐 Deployment

Deploy-нато на **[Netlify](https://swingme.netlify.app)** с автоматичен CI/CD от GitHub.

Всеки `git push` към `main` автоматично обновява приложението на Netlify.

---

**© 2025 SwingMe | Powered by N.Stoyanov**
