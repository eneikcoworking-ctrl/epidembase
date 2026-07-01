export interface ContentItem {
    id: string;
    title: string;
    type: 'article' | 'document';
    category: string;
    date: string;
    description: string;
    content: string;
    status: 'active' | 'archive' | 'project';
    version: string;
    responsible: string;
    tags: string[];
    program?: 'aspirantura' | 'ordinatura' | 'both';
    year?: string;
    videoUrl?: string;
    teleprompterText?: string;
}

export const content: ContentItem[] = [
    {
        id: 'fgos-epi',
        title: 'ФГОС ВО по специальности Эпидемиология',
        type: 'document',
        category: 'Нормативная база',
        date: '2023-10-01',
        description: 'Федеральный государственный образовательный стандарт высшего образования.',
        content: '<p>Текст стандарта ФГОС по эпидемиологии...</p>',
        status: 'active',
        version: '3.0',
        responsible: 'Иванова И.И.',
        tags: ['ФГОС', 'Эпидемиология', 'Нормативные акты'],
        program: 'both',
        year: '2023'
    },
    {
        id: 'gia-ordinatura',
        title: 'Положение о порядке проведения ГИА ординаторов',
        type: 'document',
        category: 'Аттестации и экзамены',
        date: '2024-05-15',
        description: 'Регламент проведения государственной итоговой аттестации для ординаторов.',
        content: '<p>Подробный порядок проведения ГИА...</p>',
        status: 'active',
        version: '2.1',
        responsible: 'Петров П.П.',
        tags: ['ГИА', 'Ординатура', 'Регламент'],
        program: 'ordinatura',
        year: '2024',
        videoUrl: 'https://example.com/video/gia-guide',
        teleprompterText: 'Здравствуйте! В этом видео мы разберем порядок проведения ГИА для ординаторов в 2024 году.'
    },
    {
        id: 'stipendia-2021',
        title: 'Положение о стипендиальном обеспечении (Архив)',
        type: 'document',
        category: 'Стипендии и материальная поддержка',
        date: '2021-01-10',
        description: 'Устаревшая редакция положения о стипендиях.',
        content: '<p>Архивный текст положения...</p>',
        status: 'archive',
        version: '1.0',
        responsible: 'Сидоров С.С.',
        tags: ['Стипендия', 'Архив'],
        program: 'both',
        year: '2021'
    },
    {
        id: 'onboarding-video',
        title: 'Инструкция по работе с базой знаний',
        type: 'article',
        category: 'Справочная информация',
        date: '2024-06-01',
        description: 'Видео-урок по использованию новых функций базы знаний.',
        content: '<p>Посмотрите видео ниже, чтобы быстро освоиться в системе.</p>',
        status: 'active',
        version: '1.0',
        responsible: 'Администратор',
        tags: ['Инструкция', 'Онбординг', 'Видео'],
        videoUrl: 'https://example.com/video/onboarding',
        teleprompterText: 'Добро пожаловать в обновленную базу знаний образовательного центра!'
    },
    {
        id: 'proekt-ipr',
        title: 'Проект порядка разработки ИПР ППС',
        type: 'document',
        category: 'Управление и кадры',
        date: '2024-06-25',
        description: 'Проект документа по индивидуальным планам работы преподавателей.',
        content: '<p>Черновик порядка разработки ИПР...</p>',
        status: 'project',
        version: '0.1',
        responsible: 'Романова С.',
        tags: ['Проект', 'ИПР', 'Кадры'],
        program: 'both',
        year: '2024'
    }
];
