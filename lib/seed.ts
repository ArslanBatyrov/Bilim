import { v4 as uuidv4 } from 'uuid'
import {
  addSubject,
  addTopic,
  addLesson,
  addQuiz,
  getAllSubjects,
  db,
} from './db'
import type { Subject, Topic, Lesson, Quiz } from './types'

export async function seedDemoContent(): Promise<void> {
  // Check if "Основы математики" already exists (handle duplicates)
  const existingSubjects = await getAllSubjects()
  const mathSubjects = existingSubjects.filter(s => s.title === 'Основы математики')
  
  // Delete all existing "Mathematics Fundamentals" subjects and their content
  for (const mathSubject of mathSubjects) {
    const existingTopics = await db.topics.where('subjectId').equals(mathSubject.id).toArray()
    const topicIds = existingTopics.map(t => t.id)
    
    // Delete lessons and their quizzes
    for (const topicId of topicIds) {
      const lessons = await db.lessons.where('topicId').equals(topicId).toArray()
      for (const lesson of lessons) {
        await db.lessons.delete(lesson.id)
        if (lesson.quizId) {
          await db.quizzes.delete(lesson.quizId)
        }
      }
    }
    
    // Delete topics
    for (const topic of existingTopics) {
      await db.topics.delete(topic.id)
    }
    
    // Delete subject
    await db.subjects.delete(mathSubject.id)
  }

  // Subject
  const subjectId = uuidv4()
  await addSubject({
    id: subjectId,
    title: 'Основы математики',
    description: 'Изучите основы математики, включая алгебру, геометрию и арифметику.',
  })

  // Topics
  const topic1Id = uuidv4()
  const topic2Id = uuidv4()

  await addTopic({
    id: topic1Id,
    subjectId,
    title: 'Основы алгебры',
    description: 'Введение в алгебраические выражения и уравнения',
    order: 1,
  })

  await addTopic({
    id: topic2Id,
    subjectId,
    title: 'Основы геометрии',
    description: 'Понимание форм, углов и пространственных отношений',
    order: 2,
  })

  // Quizzes
  const quiz1Id = uuidv4()
  const quiz2Id = uuidv4()

  await addQuiz({
    id: quiz1Id,
    title: 'Тест по основам алгебры',
    questions: [
      {
        id: uuidv4(),
        type: 'mcq',
        question: 'Чему равно значение x в уравнении 2x + 5 = 13?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '4',
        explanation: 'Вычтем 5 из обеих частей: 2x = 8, затем разделим на 2: x = 4',
      },
      {
        id: uuidv4(),
        type: 'numeric',
        question: 'Решите уравнение: 3y - 7 = 14',
        correctAnswer: 7,
        explanation: 'Прибавим 7 к обеим частям: 3y = 21, затем разделим на 3: y = 7',
      },
    ],
  })

  await addQuiz({
    id: quiz2Id,
    title: 'Тест по основам геометрии',
    questions: [
      {
        id: uuidv4(),
        type: 'mcq',
        question: 'Чему равна сумма углов в треугольнике?',
        options: ['90 градусов', '180 градусов', '270 градусов', '360 градусов'],
        correctAnswer: '180 градусов',
        explanation: 'Сумма всех внутренних углов в любом треугольнике всегда равна 180 градусам.',
      },
      {
        id: uuidv4(),
        type: 'numeric',
        question: 'Чему равна площадь прямоугольника с длиной 8 и шириной 5?',
        correctAnswer: 40,
        explanation: 'Площадь = длина × ширина = 8 × 5 = 40',
      },
    ],
  })

  // Lessons
  const lessons: Omit<Lesson, 'createdAt' | 'updatedAt'>[] = [
    {
      id: uuidv4(),
      topicId: topic1Id,
      title: 'Введение в переменные',
      content: `# Введение в переменные

Переменные — это символы (обычно буквы), которые представляют неизвестные значения в математике. Они позволяют нам записывать общие правила и решать задачи.

## Что такое переменная?

Переменная — это буква или символ, который обозначает число. Часто используемые переменные:
- **x** — часто используется для неизвестных значений
- **y** — часто используется для зависимых переменных
- **a, b, c** — часто используются для констант или параметров

## Примеры

Если мы скажем x = 5, то:
- x + 3 = 8
- 2x = 10
- x² = 25

## Практика

Попробуйте решить: Если y = 7, чему равно y + 4?

Ответ: 11, потому что 7 + 4 = 11.`,
      order: 1,
    },
    {
      id: uuidv4(),
      topicId: topic1Id,
      title: 'Решение линейных уравнений',
      content: `# Решение линейных уравнений

Линейные уравнения — это уравнения, в которых наивысшая степень переменной равна 1.

## Шаги решения

1. **Упростите обе части** — объедините подобные члены
2. **Изолируйте переменную** — используйте обратные операции
3. **Проверьте ответ** — подставьте обратно в исходное уравнение

## Пример

Решите: 3x + 2 = 11

1. Вычтем 2 из обеих частей: 3x = 9
2. Разделим обе части на 3: x = 3
3. Проверка: 3(3) + 2 = 9 + 2 = 11 ✓

## Задачи для практики

Попробуйте решить:
- 2x - 5 = 7
- 4x + 3 = 15
- x/2 + 1 = 5`,
      order: 2,
      quizId: quiz1Id,
    },
    {
      id: uuidv4(),
      topicId: topic1Id,
      title: 'Работа с выражениями',
      content: `# Работа с выражениями

Выражение — это комбинация чисел, переменных и операций.

## Типы выражений

- **Числовое**: 5 + 3
- **Алгебраическое**: x + 3
- **Многочлен**: x² + 2x + 1

## Упрощение выражений

Объедините подобные члены:
- 3x + 2x = 5x
- 4y - y = 3y
- 2a + 3b + a = 3a + 3b

## Вычисление выражений

Подставьте значения вместо переменных:
- Если x = 4, то 2x + 3 = 2(4) + 3 = 11`,
      order: 3,
    },
    {
      id: uuidv4(),
      topicId: topic2Id,
      title: 'Введение в геометрические фигуры',
      content: `# Введение в геометрические фигуры

Геометрия — это изучение форм, размеров и свойств пространства.

## Основные фигуры

### Треугольники
- 3 стороны
- 3 угла
- Сумма углов: 180°

### Прямоугольники
- 4 стороны
- 4 прямых угла
- Противоположные стороны равны

### Круги
- Все точки равноудалены от центра
- Радиус: расстояние от центра до края
- Диаметр: удвоенный радиус

## Свойства

Каждая фигура имеет уникальные свойства, которые помогают нам понимать и работать с ними.`,
      order: 1,
    },
    {
      id: uuidv4(),
      topicId: topic2Id,
      title: 'Площадь и периметр',
      content: `# Площадь и периметр

Понимание того, как вычислять площадь и периметр, необходимо в геометрии.

## Периметр

Периметр — это расстояние вокруг фигуры.

- **Прямоугольник**: P = 2(длина + ширина)
- **Квадрат**: P = 4 × сторона
- **Треугольник**: P = сторона1 + сторона2 + сторона3

## Площадь

Площадь — это пространство внутри фигуры.

- **Прямоугольник**: A = длина × ширина
- **Квадрат**: A = сторона²
- **Треугольник**: A = ½ × основание × высота
- **Круг**: A = π × радиус²

## Примеры

Прямоугольник с длиной 6 и шириной 4:
- Периметр: 2(6 + 4) = 20 единиц
- Площадь: 6 × 4 = 24 квадратных единицы`,
      order: 2,
      quizId: quiz2Id,
    },
  ]

  for (const lesson of lessons) {
    await addLesson(lesson)
  }
}

