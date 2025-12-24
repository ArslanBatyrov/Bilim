export type Language = 'tk' | 'ru' | 'en'

export const translations = {
  tk: {
    nav: {
      home: 'Baş sahypa',
      subjects: 'Dersler',
      admin: 'Admin',
    },
    home: {
      welcome: 'Hoş geldiňiz',
      dayStreak: 'Günler seriýasy',
      dailyGoal: 'Günlük maksat',
      lessonsCompleted: 'Tamamlanan dersler',
      continueLearning: 'Öwrenmäni dowam etdiriň',
      noLessonsStarted: 'Dersler heniz başlanmady',
      browseSubjects: 'Dersleri görüň',
    },
    subjects: {
      title: 'Dersler',
      noSubjects: 'Dersler heniz elýeterli däl.',
    },
    topic: {
      back: '← Derslere gaýt',
      notFound: 'Ders tapylmady',
      noTopics: 'Temalar heniz elýeterli däl.',
    },
    lesson: {
      back: '← Yza',
      topic: 'Tema',
      notFound: 'Ders tapylmady',
      markComplete: 'Tamamlanan hökmünde belläň',
      quiz: 'Test',
      startQuiz: 'Teste başlaň',
    },
    quiz: {
      results: 'Test netijeleri',
      question: 'Sorag',
      yourAnswer: 'Siziň jogabyňyz',
      correctAnswer: 'Dogry jogap',
      notAnswered: 'Jogap berilmedi',
      enterAnswer: 'Jogabyňyzy giriziň',
      next: 'Indiki',
      submit: 'Testi tamamla',
      great: 'aýratyn',
      good: 'gowy',
      needsImprovement: 'gözegçilik talap edýär',
      result: 'netije aldynyňyz',
    },
    admin: {
      back: '← Baş sahypa gaýt',
      title: 'Admin',
      panel: 'Admin paneli',
      password: 'Parol',
      enterPassword: 'Admin parolyny giriziň',
      login: 'Gir',
      contentManagement: 'Mazmun dolandyryşy',
      seedContent: 'Demo mazmun goş',
      seeding: 'Goşulýar...',
      goHome: 'Baş sahypa geç',
      incorrectPassword: 'Nädogry parol',
      authError: 'Kimliklendirme ýalňyşlygy',
      success: 'Demo mazmun üstünlikli goşuldy!',
    },
    onboarding: {
      step1: {
        title: 'Bilim Core-a hoş geldiňiz',
        description: 'Offline režimi bilen öwreniş platformasy. Öwrenmäge başlaň!',
      },
      step2: {
        title: 'Dersler we synplar',
        description: 'Matematika, Fizika we Himiýa derslerini 7-nji synpdan 12-nji synpa çenli öwreniň.',
      },
      step3: {
        title: 'Offline režim',
        description: 'Internet bolmasa-da dersleri okap, testleri çözüp bilersiňiz. Maglumatlar awtomatik ýüklener.',
      },
      step4: {
        title: 'Öwreniş yzygiderliligi',
        description: 'Günlük maksatlaryňyzy ýerine ýetiriň, seriýalary saklaň we öwrenişiňizi yzarlaň.',
      },
      next: 'Indiki',
      skip: 'Geç',
      getStarted: 'Başla',
    },
  },
  ru: {
    nav: {
      home: 'Главная',
      subjects: 'Предметы',
      admin: 'Админ',
    },
    home: {
      welcome: 'Добро пожаловать',
      dayStreak: 'Серия дней',
      dailyGoal: 'Дневная цель',
      lessonsCompleted: 'Уроков завершено',
      continueLearning: 'Продолжить обучение',
      noLessonsStarted: 'Уроки еще не начаты',
      browseSubjects: 'Просмотреть предметы',
    },
    subjects: {
      title: 'Предметы',
      noSubjects: 'Предметы пока недоступны.',
    },
    topic: {
      back: '← Назад к предметам',
      notFound: 'Предмет не найден',
      noTopics: 'Темы пока недоступны.',
    },
    lesson: {
      back: '← Назад',
      topic: 'Тема',
      notFound: 'Урок не найден',
      markComplete: 'Отметить как завершенное',
      quiz: 'Тест',
      startQuiz: 'Начать тест',
    },
    quiz: {
      results: 'Результаты теста',
      question: 'Вопрос',
      yourAnswer: 'Ваш ответ',
      correctAnswer: 'Правильный ответ',
      notAnswered: 'Не отвечено',
      enterAnswer: 'Введите ваш ответ',
      next: 'Далее',
      submit: 'Завершить тест',
      great: 'отличный',
      good: 'хороший',
      needsImprovement: 'требует улучшения',
      result: 'результат',
    },
    admin: {
      back: '← Назад на главную',
      title: 'Админ',
      panel: 'Панель администратора',
      password: 'Пароль',
      enterPassword: 'Введите пароль администратора',
      login: 'Войти',
      contentManagement: 'Управление контентом',
      seedContent: 'Добавить демо-контент',
      seeding: 'Добавление...',
      goHome: 'Перейти на главную',
      incorrectPassword: 'Неверный пароль',
      authError: 'Ошибка аутентификации',
      success: 'Демо-контент успешно добавлен!',
    },
    onboarding: {
      step1: {
        title: 'Добро пожаловать в Bilim Core',
        description: 'Платформа для обучения с офлайн режимом. Начните учиться!',
      },
      step2: {
        title: 'Предметы и классы',
        description: 'Изучайте Математику, Физику и Химию с 7 по 12 класс.',
      },
      step3: {
        title: 'Офлайн режим',
        description: 'Читайте уроки и решайте тесты даже без интернета. Данные синхронизируются автоматически.',
      },
      step4: {
        title: 'Отслеживание прогресса',
        description: 'Выполняйте ежедневные цели, сохраняйте серии и отслеживайте свой прогресс.',
      },
      next: 'Далее',
      skip: 'Пропустить',
      getStarted: 'Начать',
    },
  },
  en: {
    nav: {
      home: 'Home',
      subjects: 'Subjects',
      admin: 'Admin',
    },
    home: {
      welcome: 'Welcome',
      dayStreak: 'Day Streak',
      dailyGoal: 'Daily Goal',
      lessonsCompleted: 'Lessons Completed',
      continueLearning: 'Continue Learning',
      noLessonsStarted: 'No lessons started yet',
      browseSubjects: 'Browse Subjects',
    },
    subjects: {
      title: 'Subjects',
      noSubjects: 'No subjects available yet.',
    },
    topic: {
      back: '← Back to Subjects',
      notFound: 'Subject not found',
      noTopics: 'No topics available yet.',
    },
    lesson: {
      back: '← Back',
      topic: 'Topic',
      notFound: 'Lesson not found',
      markComplete: 'Mark as Complete',
      quiz: 'Quiz',
      startQuiz: 'Start Quiz',
    },
    quiz: {
      results: 'Quiz Results',
      question: 'Question',
      yourAnswer: 'Your answer',
      correctAnswer: 'Correct answer',
      notAnswered: 'Not answered',
      enterAnswer: 'Enter your answer',
      next: 'Next',
      submit: 'Submit Quiz',
      great: 'great',
      good: 'good',
      needsImprovement: 'needs improvement',
      result: 'results',
    },
    admin: {
      back: '← Back to Home',
      title: 'Admin',
      panel: 'Admin Panel',
      password: 'Password',
      enterPassword: 'Enter admin password',
      login: 'Login',
      contentManagement: 'Content Management',
      seedContent: 'Seed Demo Content',
      seeding: 'Seeding...',
      goHome: 'Go to Homepage',
      incorrectPassword: 'Incorrect password',
      authError: 'Error authenticating',
      success: 'Demo content seeded successfully!',
    },
    onboarding: {
      step1: {
        title: 'Welcome to Bilim Core',
        description: 'An offline-first learning platform. Start learning!',
      },
      step2: {
        title: 'Subjects and Grades',
        description: 'Learn Mathematics, Physics, and Chemistry from 7th to 12th grade.',
      },
      step3: {
        title: 'Offline Mode',
        description: 'Read lessons and take quizzes even without internet. Data syncs automatically.',
      },
      step4: {
        title: 'Track Your Progress',
        description: 'Complete daily goals, maintain streaks, and track your learning journey.',
      },
      next: 'Next',
      skip: 'Skip',
      getStarted: 'Get Started',
    },
  },
}

export function getTranslations(lang: Language) {
  return translations[lang]
}

export function getLanguage(): Language {
  if (typeof window === 'undefined') return 'tk'
  const stored = localStorage.getItem('bilim_language') as Language
  return stored && ['tk', 'ru', 'en'].includes(stored) ? stored : 'tk'
}

export function setLanguage(lang: Language) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('bilim_language', lang)
  }
}

