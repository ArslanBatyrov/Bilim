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
  // Delete all existing subjects and their content
  const existingSubjects = await getAllSubjects()
  
  for (const subject of existingSubjects) {
    const existingTopics = await db.topics.where('subjectId').equals(subject.id).toArray()
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
    await db.subjects.delete(subject.id)
  }

  // Create 3 subjects: Maths, Physics, Chemistry
  const subjects = [
    {
      id: uuidv4(),
      title: 'Matematika',
      description: 'Matematikanyň dürli synplary boýunça dersler we testler.',
    },
    {
      id: uuidv4(),
      title: 'Fizika',
      description: 'Fizikanyň dürli synplary boýunça dersler we testler.',
    },
    {
      id: uuidv4(),
      title: 'Himiýa',
      description: 'Himiýanyň dürli synplary boýunça dersler we testler.',
    },
  ]

  const grades = [7, 8, 9, 10, 11, 12]
  const gradeNames = {
    7: '7-nji synp',
    8: '8-nji synp',
    9: '9-njy synp',
    10: '10-njy synp',
    11: '11-nji synp',
    12: '12-nji synp',
  }

  // Curriculum for each subject and grade
  const curriculum: Record<string, Record<number, string[]>> = {
    Matematika: {
      7: ['Arifmetikanyň esaslary', 'Droby bilen işlemek', 'Deňlemeleri çözmek', 'Geometriýanyň esasy figuralary'],
      8: ['Algebrýa aňlatmalary', 'Köplenç bölünişikler', 'Funksiýalar bilen tanyşmak', 'Geometriýa we ölçegler'],
      9: ['Kwadrat deňlemeler', 'Trigonometriýa esaslary', 'Funksiýalar we grafikler', 'Geometriýa we meýdançylyk'],
      10: ['Logarifmler', 'Trigonometrik funksiýalar', 'Deriwatiwlar', 'Integrallar'],
      11: ['Deriwatiwlar we ulanylyşy', 'Integrallar we ulanylyşy', 'Kompleks sanlar', 'Ehtimallyk teoriýasy'],
      12: ['Matematik analiz', 'Differensial deňlemeler', 'Statistika', 'Matematik modellemek'],
    },
    Fizika: {
      7: ['Mehanika esaslary', 'Güýç we hereket', 'Energiýa', 'Madda we onuň häsiýetleri'],
      8: ['Elektrik we magnitizm', 'Elektrik zynjyry', 'Dolandyryşy we tolgundyryşy', 'Atom fizikasy'],
      9: ['Termodinamika', 'Dolandyryşy we tolgundyryşy', 'Atom we ýadro fizikasy', 'Elektromagnit tolkunlar'],
      10: ['Mehanika we termodinamika', 'Elektromagnitizm', 'Optika', 'Atom fizikasy'],
      11: ['Kwant fizikasy', 'Relatiwistik fizika', 'Ýadro fizikasy', 'Fizikanyň täze ugurlary'],
      12: ['Kwant mehanika', 'Fizikanyň teoriýalary', 'Kosmologiýa', 'Fizikanyň täze açylyşlary'],
    },
    Himiýa: {
      7: ['Himiýanyň esaslary', 'Maddalaryň gurluşy', 'Himiýa elementleri', 'Himiýa reaksiýalary'],
      8: ['Periodik sistema', 'Himiýa baglanyşyklary', 'Molekulýar gurluş', 'Himiýa reaksiýalary we deňlemeler'],
      9: ['Organiki himiýa esaslary', 'Karbon birikmeleri', 'Himiýa reaksiýalary mehanizmi', 'Himiýa we durmuş'],
      10: ['Organiki birikmeler', 'Biologiýa himiýasy', 'Himiýa we ekologiýa', 'Himiýa we senagat'],
      11: ['Fiziki himiýa', 'Elektrohimiýa', 'Kolloid himiýa', 'Himiýa analiz'],
      12: ['Himiýanyň teoriýalary', 'Kwant himiýasy', 'Himiýa we energetika', 'Himiýanyň täze ugurlary'],
    },
  }

  // Create subjects and topics with curriculum
  for (const subject of subjects) {
    await addSubject(subject)

    // Create topics for each grade (7-12)
    const topics: { id: string; subjectId: string; title: string; order: number }[] = []
    for (let i = 0; i < grades.length; i++) {
      const grade = grades[i]
      const topicId = uuidv4()
      await addTopic({
        id: topicId,
        subjectId: subject.id,
        title: gradeNames[grade as keyof typeof gradeNames],
        description: `${subject.title} üçin ${gradeNames[grade as keyof typeof gradeNames]} okuw meýilnamasy`,
        order: i + 1,
      })
      topics.push({
        id: topicId,
        subjectId: subject.id,
        title: gradeNames[grade as keyof typeof gradeNames],
        order: i + 1,
      })
    }

    // Create curriculum lessons for each topic/grade
    for (const topic of topics) {
      const gradeNum = grades[topics.indexOf(topic)]
      const curriculumTopics = curriculum[subject.title]?.[gradeNum] || []
      
      // Create lessons for each curriculum topic
      for (let i = 0; i < curriculumTopics.length; i++) {
        const curriculumTopic = curriculumTopics[i]
        const lessonId = uuidv4()
        
        const lessonContent = `# ${curriculumTopic}

Bu ${topic.title} üçin ${subject.title} okuw meýilnamasyndan "${curriculumTopic}" temasy.

## Okuw maksady

Bu temany öwrenmek bilen okuwçylar:

- ${curriculumTopic} barada esasy düşünjeleri öwrenerler
- Mysallar we amaly işler bilen tanyşarlar
- Bu temanyň täze bilimlerini özleşdirerler

## Ders mazmuny

Bu ýerde ${curriculumTopic} temasy barada jikme-jik maglumatlar we dersler bolmaly.

## Mysallar we amaly işler

- Mysal 1: ...
- Mysal 2: ...
- Mysal 3: ...

## Jemi

Bu temany öwrenmek ${topic.title} üçin möhümdir we indiki temalara geçmek üçin esasy döredýär.`

        await addLesson({
          id: lessonId,
          topicId: topic.id,
          title: curriculumTopic,
          content: lessonContent,
          order: i + 1,
        })
      }
    }
  }
}
